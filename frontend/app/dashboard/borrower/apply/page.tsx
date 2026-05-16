"use client"

import { useState } from "react"
import api from "@/services/api"
import toast from "react-hot-toast"

export default function ApplyLoanPage() {
  const [form, setForm] = useState({
    fullName: "",
    pan: "",
    dob: "",
    monthlySalary: "",
    employmentMode: "SALARIED",
    amount: "50000", // Set initial amount for the slider
    tenure: "180",
    interestRate: "12"
  })

  const [salarySlip, setSalarySlip] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [applicationCreated, setApplicationCreated] = useState(false)
  const [applicationId, setApplicationId] = useState("")

  // CREATE APPLICATION
  const createApplication = async () => {
    try {
      setLoading(true)
      const appRes = await api.post("/application", {
        fullName: form.fullName,
        pan: form.pan,
        dob: form.dob,
        monthlySalary: Number(form.monthlySalary),
        employmentMode: form.employmentMode,
        salarySlip: ""
      })

      setApplicationId(appRes.data.application._id)
      setApplicationCreated(true)
      toast.success("Application created. Now upload salary slip.")
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create application")
    } finally {
      setLoading(false)
    }
  }

  // APPLY LOAN
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (!salarySlip) {
        toast.error("Please upload salary slip")
        return
      }

      setLoading(true)

      // UPLOAD SALARY SLIP
      const formData = new FormData()
      formData.append("salarySlip", salarySlip)
      formData.append("applicationId", applicationId)

      await api.post("/upload/salary-slip", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      // APPLY LOAN
      await api.post("/loan/apply", {
        applicationId,
        amount: Number(form.amount),
        tenure: Number(form.tenure),
        interestRate: Number(form.interestRate)
      })

      toast.success("Loan applied successfully")
      window.location.href = "/dashboard/borrower"
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="border-b border-slate-200 pb-5 mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Apply for a Loan
        </h1>
        <p className="text-slate-500 mt-2">Fill out the details below to request a new loan sanction.</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 text-blue-800 p-5 rounded-xl mb-8 flex gap-4 shadow-sm">
        <svg className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <div>
          <p className="font-bold text-blue-900">Application Process</p>
          <p className="text-sm mt-1 text-blue-700/80 leading-relaxed">
            First, fill out the basic details and click "Create Application". Once the application is created, the salary slip upload field will unlock to finalize your request.
          </p>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Group 1: Personal Details */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
            <input
              placeholder="John Doe"
              disabled={applicationCreated}
              className="w-full border border-slate-300 p-3 rounded-xl text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">PAN Number</label>
            <input
              placeholder="ABCDE1234F"
              disabled={applicationCreated}
              className="w-full border border-slate-300 p-3 rounded-xl text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed uppercase"
              onChange={(e) => setForm({ ...form, pan: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Date of Birth</label>
            <input
              type="date"
              disabled={applicationCreated}
              className="w-full border border-slate-300 p-3 rounded-xl text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Employment Mode</label>
            <select
              disabled={applicationCreated}
              className="w-full border border-slate-300 p-3 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed bg-white"
              onChange={(e) => setForm({ ...form, employmentMode: e.target.value })}
            >
              <option value="SALARIED">Salaried</option>
              <option value="UNEMPLOYED">Unemployed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Monthly Salary (₹)</label>
            <input
              type="number"
              placeholder="50000"
              disabled={applicationCreated}
              className="w-full border border-slate-300 p-3 rounded-xl text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
              onChange={(e) => setForm({ ...form, monthlySalary: e.target.value })}
            />
          </div>

          {/* Group 2: Loan Specs (Upgraded to Sliders) */}
          <div className="md:col-span-2 border-t border-slate-200 mt-2 pt-6 pb-2">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Loan Requirements</h3>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-semibold text-slate-700">Requested Amount</label>
              <span className="text-lg font-extrabold text-blue-600">
                ₹{Number(form.amount || 50000).toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="50000"
              max="500000"
              step="5000"
              disabled={applicationCreated}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
            <div className="flex justify-between text-xs font-medium text-slate-400 mt-2">
              <span>₹50K</span>
              <span>₹5 Lakhs</span>
            </div>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-semibold text-slate-700">Tenure (in Days)</label>
              <span className="text-lg font-extrabold text-blue-600">
                {form.tenure} Days
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="365"
              step="1"
              disabled={applicationCreated}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              value={form.tenure}
              onChange={(e) => setForm({ ...form, tenure: e.target.value })}
            />
            <div className="flex justify-between text-xs font-medium text-slate-400 mt-2">
              <span>30 Days</span>
              <span>365 Days</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Interest Rate (% p.a.)</label>
            <input
              type="text"
              readOnly
              disabled={applicationCreated}
              className="w-full border border-slate-300 p-3 rounded-xl text-slate-500 font-bold bg-slate-100 cursor-not-allowed outline-none"
              value={`Fixed at ${form.interestRate}%`}
            />
          </div>

          {/* Conditional File Upload */}
          <div className={`transition-opacity duration-300 ${!applicationCreated ? 'opacity-50' : 'opacity-100'}`}>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Upload Salary Slip (PDF/Image)</label>
            <input
              type="file"
              disabled={!applicationCreated}
              className="w-full border border-slate-300 p-2.5 rounded-xl bg-white text-slate-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
              onChange={(e) => setSalarySlip(e.target.files?.[0] || null)}
            />
          </div>

          {/* Submit Buttons */}
          <div className="md:col-span-2 mt-4">
            {!applicationCreated ? (
              <button
                type="button"
                onClick={createApplication}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex justify-center items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Creating Application...
                  </>
                ) : "Create Application"}
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-slate-900/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex justify-center items-center gap-2"
              >
                {loading ? "Applying..." : "Upload Slip & Apply for Loan"}
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  )
}
// "use client"

// import {
//   useState
// } from "react"

// import api from "@/services/api"

// import toast from "react-hot-toast"

// export default function ApplyLoanPage() {

//   const [form, setForm] =
//     useState({

//       fullName: "",

//       pan: "",

//       dob: "",

//       monthlySalary: "",

//       employmentMode: "SALARIED",

//       amount: "",

//       tenure: "180",

//       interestRate: "12"
//     })

//   const [salarySlip, setSalarySlip] =
//     useState<File | null>(null)

//   const [loading, setLoading] =
//     useState(false)

//   const [applicationCreated,
//     setApplicationCreated] =
//     useState(false)

//   const [applicationId,
//     setApplicationId] =
//     useState("")

//   // CREATE APPLICATION

//   const createApplication =
//     async () => {

//       try {

//         setLoading(true)

//         const appRes =
//           await api.post(

//             "/application",

//             {

//               fullName:
//                 form.fullName,

//               pan:
//                 form.pan,

//               dob:
//                 form.dob,

//               monthlySalary:
//                 Number(
//                   form.monthlySalary
//                 ),

//               employmentMode:
//                 form.employmentMode,

//               salarySlip: ""
//             }
//           )

//         setApplicationId(
//           appRes.data.application._id
//         )

//         setApplicationCreated(true)

//         toast.success(
//           "Application created. Now upload salary slip."
//         )

//       } catch (error: any) {

//         toast.error(

//           error?.response?.data?.message ||

//           "Failed to create application"
//         )

//       } finally {

//         setLoading(false)
//       }
//     }

//   // APPLY LOAN

//   const handleSubmit =
//     async (
//       e: React.FormEvent
//     ) => {

//       e.preventDefault()

//       try {

//         if (!salarySlip) {

//           toast.error(
//             "Please upload salary slip"
//           )

//           return
//         }

//         setLoading(true)

//         // UPLOAD SALARY SLIP

//         const formData =
//           new FormData()

//         formData.append(
//           "salarySlip",
//           salarySlip
//         )

//         formData.append(
//           "applicationId",
//           applicationId
//         )

//         await api.post(

//           "/upload/salary-slip",

//           formData,

//           {
//             headers: {
//               "Content-Type":
//                 "multipart/form-data"
//             }
//           }
//         )

//         // APPLY LOAN

//         await api.post(

//           "/loan/apply",

//           {

//             applicationId,

//             amount:
//               Number(form.amount),

//             tenure:
//               Number(form.tenure),

//             interestRate:
//               Number(
//                 form.interestRate
//               )
//           }
//         )

//         toast.success(
//           "Loan applied successfully"
//         )

//         window.location.href =
//           "/dashboard/borrower"

//       } catch (error: any) {

//         toast.error(

//           error?.response?.data?.message ||

//           "Something went wrong"
//         )

//       } finally {

//         setLoading(false)
//       }
//     }

//   return (

//    <div className="max-w-4xl">
//   <div className="border-b border-slate-200 pb-5 mb-8">
//     <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
//       Apply for a Loan
//     </h1>
//     <p className="text-slate-500 mt-2">Fill out the details below to request a new loan sanction.</p>
//   </div>

//   <div className="bg-blue-50 border border-blue-200 text-blue-800 p-5 rounded-xl mb-8 flex gap-4 shadow-sm">
//     <svg className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
//     <div>
//       <p className="font-bold text-blue-900">Application Process</p>
//       <p className="text-sm mt-1 text-blue-700/80 leading-relaxed">
//         First, fill out the basic details and click "Create Application". Once the application is created, the salary slip upload field will unlock to finalize your request.
//       </p>
//     </div>
//   </div>

//   <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
//     <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
//   {/* Group 1: Personal Details */}
//   <div>
//     <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
//     <input
//       placeholder="John Doe"
//       disabled={applicationCreated}
//       className="w-full border border-slate-300 p-3 rounded-xl text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
//       onChange={(e) => setForm({ ...form, fullName: e.target.value })}
//     />
//   </div>

//   <div>
//     <label className="block text-sm font-semibold text-slate-700 mb-1.5">PAN Number</label>
//     <input
//       placeholder="ABCDE1234F"
//       disabled={applicationCreated}
//       className="w-full border border-slate-300 p-3 rounded-xl text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed uppercase"
//       onChange={(e) => setForm({ ...form, pan: e.target.value })}
//     />
//   </div>

//   <div>
//     <label className="block text-sm font-semibold text-slate-700 mb-1.5">Date of Birth</label>
//     <input
//       type="date"
//       disabled={applicationCreated}
//       className="w-full border border-slate-300 p-3 rounded-xl text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
//       onChange={(e) => setForm({ ...form, dob: e.target.value })}
//     />
//   </div>

//   <div>
//     <label className="block text-sm font-semibold text-slate-700 mb-1.5">Employment Mode</label>
//     <select
//       disabled={applicationCreated}
//       className="w-full border border-slate-300 p-3 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed bg-white"
//       onChange={(e) => setForm({ ...form, employmentMode: e.target.value })}
//     >
//       <option value="SALARIED">Salaried</option>
//       <option value="UNEMPLOYED">Unemployed</option>
//     </select>
//   </div>

//   <div>
//     <label className="block text-sm font-semibold text-slate-700 mb-1.5">Monthly Salary (₹)</label>
//     <input
//       type="number"
//       placeholder="50000"
//       disabled={applicationCreated}
//       className="w-full border border-slate-300 p-3 rounded-xl text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
//       onChange={(e) => setForm({ ...form, monthlySalary: e.target.value })}
//     />
//   </div>

//   {/* Group 2: Loan Specs */}
//   <div className="md:col-span-2 border-t border-slate-200 mt-2 pt-6 pb-2">
//     <h3 className="text-lg font-bold text-slate-900 mb-4">Loan Requirements</h3>
//   </div>

//   <div>
//     <label className="block text-sm font-semibold text-slate-700 mb-1.5">Requested Amount (₹)</label>
//     <input
//       type="number"
//       placeholder="100000"
//       disabled={applicationCreated}
//       className="w-full border border-slate-300 p-3 rounded-xl text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
//       onChange={(e) => setForm({ ...form, amount: e.target.value })}
//     />
//   </div>

//   <div>
//     <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tenure (in Days)</label>
//     <input
//       type="number"
//       placeholder="365"
//       disabled={applicationCreated}
//       className="w-full border border-slate-300 p-3 rounded-xl text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
//       value={form.tenure}
//       onChange={(e) => setForm({ ...form, tenure: e.target.value })}
//     />
//   </div>

//   <div>
//     <label className="block text-sm font-semibold text-slate-700 mb-1.5">Interest Rate (%)</label>
//     <input
//       type="number"
//       placeholder="12"
//       disabled={applicationCreated}
//       className="w-full border border-slate-300 p-3 rounded-xl text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all bg-slate-50 disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
//       value={form.interestRate}
//       onChange={(e) => setForm({ ...form, interestRate: e.target.value })}
//     />
//   </div>

//   {/* Conditional File Upload */}
//   <div className={`md:col-span-2 transition-opacity duration-300 ${!applicationCreated ? 'opacity-50' : 'opacity-100'}`}>
//     <label className="block text-sm font-semibold text-slate-700 mb-1.5">Upload Salary Slip (PDF/Image)</label>
//     <input
//       type="file"
//       disabled={!applicationCreated}
//       className="w-full border border-slate-300 p-2.5 rounded-xl bg-white text-slate-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
//       onChange={(e) => setSalarySlip(e.target.files?.[0] || null)}
//     />
//   </div>

//   {/* Submit Buttons */}
//   <div className="md:col-span-2 mt-4">
//     {!applicationCreated ? (
//       <button
//         type="button"
//         onClick={createApplication}
//         disabled={loading}
//         className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex justify-center items-center gap-2"
//       >
//         {loading ? (
//           <>
//             <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
//             Creating Application...
//           </>
//         ) : "Create Application"}
//       </button>
//     ) : (
//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-slate-900/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex justify-center items-center gap-2"
//       >
//         {loading ? "Applying..." : "Upload Slip & Apply for Loan"}
//       </button>
//     )}
//   </div>

// </form>
//   </div>
// </div>
//   )
// }