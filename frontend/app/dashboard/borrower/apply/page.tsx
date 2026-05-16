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

//   const uploadSalarySlip =
//     async () => {

//       if (!salarySlip)
//         return null

//       const formData =
//         new FormData()

//       formData.append(
//         "salarySlip",
//         salarySlip
//       )

//       const res =
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

//       return res.data.file
//     }

//   const handleSubmit =
//     async (
//       e: React.FormEvent
//     ) => {

//       e.preventDefault()

//       try {

//         setLoading(true)

//         if (!salarySlip) {

//   toast.error(
//     "Please select salary slip"
//   )

//   return
// }

// const salarySlipPath =
//   await uploadSalarySlip()

// if (!salarySlipPath) {

//   toast.error(
//     "Salary slip upload failed"
//   )

//   setLoading(false)

//   return
// }
//         // Create application

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

//               salarySlip:
//                 salarySlipPath
//             }
//           )
//           console.log(appRes.data)

//         // Apply loan

//         await api.post(

//           "/loan/apply",

//           {

//             applicationId:
//               appRes.data.application._id,

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

//     <div className="max-w-3xl">

//       <h1 className="
//         text-3xl
//         font-bold
//         mb-6
//       ">

//         Apply Loan

//       </h1>

//       <form

//         onSubmit={handleSubmit}

//         className="
//         grid
//         grid-cols-1
//         md:grid-cols-2
//         gap-4
//       "
//       >

//         <input
//           placeholder="Full Name"

//           className="
//           border
//           p-3
//           rounded
//         "

//           onChange={(e) =>
//             setForm({

//               ...form,

//               fullName:
//                 e.target.value
//             })
//           }
//         />

//         <input
//           placeholder="PAN Number"

//           className="
//           border
//           p-3
//           rounded
//         "

//           onChange={(e) =>
//             setForm({

//               ...form,

//               pan:
//                 e.target.value
//             })
//           }
//         />

//         <input
//           type="date"

//           className="
//           border
//           p-3
//           rounded
//         "

//           onChange={(e) =>
//             setForm({

//               ...form,

//               dob:
//                 e.target.value
//             })
//           }
//         />

//         <input
//           type="number"

//           placeholder="Monthly Salary"

//           className="
//           border
//           p-3
//           rounded
//         "

//           onChange={(e) =>
//             setForm({

//               ...form,

//               monthlySalary:
//                 e.target.value
//             })
//           }
//         />

//         <select

//           className="
//           border
//           p-3
//           rounded
//         "

//           onChange={(e) =>
//             setForm({

//               ...form,

//               employmentMode:
//                 e.target.value
//             })
//           }
//         >

//           <option value="SALARIED">
//             SALARIED
//           </option>

//           <option value="UNEMPLOYED">
//             UNEMPLOYED
//           </option>

//         </select>

//         <input
//           type="file"

//           className="
//           border
//           p-3
//           rounded
//         "

//           onChange={(e) =>

//             setSalarySlip(

//               e.target.files?.[0] || null
//             )
//           }
//         />

//         <input
//           type="number"

//           placeholder="Loan Amount"

//           className="
//           border
//           p-3
//           rounded
//         "

//           onChange={(e) =>
//             setForm({

//               ...form,

//               amount:
//                 e.target.value
//             })
//           }
//         />

//         <input
//           type="number"

//           placeholder="Tenure (Days)"

//           className="
//           border
//           p-3
//           rounded
//         "

//           value={form.tenure}

//           onChange={(e) =>
//             setForm({

//               ...form,

//               tenure:
//                 e.target.value
//             })
//           }
//         />

//         <input
//           type="number"

//           placeholder="Interest Rate"

//           className="
//           border
//           p-3
//           rounded
//         "

//           value={form.interestRate}

//           onChange={(e) =>
//             setForm({

//               ...form,

//               interestRate:
//                 e.target.value
//             })
//           }
//         />

//         <button

//           type="submit"

//           disabled={loading}

//           className="
//           bg-black
//           text-white
//           py-3
//           rounded
//           md:col-span-2
//         "
//         >

//           {
//             loading
//               ? "Applying..."
//               : "Apply Loan"
//           }

//         </button>

//       </form>

//     </div>
//   )
// }
"use client"

import {
  useState
} from "react"

import api from "@/services/api"

import toast from "react-hot-toast"

export default function ApplyLoanPage() {

  const [form, setForm] =
    useState({

      fullName: "",

      pan: "",

      dob: "",

      monthlySalary: "",

      employmentMode: "SALARIED",

      amount: "",

      tenure: "180",

      interestRate: "12"
    })

  const [salarySlip, setSalarySlip] =
    useState<File | null>(null)

  const [loading, setLoading] =
    useState(false)

  const [applicationCreated,
    setApplicationCreated] =
    useState(false)

  const [applicationId,
    setApplicationId] =
    useState("")

  // CREATE APPLICATION

  const createApplication =
    async () => {

      try {

        setLoading(true)

        const appRes =
          await api.post(

            "/application",

            {

              fullName:
                form.fullName,

              pan:
                form.pan,

              dob:
                form.dob,

              monthlySalary:
                Number(
                  form.monthlySalary
                ),

              employmentMode:
                form.employmentMode,

              salarySlip: ""
            }
          )

        setApplicationId(
          appRes.data.application._id
        )

        setApplicationCreated(true)

        toast.success(
          "Application created. Now upload salary slip."
        )

      } catch (error: any) {

        toast.error(

          error?.response?.data?.message ||

          "Failed to create application"
        )

      } finally {

        setLoading(false)
      }
    }

  // APPLY LOAN

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault()

      try {

        if (!salarySlip) {

          toast.error(
            "Please upload salary slip"
          )

          return
        }

        setLoading(true)

        // UPLOAD SALARY SLIP

        const formData =
          new FormData()

        formData.append(
          "salarySlip",
          salarySlip
        )

        formData.append(
          "applicationId",
          applicationId
        )

        await api.post(

          "/upload/salary-slip",

          formData,

          {
            headers: {
              "Content-Type":
                "multipart/form-data"
            }
          }
        )

        // APPLY LOAN

        await api.post(

          "/loan/apply",

          {

            applicationId,

            amount:
              Number(form.amount),

            tenure:
              Number(form.tenure),

            interestRate:
              Number(
                form.interestRate
              )
          }
        )

        toast.success(
          "Loan applied successfully"
        )

        window.location.href =
          "/dashboard/borrower"

      } catch (error: any) {

        toast.error(

          error?.response?.data?.message ||

          "Something went wrong"
        )

      } finally {

        setLoading(false)
      }
    }

  return (

    <div className="max-w-3xl">

      <h1 className="
        text-3xl
        font-bold
        mb-3
      ">

        Apply Loan

      </h1>

      <div className="
        border
        border-yellow-500
        bg-yellow-100
        text-black
        p-4
        rounded
        mb-6
      ">

        <p className="font-semibold">

          Important Information

        </p>

        <p className="text-sm mt-2">

          First create your application.
          After application creation,
          salary slip upload will be enabled.

        </p>

      </div>

      <form

        onSubmit={handleSubmit}

        className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-4
      "
      >

        <input
          placeholder="Full Name"

          disabled={applicationCreated}

          className="
          border
          p-3
          rounded
        "

          onChange={(e) =>
            setForm({

              ...form,

              fullName:
                e.target.value
            })
          }
        />

        <input
          placeholder="PAN Number"

          disabled={applicationCreated}

          className="
          border
          p-3
          rounded
        "

          onChange={(e) =>
            setForm({

              ...form,

              pan:
                e.target.value
            })
          }
        />

        <input
          type="date"

          disabled={applicationCreated}

          className="
          border
          p-3
          rounded
        "

          onChange={(e) =>
            setForm({

              ...form,

              dob:
                e.target.value
            })
          }
        />

        <input
          type="number"

          placeholder="Monthly Salary"

          disabled={applicationCreated}

          className="
          border
          p-3
          rounded
        "

          onChange={(e) =>
            setForm({

              ...form,

              monthlySalary:
                e.target.value
            })
          }
        />

        <select

          disabled={applicationCreated}

          className="
          border
          p-3
          rounded
        "

          onChange={(e) =>
            setForm({

              ...form,

              employmentMode:
                e.target.value
            })
          }
        >

          <option value="SALARIED">
            SALARIED
          </option>

          <option value="UNEMPLOYED">
            UNEMPLOYED
          </option>

        </select>

        {/* FILE INPUT */}

        <input
          type="file"

          disabled={!applicationCreated}

          className="
          border
          p-3
          rounded
        "

          onChange={(e) =>

            setSalarySlip(

              e.target.files?.[0] || null
            )
          }
        />

        <input
          type="number"

          placeholder="Loan Amount"

          className="
          border
          p-3
          rounded
        "

          onChange={(e) =>
            setForm({

              ...form,

              amount:
                e.target.value
            })
          }
        />

        <input
          type="number"

          placeholder="Tenure (Days)"

          className="
          border
          p-3
          rounded
        "

          value={form.tenure}

          onChange={(e) =>
            setForm({

              ...form,

              tenure:
                e.target.value
            })
          }
        />

        <input
          type="number"

          placeholder="Interest Rate"

          className="
          border
          p-3
          rounded
        "

          value={form.interestRate}

          onChange={(e) =>
            setForm({

              ...form,

              interestRate:
                e.target.value
            })
          }
        />

        {/* CREATE APPLICATION BUTTON */}

        {!applicationCreated && (

          <button

            type="button"

            onClick={createApplication}

            disabled={loading}

            className="
            bg-blue-600
            text-white
            py-3
            rounded
            md:col-span-2
          "
          >

            {
              loading
                ? "Creating..."
                : "Create Application"
            }

          </button>
        )}

        {/* APPLY LOAN BUTTON */}

        {applicationCreated && (

          <button

            type="submit"

            disabled={loading}

            className="
            bg-black
            text-white
            py-3
            rounded
            md:col-span-2
          "
          >

            {
              loading
                ? "Applying..."
                : "Upload Slip & Apply Loan"
            }

          </button>
        )}

      </form>

    </div>
  )
}