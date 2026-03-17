interface Props {
  trailer: any
  onClick: () => void
}

export default function TrailerCard({ trailer, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="shrink-0 w-56 cursor-pointer group relative rounded-xl overflow-hidden transition-transform hover:scale-105"
      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-gray-800 w-full overflow-hidden">
        <img
          src={trailer.img}
          alt={trailer.titulo}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/320x180?text=Trailer'
          }}
        />
      </div>

      {/* Overlay hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
        <div>
          <p className="text-white text-sm font-bold leading-tight">{trailer.titulo}</p>
          {trailer.classificacao && (
            <span className="text-pink-400 text-xs">{trailer.classificacao}+</span>
          )}
        </div>
      </div>

      {/* Play icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 rounded-full bg-pink-600/80 flex items-center justify-center">
          <span className="text-white text-lg ml-1">▶</span>
        </div>
      </div>
    </div>
  )
}