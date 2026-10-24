import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import HistorialReservas from './components/HistorialReservas'

function App() {
  const [pantalla, setPantalla] = useState('inicio')
  const [cubiculoSeleccionado, setCubiculoSeleccionado] = useState('A')
  const [nombre, setNombre] = useState('')
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('')

const [reservas, setReservas] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem('reservasUTP') || '[]')
  } catch {
    return []
  }
})


function registrarReserva(e) {
  e.preventDefault()
  setMensaje('')

  if (!nombre.trim() || !fecha || !hora) {
    setMensaje('Completa todos los campos.')
    return
  }

  const fechaReserva = new Date(`${fecha}T${hora}:00`)

  if (Number.isNaN(fechaReserva.getTime()) ||
      fechaReserva.getTime() <= Date.now()) {
    setMensaje('Selecciona una fecha y hora futuras.')
    return
  }

  const existe = reservas.some((reserva) =>
    reserva.cubiculo === cubiculoSeleccionado &&
    reserva.fecha === fecha &&
    reserva.hora === hora
  )

  if (existe) {
    setMensaje('Este cubículo ya está reservado en ese horario.')
    return
  }

  const nuevaReserva = {
    id: crypto.randomUUID(),
    nombre: nombre.trim(),
    cubiculo: cubiculoSeleccionado,
    fecha,
    hora
  }

  const nuevasReservas = [...reservas, nuevaReserva]

  setReservas(nuevasReservas)
  localStorage.setItem('reservasUTP', JSON.stringify(nuevasReservas))

  setNombre('')
  setFecha('')
  setHora('')
  setMensaje('')
  setPantalla('historial')
}

const [mensaje, setMensaje] = useState('')

  if (pantalla === 'inicio') {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-lg w-full">
          <div className="text-red-700 text-5xl font-black mb-4">
            UTP
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            Sistema de Reserva de Cubículos
          </h1>

          <p className="text-slate-500 mt-4">
            Gestiona tus espacios de estudio de forma rápida,
            sencilla y organizada.
          </p>

          <button
            onClick={() => setPantalla('reservas')}
            className="mt-8 bg-red-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-800 transition"
          >
            Comenzar
          </button>

          <p className="text-xs text-slate-400 mt-6">
            Proyecto desarrollado con React + Vite
          </p>
        </div>
      </div>
    )
  }
  
if (pantalla === 'formulario') {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-xl mx-auto">

        <button
          onClick={() => setPantalla('reservas')}
          className="mb-6 text-red-700 font-semibold hover:underline"
        >
          ← Volver al panel
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              Nueva reserva
            </h2>

            <p className="text-slate-500 mt-2">
              Completa tus datos para reservar un cubículo de estudio.
            </p>
          </div>

          <form onSubmit={registrarReserva} className="space-y-5">

            <div>
              <label htmlFor="nombre" className="block font-semibold mb-2">
                Nombre completo
              </label>

              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingresa tu nombre completo"
                required
                className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label htmlFor="cubiculo" className="block font-semibold mb-2">
                Cubículo
              </label>

              <select
                id="cubiculo"
                value={cubiculoSeleccionado}
                onChange={(e) => setCubiculoSeleccionado(e.target.value)}
                className="w-full border border-slate-300 rounded-xl p-3"
              >
                <option value="A">Cubículo A - Piso 1</option>
                <option value="B">Cubículo B - Piso 2</option>
              </select>
            </div>

            <div>
              <label htmlFor="fecha" className="block font-semibold mb-2">
                Fecha de reserva
              </label>

              <input
                id="fecha"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                min={new Date().toLocaleDateString('en-CA')}
                required
                className="w-full border border-slate-300 rounded-xl p-3"
              />
            </div>

            <div>
              <label htmlFor="hora" className="block font-semibold mb-2">
                Hora de reserva
              </label>

              <input
                id="hora"
                type="time"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-xl p-3"
              />
            </div>

            {mensaje && (
              <div
                role="alert"
                className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl"
              >
                {mensaje}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-xl transition"
            >
              Confirmar reserva
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

if (pantalla === 'historial') {
  return (
    <HistorialReservas
      reservas={reservas}
      volver={() => setPantalla('reservas')}
    />
  )
}
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-red-700 text-white px-8 py-5 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">UTP Reservas</h1>

          <button
            onClick={() => setPantalla('inicio')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg"
          >
            Volver al inicio
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-10">
        <h2 className="text-3xl font-bold text-slate-800">
          Panel de Reservas
        </h2>

        <p className="text-slate-500 mt-2">
          Bienvenido al sistema de gestión de cubículos de estudio.
        </p>
        
<div className="mt-5">
  <button
    onClick={() => setPantalla('historial')}
    className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-xl font-semibold transition"
  >
    Ver historial de reservas ({reservas.length})
  </button>
</div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-slate-500">Cubículos totales</p>
            <h3 className="text-4xl font-bold mt-3">2</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-slate-500">Mis reservas</p>
            <h3 className="text-4xl font-bold mt-3">
              {reservas.length}
              </h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-slate-500">Estado del sistema</p>
            <h3 className="text-2xl font-bold text-green-600 mt-3">
              Activo
            </h3>
          </div>
        </div>

        <section className="bg-white rounded-2xl shadow-sm p-8 mt-8">
          <h3 className="text-2xl font-bold text-slate-800">
            Cubículos de estudio
          </h3>

          <p className="text-slate-500 mt-2">
            Selecciona un cubículo para realizar una reserva.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            {[
              { id: 'A', piso: 1 },
              { id: 'B', piso: 2 }
            ].map((cubiculo) => (
              <div
                key={cubiculo.id}
                className="border border-slate-200 rounded-xl p-6"
              >
                <h4 className="text-xl font-bold">
                  Cubículo {cubiculo.id}
                </h4>

                <p className="text-slate-500 mt-2">
                  Piso {cubiculo.piso}
                </p>

                <button
                  onClick={() => {
                    setCubiculoSeleccionado(cubiculo.id)
                    setMensaje('')
                    setPantalla('formulario')
                  }}
                  className="mt-5 bg-red-700 text-white px-5 py-2 rounded-lg hover:bg-red-800"
                >
                  Reservar cubículo
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
  
}

export default App
