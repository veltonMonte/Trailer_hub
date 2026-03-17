import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    userName: '',
    email: '',
    password: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (isLogin) {
        await login(form.email, form.password)
      } else {
        await register(form.userName, form.email, form.password)
      }
      navigate('/')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Algo deu errado.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-md shadow-xl">

        <h1 className="text-3xl font-bold text-white text-center mb-2">
          🎬 Trailer Hub
        </h1>
        <p className="text-gray-400 text-center mb-8">
          {isLogin ? 'Entre na sua conta' : 'Crie sua conta'}
        </p>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 rounded-lg p-3 mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <input
              type="text"
              name="userName"
              placeholder="Nome de usuário"
              value={form.userName}
              onChange={handleChange}
              className="bg-gray-800 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="bg-gray-800 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
            className="bg-gray-800 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6 text-sm">
          {isLogin ? 'Não tem conta?' : 'Já tem conta?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-red-400 hover:text-red-300 font-semibold"
          >
            {isLogin ? 'Cadastre-se' : 'Entrar'}
          </button>
        </p>

      </div>
    </div>
  )
}