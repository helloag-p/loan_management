"use client"

import {
  useEffect,
  useState
} from "react"

import api from "@/services/api"

export default function SanctionPage() {

  const [loans, setLoans] =
    useState<any[]>([])

  const fetchLoans =
    async () => {

      const res =
        await api.get(
          "/loan/applied"
        )

      setLoans(res.data)
    }

  const approveLoan =
    async (id: string) => {

      await api.patch(
        `/loan/${id}/approve`
      )

      fetchLoans()
    }

  useEffect(() => {

    fetchLoans()

  }, [])

  return (

   <div>
  <div className="flex items-center justify-between border-b border-slate-200 pb-5 mb-8">
    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
      Pending Sanctions
    </h1>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    {loans.map((loan) => (
      <div
        key={loan._id}
        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
      >
        {/* Borrower Info Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="pr-4">
            <h2 className="text-lg font-bold text-slate-900 line-clamp-1">
              {loan.application?.fullName}
            </h2>
            <p className="text-sm text-slate-500 font-medium line-clamp-1">
              {loan.borrower?.email}
            </p>
          </div>
          <span className="shrink-0 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ring-1 ring-inset ring-amber-600/20">
            {loan.status}
          </span>
        </div>

        {/* Loan Details Grid */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-6 flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">PAN</p>
              <p className="text-sm font-semibold text-slate-900 uppercase">{loan.application?.pan}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Employment</p>
              <p className="text-sm font-semibold text-slate-900 capitalize">{loan.application?.employmentMode?.toLowerCase()}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Salary</p>
              <p className="text-sm font-bold text-emerald-600">₹{loan.application?.monthlySalary}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Requested</p>
              <p className="text-sm font-bold text-blue-600">₹{loan.amount}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tenure</p>
              <p className="text-sm font-semibold text-slate-900">{loan.tenure} days</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Interest</p>
              <p className="text-sm font-semibold text-slate-900">{loan.interestRate}%</p>
            </div>
          </div>

          {/* Attachment Link */}
          <div className="pt-3 border-t border-slate-200">
            <a
              href={`http://localhost:5000/${loan.application?.salarySlip}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg w-full justify-center border border-blue-100"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
              View Salary Slip
            </a>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => approveLoan(loan._id)}
          className="mt-auto w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Approve Sanction
        </button>
      </div>
    ))}
  </div>
</div>
  )
}