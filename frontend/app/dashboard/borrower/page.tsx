"use client"

import {
  useEffect,
  useState
} from "react"

import api from "@/services/api"

import StatusBadge
from "@/components/StatusBadge"

export default function BorrowerPage() {

  const [loans, setLoans] =
    useState<any[]>([])

  const fetchLoans =
    async () => {

      try {

        const res =
          await api.get(
            "/loan/my-loans"
          )

        setLoans(res.data)

      } catch (error) {

        console.log(error)
      }
    }

  useEffect(() => {

    fetchLoans()

  }, [])

  return (

    // Assume StatusBadge is imported

<div className="space-y-8">
  <div className="flex items-center justify-between border-b border-slate-200 pb-5">
    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
      My Loans
    </h1>
  </div>

  {loans.length === 0 && (
    <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
      <svg className="w-12 h-12 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
      <h3 className="text-lg font-bold text-slate-900">No active loans</h3>
      <p className="text-slate-500 mt-1">You haven't applied for any loans yet.</p>
    </div>
  )}

  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
    {loans.map((loan) => (
      <div
        key={loan._id}
        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Personal Loan</h2>
            <p className="text-sm text-slate-500 font-medium">ID: {loan._id.slice(-6).toUpperCase()}</p>
          </div>
          <StatusBadge status={loan.status} />
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-6 bg-slate-50 rounded-xl p-4 border border-slate-100">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Principal Amount</p>
            <p className="text-lg font-bold text-slate-900">₹{loan.amount}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Interest</p>
            <p className="text-lg font-bold text-slate-900">₹{loan.simpleInterest}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Repayment</p>
            <p className="text-lg font-bold text-blue-600">₹{loan.totalRepayment}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Outstanding</p>
            <p className="text-lg font-bold text-red-600">₹{loan.outstandingAmount}</p>
          </div>
          <div className="col-span-2 border-t border-slate-200 pt-3 mt-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Tenure</p>
            <p className="text-sm font-medium text-slate-900">{loan.tenure} days</p>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-3">Application Progress</h3>
          <div className="flex flex-wrap gap-2">
            <span className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-200 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              Applied
            </span>

            {["SANCTIONED", "DISBURSED", "CLOSED"].includes(loan.status) && (
              <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-200 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                Sanctioned
              </span>
            )}

            {["DISBURSED", "CLOSED"].includes(loan.status) && (
              <span className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-indigo-200 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                Disbursed
              </span>
            )}

            {loan.status === "CLOSED" && (
              <span className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                Closed
              </span>
            )}

            {loan.status === "REJECTED" && (
              <span className="bg-red-50 text-red-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-red-200 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                Rejected
              </span>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  )
}