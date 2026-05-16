import Link from "next/link"

export default function HomePage() {

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6 font-sans relative overflow-hidden">
      
      {/* Subtle background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        <div className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase mb-6 shadow-sm border border-blue-200">
          Secure Financial Platform
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
          Modern <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Loan Management</span>
        </h1>
        
        <p className="text-lg text-slate-600 mb-10 max-w-md">
          A robust, full-stack solution built with MERN, Next.js, and TypeScript. Streamline your lending process today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/login"
            className="flex-1 sm:flex-none flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="flex-1 sm:flex-none flex justify-center items-center bg-white hover:bg-slate-50 text-slate-700 font-semibold px-8 py-3.5 rounded-xl shadow-sm border border-slate-200 transition-all transform hover:-translate-y-0.5"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  )
}