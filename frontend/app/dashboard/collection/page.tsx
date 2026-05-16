"use client"

import {
  useEffect,
  useState
} from "react"
import toast from "react-hot-toast"
import api from "@/services/api"

import StatusBadge
from "@/components/StatusBadge"

export default function CollectionPage() {

  const [loans, setLoans] =
    useState<any[]>([])

  const [formData, setFormData] =
    useState<{
      [key: string]: {
        utrNumber: string
        amount: string
      }
    }>({})

  const fetchLoans =
    async () => {

      try {

        const res =
          await api.get(
            "/loan/disbursed"
          )

        setLoans(res.data)

      } catch (error) {

        console.log(error)
      }
    }

  useEffect(() => {

    fetchLoans()

  }, [])

  const handleChange = (
    loanId: string,
    field: string,
    value: string
  ) => {

    setFormData((prev) => ({

      ...prev,

      [loanId]: {

        ...prev[loanId],

        [field]: value
      }
    }))
  }

  const submitPayment =
    async (loanId: string) => {

      try {

        const data =
          formData[loanId]

        await api.post(
          "/payment",

          {
            loanId,

            utrNumber:
              data.utrNumber,

            amount:
              Number(data.amount),

            paymentDate:
              new Date()
          }
        )

        toast.success(
  "Payment recorded"
)

        fetchLoans()

      } catch (error: any) {

        toast.error(
  error.response.data.message
)
      }
    }

  return (

   <div>
  <div className="flex items-center justify-between border-b border-slate-200 pb-5 mb-8">
    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
      Collection Dashboard
    </h1>
  </div>

  <div className="space-y-6">
    {loans.map((loan) => (
      <div
        key={loan._id}
        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {loan.application?.fullName}
            </h2>
            <p className="text-sm text-slate-500 font-medium mt-0.5">
              {loan.borrower?.email}
            </p>
          </div>
          <StatusBadge status={loan.status} />
        </div>

        {/* Data Grid */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">PAN</p>
              <p className="text-sm font-semibold text-slate-900 uppercase">{loan.application?.pan}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Employment</p>
              <p className="text-sm font-semibold text-slate-900 capitalize">{loan.application?.employmentMode?.toLowerCase()}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Monthly Salary</p>
              <p className="text-sm font-semibold text-slate-900">₹{loan.application?.monthlySalary}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Loan Amount</p>
              <p className="text-sm font-bold text-slate-900">₹{loan.amount}</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Repayment</p>
              <p className="text-lg font-bold text-blue-600">₹{loan.totalRepayment}</p>
            </div>
            <div className="flex justify-between items-center bg-red-50 p-3 rounded-lg border border-red-100">
              <p className="text-xs font-bold text-red-800 uppercase tracking-wider">Current Outstanding</p>
              <p className="text-xl font-extrabold text-red-600">₹{loan.outstandingAmount}</p>
            </div>
          </div>
        </div>

        {/* Payment Entry Form */}
        {/* Payment Entry Form */}
<div className="border-t border-slate-200 pt-6">
  <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    Record New Payment
  </h3>
  
  {/* Changed to a <form> to easily reset inputs */}
  <form 
    onSubmit={(e) => {
      e.preventDefault(); // Prevents the page from refreshing
      submitPayment(loan._id); // Triggers your existing backend logic
      e.target.reset(); // Instantly clears the input fields!
    }}
    className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
  >
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1.5 ml-1">UTR / Reference Number</label>
      <input
        type="text"
        required
        placeholder="e.g. UTR123456789"
        className="w-full border border-slate-300 p-2.5 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all bg-white"
        onChange={(e) => handleChange(loan._id, "utrNumber", e.target.value)}
      />
    </div>
    
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1.5 ml-1">Payment Amount (₹)</label>
      <input
        type="number"
        step="0.01"
        required
        placeholder="0.00"
        className="w-full border border-slate-300 p-2.5 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all bg-white"
        onChange={(e) => handleChange(loan._id, "amount", e.target.value)}
      />
    </div>
    
    <button
      type="submit"
      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0 h-[46px] flex items-center justify-center gap-2"
    >
      Confirm Payment
    </button>
  </form>
</div>

      </div>
    ))}
  </div>
</div>
  )
}