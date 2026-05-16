"use client"

import {
  useAuthStore
} from "@/store/authStore"

export default function DashboardPage() {

  const { user } =
    useAuthStore()

  return (

    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back, {user?.name || "User"}
          </h1>
          <p className="text-slate-500 mt-1">
            Here is what's happening with your accounts today.
          </p>
        </div>
        
        {/* Role Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2 rounded-full shadow-sm">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          <span className="text-sm font-bold uppercase tracking-wider">
            {user?.role || "GUEST"} Portal
          </span>
        </div>
      </div>

      {/* You can drop your future dashboard stats/widgets down here! */}
      
    </div>
  )
}