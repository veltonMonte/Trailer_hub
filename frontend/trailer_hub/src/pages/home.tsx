import { useState } from 'react'
import { useTrailers } from '../hooks/useTrailers'

export default function Home() {
  const { homeFeed, loading } = useTrailers()
  const [selectedTrailer, setSelectedTrailer] = useState<any>(null)

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">

      {/* Blobs holográficos animados */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* Hero */}
      <div className="relative pt-40 pb-20 px-6 md:px-16 max-w-6xl mx-auto">
        <p className="text-pink-500 text-sm font-semibold tracking-widest uppercase mb-4">
          Novidades em destaque
        </p>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-6">
          Os melhores<br />
          <span className="bg-gradient-to-r from-pink-500 via-purple-400 to-blue-500 bg-clip-text text-transparent">
            trailers
          </span>
          <br />em um só lugar
        </h1>
        <p className="text-gray-500 text-lg max-w-lg">
          Filmes, séries, animes e jogos — tudo que você precisa assistir antes de todo mundo.
        </p>
      </div>

      {/* Feed */}
      <div className="relative pb-24 flex flex-col gap-16">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : homeFeed.length === 0 ? (
          <p className="text-gray-600 text-center py-20">Nenhum trailer encontrado.</p>
        ) : (
          homeFeed.map((section) => (
            <div key={section.categoria}>

              {/* Título categoria */}
              <div className="flex items-center gap-3 mb-6 px-6 md:px-16">
                <span className="text-xs font-bold tracking-widest uppercase text-pink-500">
                  {section.categoria}
                </span>
                <div className="flex-1 h-px bg-white/5" />
              </div>

              {/* Row */}
              {/* Row */}
              {/* Row */}
              <div style={{ paddingLeft: '64px', paddingRight: '64px' }}>  {/* ← sem overflow hidden */}
                <div
                  style={{
                    display: 'flex',
                    gap: '16px',
                    paddingTop: '24px',
                    paddingBottom: '32px',
                    paddingLeft: '12px',
                    paddingRight: '12px',
                    marginTop: '-24px',
                    marginLeft: '-12px',
                    marginRight: '-12px',
                    overflowX: 'auto',
                    scrollbarWidth: 'none',
                  }}
                >
                  {section.trailers.map((trailer: any) => (
                    <TrailerCard
                      key={trailer.id}
                      trailer={trailer}
                      onClick={() => setSelectedTrailer(trailer)}
                    />
                  ))}
                </div>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {selectedTrailer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(12px)' }}
          onClick={() => setSelectedTrailer(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background: 'rgba(15,15,25,0.98)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video w-full bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${getYoutubeId(selectedTrailer.youtube)}?autoplay=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>

            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-2xl font-black text-white">{selectedTrailer.titulo}</h2>
                {selectedTrailer.classificacao && (
                  <span
                    className="shrink-0 text-xs font-bold px-3 py-1 rounded-full"
                    style={{
                      background: 'rgba(236,72,153,0.15)',
                      border: '1px solid rgba(236,72,153,0.3)',
                      color: '#ec4899',
                    }}
                  >
                    {selectedTrailer.classificacao}+
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{selectedTrailer.descricao}</p>
              <div className="flex gap-2 flex-wrap">
                {selectedTrailer.categoria.map((cat: string) => (
                  <span
                    key={cat}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#9ca3af',
                    }}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedTrailer(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition"
              style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Card ──────────────────────────────────────────────────────────────────────
function TrailerCard({ trailer, onClick }: { trailer: any; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="shrink-0 cursor-pointer rounded-2xl"
      style={{
        width: '288px',
        border: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.03)',
        transform: hovered ? 'translateY(-8px) scale(1.03)' : 'translateY(0) scale(1)',
        transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease',
        boxShadow: hovered
          ? '0 24px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(236,72,153,0.25), 0 0 30px rgba(139,92,246,0.15)'
          : '0 4px 12px rgba(0,0,0,0.3)',
      }}
    >
      {/* Imagem */}
      <div className="aspect-video w-full overflow-hidden bg-gray-900 relative rounded-t-2xl">
        <img
          src={trailer.img}
          alt={trailer.titulo}
          className="w-full h-full object-cover"
          style={{
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.5s ease, filter 0.3s ease',
            filter: hovered ? 'brightness(0.55)' : 'brightness(1)',
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://placehold.co/320x180/111/333?text=Trailer'
          }}
        />

        {/* Play */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease' }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(236,72,153,0.9)', backdropFilter: 'blur(4px)' }}
          >
            <span className="text-white text-base ml-1">▶</span>
          </div>
        </div>

        {/* Classificação */}
        {trailer.classificacao && (
          <div
            className="absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded-md"
            style={{
              background: 'rgba(0,0,0,0.75)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#f9a8d4',
            }}
          >
            {trailer.classificacao}+
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-3 py-3">
        <p className="text-white text-sm font-semibold leading-tight truncate">
          {trailer.titulo}
        </p>
        <p className="text-gray-600 text-xs mt-1 truncate">
          {trailer.categoria?.join(' · ')}
        </p>
      </div>
    </div>
  )
}

function getYoutubeId(url: string) {
  const match = url.match(/(?:v=|youtu\.be\/)([^&\s]+)/)
  return match ? match[1] : url
}