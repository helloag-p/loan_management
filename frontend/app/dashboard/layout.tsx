"use client"

import Link from "next/link"

import {
  useEffect
} from "react"

import {
  useAuthStore
} from "@/store/authStore"

export default function DashboardLayout({

  children

}: {
  children: React.ReactNode
}) {

  const {

    user,

    logout,

    hydrate,

    hydrated

  } = useAuthStore()

  useEffect(() => {

    hydrate()

  }, [])

  if (!hydrated) {

    return null
  }

  const role =
    user?.role

  return (

    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 font-sans">
      
      {/* Modern Sidebar */}
      <div className="w-full md:w-[280px] bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shadow-xl z-20 shrink-0">
        
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide">
            Capital<span className="text-blue-500">Flow</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 mt-2">Menu</p>

          {(role === "ADMIN" || role === "SANCTION") && (
            <Link
              href="/dashboard/sanction"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors group"
            >
              <svg className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span className="font-medium">Sanction</span>
            </Link>
          )}

          {(role === "ADMIN" || role === "DISBURSEMENT") && (
            <Link
              href="/dashboard/disbursement"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors group"
            >
              <svg className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span className="font-medium">Disbursement</span>
            </Link>
          )}

          {(role === "ADMIN" || role === "COLLECTION") && (
            <Link
              href="/dashboard/collection"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors group"
            >
              <svg className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
              <span className="font-medium">Collection</span>
            </Link>
          )}

          {(role === "ADMIN" || role === "BORROWER") && (
            <div className="space-y-1.5 pt-2">
              <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Borrower</p>
              <Link
                href="/dashboard/borrower"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors group"
              >
                <svg className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002 2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                <span className="font-medium">My Loans</span>
              </Link>

              <Link
                href="/dashboard/borrower/apply"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors group"
              >
                <svg className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                <span className="font-medium">Apply for Loan</span>
              </Link>
            </div>
          )}
        </div>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-slate-800 mt-auto">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Sign Out
          </button>
        </div>

      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:p-10 md:h-screen md:overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </div>

    </div>
  )
}