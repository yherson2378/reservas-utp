
function App() {
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

        <button className="mt-8 bg-red-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-800 transition">
          Comenzar
        </button>

        <p className="text-xs text-slate-400 mt-6">
          Proyecto desarrollado con React + Vite
        </p>
      </div>
    </div>
  )
}

export default App
