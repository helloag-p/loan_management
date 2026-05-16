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

      <h1 className="text-3xl font-bold mb-6">

        Applied Loans

      </h1>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
      >

        {loans.map((loan) => (

          <div
            key={loan._id}

            className="
              border
              rounded-lg
              p-5
              shadow
              space-y-2
            "
          >

            <h2 className="text-xl font-bold">

              {
                loan.application?.fullName
              }

            </h2>

            <p>
              Email:
              {
                loan.borrower?.email
              }
            </p>

            <p>
              PAN:
              {
                loan.application?.pan
              }
            </p>

            <p>
              Salary:
              ₹{
                loan.application
                  ?.monthlySalary
              }
            </p>

            <p>
              Employment:
              {
                loan.application
                  ?.employmentMode
              }
            </p>
            <p>
  Salary Slip:
</p>

<a

  href={`http://localhost:5000/${loan.application.salarySlip}`}

  target="_blank"

  className="
    text-blue-400
    underline
  "
>

  View Salary Slip

</a>

            <p>
              Amount:
              ₹{loan.amount}
            </p>

            <p>
              Interest:
              {
                loan.interestRate
              }%
            </p>

            <p>
              Tenure:
              {loan.tenure} days
            </p>

            <p>
              Status:
              {loan.status}
            </p>

            <button

              onClick={() =>
                approveLoan(
                  loan._id
                )
              }

              className="
                bg-green-500
                text-white
                px-4
                py-2
                mt-3
                rounded
                w-full
              "
            >

              Approve Loan

            </button>

          </div>
        ))}

      </div>
    </div>
  )
}