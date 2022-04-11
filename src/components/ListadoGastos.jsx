import { Gasto } from './Gasto'

export const ListadoGastos = ({
    gastos,
    setGastoEditar,
    eliminarGasto,
    filtro,
    gastosFiltrados
}) => {

    return (

        <div className='listado-gastos contenedor'>

            {
                filtro
                    ?
                        (
                            <>

                                <h2>{ gastosFiltrados.length > 0 ? 'Gastos' : 'No hay gastos en esta categoría' }</h2>

                                {
                                    gastosFiltrados.map(gasto =>
                                        <Gasto
                                            key={gasto.id}
                                            gasto={gasto}
                                            setGastoEditar={setGastoEditar}
                                            eliminarGasto={eliminarGasto}
                                        />
                                    )
                                }

                            </>
                        )
                    :
                        (
                            <>

                                <h2>{ gastos.length > 0 ? 'Gastos' : 'No hay gastos aún' }</h2>

                                {
                                    gastos.map(gasto => 
                                        <Gasto
                                            key={gasto.id}
                                            gasto={gasto}
                                            setGastoEditar={setGastoEditar}
                                            eliminarGasto={eliminarGasto}
                                        />
                                    )
                                }

                            </>
                        )
            }

        </div>
    )
}
