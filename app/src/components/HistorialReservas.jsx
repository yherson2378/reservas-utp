
function HistorialReservas({ reservas, volver }) {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={volver}
          className="text-red-700 font-semibold mb-6"
        >
          ← Volver al panel
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">
            Historial de reservas
          </h2>

          {reservas.length === 0 ? (
            <p className="text-slate-500">
              No tienes reservas registradas.
            </p>
          ) : (
            <div className="space-y-4">
              {reservas.map((reserva) => (
                <div
                  key={reserva.id}
                  className="border rounded-xl p-5 flex justify-between items-center gap-4"
                >
                  <div>
                    <h3 className="font-bold text-lg">
                      Cubículo {reserva.cubiculo}
                    </h3>
                    <p>{reserva.nombre}</p>
                    <p className="text-slate-500">
                      {reserva.fecha} | {reserva.hora}
                    </p>
                  </div>

                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
                    Confirmada
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HistorialReservas
