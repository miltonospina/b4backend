using System;
using System.Collections.Generic;
using b4backend.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace b4backend.BLL
{
    public class Bodega4
    {
        public int columnas = 16;
        public int niveles = 10;
        public int posiciones = 47;


        private readonly bodega4Context _context;

        public Bodega4(bodega4Context context)
        {
            _context = context;
        }

        private Boolean existePosicion(Movimientos mov)
        {
            return mov.Columna > 0 &&
                mov.Nivel > 0 &&
                mov.Columna <= this.columnas &&
                mov.Nivel <= this.niveles;
        }

        public int maxPosicion(Movimientos mov)
        {
            int respuesta;
            if (existePosicion(mov))
            {
                var tunel = _context.VMinimoPos
                .Where(s => s.Columna == mov.Columna)
                .Where(s => s.Nivel == mov.Nivel)
                .FirstOrDefault();

                if (tunel != null)
                {
                    respuesta = (int)tunel.Minimo;
                }
                else
                {
                    respuesta = this.posiciones + 1;
                }
            }
            else
            {
                respuesta = -1;
            }
            return respuesta;
        }



        public object ingreso(Movimientos ingreso)
        {
            int rs = maxPosicion(ingreso);
            if (rs == 1)
            {
                return ("No hay posiciones disponibles.");
            }
            else if (rs == -1)
            {
                return ("No existe la posición seleccionada.");
            }
            else
            {
                ingreso.Posicion = rs - 1;
                ingreso.Fecha = DateTime.Now;
                ingreso.Sentido = 1;
                return ingreso;
            }
        }


        public object simularIngreso(Movimientos ingreso)
        {
            int rs = maxPosicion(ingreso);
            if (rs == 1)
            {
                return ("No hay posiciones disponibles.");
            }
            else if (rs == -1)
            {
                return ("No existe la posición seleccionada.");
            }
            else
            {
                return (rs - 1);
            }
        }


        public object salida(Movimientos salida)
        {
            int rs = maxPosicion(salida);

            if (rs == (this.posiciones + 1))
            {
                return ("El tunel seleccionado está vacio.");
            }
            else if (rs == -1)
            {
                return ("No existe el tunel seleccionado.");
            }
            else
            {
                int paqueteId = ubicarEn(salida);
                if (paqueteId != -1)
                {
                    salida.PaquetesId = paqueteId;
                    salida.Posicion = rs;
                    salida.Fecha = DateTime.Now;
                    salida.Sentido = -1;
                    return salida;
                }
                else
                {
                    return "La posición seleccionada no está ocupada.";
                }
            }
        }



        public object[] salidaParcial(Movimientos salida, int bultosSalen)
        {
            object oSalida = this.salida(salida);

            if (oSalida is string)
            {
                return new[] { oSalida };
            }

            Movimientos mSalida = (Movimientos)oSalida;
            Movimientos mIngreso = (Movimientos)mSalida.Clone();

            Paquetes paqueteActual = _context.Paquetes.Find(mIngreso.PaquetesId);

            mIngreso.Paquetes = new Paquetes();
            mIngreso.Paquetes.ProductoId = paqueteActual.ProductoId;
            mIngreso.Paquetes.ClienteId = paqueteActual.ClienteId;
            mIngreso.Paquetes.Lote = paqueteActual.Lote;
            mIngreso.Sentido = 1;

            mIngreso.Paquetes.Bultos = paqueteActual.Bultos - bultosSalen;
            if (mIngreso.Paquetes.Bultos < 0)
            {
                return new[] {
                    "Imposible hacer salida por "+ bultosSalen +" bultos, solo hay "+paqueteActual.Bultos + " disponibles"
                    };
            }
            return new[] { mSalida, mIngreso };
        }




        public int ubicarEn(Movimientos mov)
        {
            var posActual = _context.VMinimoPos
                .Where(s => s.Columna == mov.Columna)
                .Where(s => s.Nivel == mov.Nivel)
                .FirstOrDefault();

            if (posActual != null)
            {
                var paqueteActual = _context.VPosicionesActual
                .Where(s => s.Columna == posActual.Columna)
                .Where(s => s.Nivel == posActual.Nivel)
                .Where(s => s.Posicion == posActual.Minimo)
                .FirstOrDefault();

                return paqueteActual.PaquetesId;
            }
            else
            {
                return -1;
            }
        }

        public async Task<object> getPrimero(Movimientos mov)
        {
            var posActual = _context.VMinimoPos
                .Where(s => s.Columna == mov.Columna)
                .Where(s => s.Nivel == mov.Nivel)
                .FirstOrDefault();

            if (posActual != null)
            {
                var paqueteActual = _context.VPosicionesActual
                .Where(s => s.Columna == posActual.Columna)
                .Where(s => s.Nivel == posActual.Nivel)
                .Where(s => s.Posicion == posActual.Minimo)
                .FirstOrDefault();

                if (paqueteActual != null)
                {
                    var paquete = await _context.Paquetes
                    .Include(s => s.Cliente)
                    .Include(s => s.Producto)
                    .FirstOrDefaultAsync(i => i.Id == paqueteActual.PaquetesId);

                    if (paquete != null)
                    {
                        return new { paquete = paquete, posicion = posActual.Minimo };
                    }
                    else
                    {
                        return null;
                    }
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }

        }

        public IEnumerable<int> getColumnas()
        {
            return Enumerable.Range(1, this.columnas);
        }


        public IEnumerable<int> getNiveles()
        {
            return Enumerable.Range(1, this.niveles);
        }

        public IEnumerable<int> getPosiciones()
        {
            return Enumerable.Range(1, this.posiciones);
        }
    }
}
