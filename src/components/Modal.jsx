import { useState, useEffect, useRef } from 'react'

import { Mensaje } from './Mensaje'

import CerrarBtn from '../img/cerrar.svg'

export const Modal = ({
    setModal,
    animarModal,
    setAnimarModal,
    guardarGasto,
    gastoEditar,
    setGastoEditar
}) => {

    const [nombre, setNombre] = useState('')

    const [cantidad, setCantidad] = useState('')

    const [categoría, setCategoría] = useState('')

    const [mensaje, setMensaje] = useState('')

    const [id, setId] = useState('')

    const [fecha, setFecha] = useState('')
    
    const inputNombreRef = useRef(null)

    const inputCantidadRef = useRef(null)

    useEffect(() => {

        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoría(gastoEditar.categoría)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    
    }, [gastoEditar])
    

    const ocultarModal = () => {

        setAnimarModal(false)

        setGastoEditar({})

        setTimeout(() => {

            setModal(false)

        }, 300);

    }

    const handleSubmit = e => {

        e.preventDefault()

        if ([ nombre, cantidad, categoría ].includes('')) {

            setMensaje('Todos los campos son obligatorios')

            setTimeout(() => {
                setMensaje('')
            }, 3000);

            return
        }

        guardarGasto({ nombre, cantidad, categoría, id, fecha })

    }


    return (

        <div className='modal'>

            <div className='cerrar-modal'>

                    <img
                        src={CerrarBtn}
                        alt='cerrar modal'
                        onClick={ocultarModal}
                    />

            </div>

            <form
                className={`formulario ${animarModal ? 'animar' : ''}`}
                onSubmit={handleSubmit}
            >

                <legend>{ gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto' }</legend>

                {
                    mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>
                }

                <div className='campo'>
                    <label htmlFor='nombre'>Nombre Gasto</label>

                    <input
                        id='nombre'
                        type='text'
                        ref={inputNombreRef}
                        placeholder='Añade el Nombre del Gasto'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        onClick={() => inputNombreRef.current.select()}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor='cantidad'>Cantidad</label>

                    <input
                        id='nombre'
                        type='number'
                        ref={inputCantidadRef}
                        placeholder='Añade la Cantidad del Gasto: ej. 300'
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                        onClick={() => inputCantidadRef.current.select()}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor='categoría'>Categoría</label>

                    <select
                        id='categoría'
                        value={categoría}
                        onChange={e => setCategoría(e.target.value)}
                    >

                        <option value=''>-- Seleccione --</option>
                        <option value='ahorro'>Ahorro</option>
                        <option value='comida'>Comida</option>
                        <option value='casa'>Casa</option>
                        <option value='gastos'>Gastos Varios</option>
                        <option value='ocio'>Ocio</option>
                        <option value='salud'>Salud</option>
                        <option value='suscripciones'>Suscripciones</option>

                    </select>
                </div>

                <input
                    type='submit'
                    value={ gastoEditar.nombre ? 'Guardad Cambios' : 'Añadir Gasto' }
                />

            </form>

        </div>
    )
}