"use client"

import {
  useEffect,
  useState
} from "react"

import api from "@/services/api"

export default function DisbursementPage() {

  const [loans, setLoans] =
    useState<any[]>([])

  const fetchLoans =
    async () => {

      const res =
        await api.get(
          "/loan/sanctioned"
        )

      setLoans(res.data)
    }

  const disburseLoan =
    async (id: string) => {

      await api.patch(
        `/loan/${id}/disburse`
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
      Ready for Disbursement
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
          <span className="shrink-0 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ring-1 ring-inset ring-blue-600/20">
            {loan.status}
          </span>
        </div>

        {/* Financial Details Grid */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-6 flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">PAN</p>
              <p className="text-sm font-semibold text-slate-900 uppercase">{loan.application?.pan}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Monthly Salary</p>
              <p className="text-sm font-semibold text-slate-900">₹{loan.application?.monthlySalary}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-200">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Sanction Amount</p>
              <p className="text-xl font-extrabold text-blue-600">₹{loan.amount}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Outstanding</p>
              <p className="text-xl font-extrabold text-slate-900">₹{loan.outstandingAmount}</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => disburseLoan(loan._id)}
          className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex justify-center items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Disburse Funds
        </button>
      </div>
    ))}
  </div>
</div>
  )
}