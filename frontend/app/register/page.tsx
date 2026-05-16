"use client"
import { useState } from "react"
import api from "@/services/api"
import { useAuthStore } from "@/store/authStore"

export default function RegisterPage() {
  const { setAuth } = useAuthStore()
  const [error, setError] = useState(""); // New state for errors
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(""); // Clear previous errors on new submission

    try {
      const res = await api.post("/auth/register", form)
      setAuth(res.data.token, res.data.user)
      window.location.href = "/dashboard"
    } catch (err: any) {
      console.log(err)
      // Extract the error message from your backend response
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 font-sans">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Create Account
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            Join our secure loan management platform.
          </p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-3">
            <svg className="w-5 h-5 shrink-0 mt-0.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Full Name</label>
            <input
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Email Address</label>
            <input
              type="email"
              placeholder="you@company.com"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-blue-500/30 transform hover:-translate-y-0.5 mt-2"
          >
            Register
          </button>
        </form>
        
      </div>
    </div>
  )
}