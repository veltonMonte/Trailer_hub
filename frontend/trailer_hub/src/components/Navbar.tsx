import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

export default function Navbar() {
    const { isAuthenticated, isAdmin, logout, user } = useAuth()
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)

    function handleLogout() {
        logout()
        navigate('/login')
    }

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-6">
            <nav
                className="w-full max-w-5xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl" style={{
                    background: 'rgba(15,15,25,0.75)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                }}
            >
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white text-xs font-black">▶</span>
                    </div>
                    <span className="text-lg font-black tracking-tight">
                        <span className="text-white">Trailer</span>
                        <span className="text-pink-500">Hub</span>
                    </span>
                </Link>

                {/* Menu centro */}
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/" className="text-gray-400 hover:text-white transition text-sm font-medium">
                        Home
                    </Link>
                    <Link to="/categories" className="text-gray-400 hover:text-white transition text-sm font-medium">
                        Gêneros
                    </Link>
                    {isAdmin && (
                        <Link to="/admin" className="text-pink-400 hover:text-pink-300 transition text-sm font-medium">
                            Admin
                        </Link>
                    )}
                </div>

                {/* Direita */}
                <div className="flex items-center gap-3">
                    {isAuthenticated ? (
                        <div className="relative">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="flex items-center gap-2 hover:opacity-80 transition"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white/10">
                                    {user?.email?.[0]?.toUpperCase() ?? '?'}
                                </div>
                            </button>

                            {menuOpen && (
                                <div
                                    className="absolute right-0 mt-3 w-48 rounded-xl overflow-hidden shadow-2xl"
                                    style={{
                                        background: 'rgba(15,15,25,0.95)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        backdropFilter: 'blur(16px)',
                                    }}
                                >
                                    <Link
                                        to="/profile"
                                        onClick={() => setMenuOpen(false)}
                                        className="block px-4 py-3 text-sm text-gray-300 hover:bg-white/10 transition"
                                    >
                                        👤 Meu Perfil
                                    </Link>
                                    {isAdmin && (
                                        <Link
                                            to="/admin"
                                            onClick={() => setMenuOpen(false)}
                                            className="block px-4 py-3 text-sm text-pink-400 hover:bg-white/10 transition"
                                        >
                                            ⚡ Admin
                                        </Link>
                                    )}
                                    <div className="border-t border-white/10" />
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-white/10 transition"
                                    >
                                        🚪 Sair
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="text-sm font-semibold px-5 py-2 rounded-full transition"
                            style={{
                                background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                                boxShadow: '0 4px 15px rgba(236,72,153,0.3)',
                            }}
                        >
                            Entrar
                        </Link>
                    )}
                </div>
            </nav>
        </div>
    )
}