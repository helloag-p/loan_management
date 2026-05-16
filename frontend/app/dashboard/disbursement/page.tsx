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

      <h1 className="text-3xl font-bold mb-6">

        Sanctioned Loans

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
              Amount:
              ₹{loan.amount}
            </p>

            <p>
              Outstanding:
              ₹{
                loan.outstandingAmount
              }
            </p>

            <p>
              Status:
              {loan.status}
            </p>

            <button

              onClick={() =>
                disburseLoan(
                  loan._id
                )
              }

              className="
                bg-blue-500
                text-white
                px-4
                py-2
                mt-3
                rounded
                w-full
              "
            >

              Disburse Loan

            </button>

          </div>
        ))}

      </div>
    </div>
  )
}