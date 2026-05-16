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

    <div>

      <h1 className="text-3xl font-bold mb-6">

        My Loans

      </h1>

      {loans.length === 0 && (

        <p>
          No loans found
        </p>
      )}

      <div className="
grid
grid-cols-1
md:grid-cols-2
gap-6
">

        {loans.map((loan) => (

          <div

            key={loan._id}

            className="border rounded-lg p-5 shadow"

          >

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-xl font-bold">

                  Loan Details

                </h2>

                <p>
                  Amount:
                  ₹{loan.amount}
                </p>

                <p>
                  Interest:
                  ₹{loan.simpleInterest}
                </p>

                <p>
                  Total Repayment:
                  ₹{loan.totalRepayment}
                </p>

                <p>
                  Outstanding:
                  ₹{loan.outstandingAmount}
                </p>

                <p>
                  Tenure:
                  {loan.tenure} days
                </p>

              </div>

              <StatusBadge
                status={loan.status}
              />

            </div>

            {/* Timeline */}

            <div className="mt-5 border-t pt-4">

              <h3 className="font-semibold mb-2">

                Loan Timeline

              </h3>

              <div className="flex gap-3 flex-wrap">

                <span className="bg-gray-200 px-3 py-1 rounded">

                  Applied
                </span>

                {[
                  "SANCTIONED",
                  "DISBURSED",
                  "CLOSED"
                ].includes(
                  loan.status
                ) && (

                  <span className="bg-blue-300 px-3 py-1 rounded">

                    Sanctioned
                  </span>
                )}

                {[
                  "DISBURSED",
                  "CLOSED"
                ].includes(
                  loan.status
                ) && (

                  <span className="bg-purple-300 px-3 py-1 rounded">

                    Disbursed
                  </span>
                )}

                {loan.status ===
                  "CLOSED" && (

                  <span className="bg-green-300 px-3 py-1 rounded">

                    Closed
                  </span>
                )}

                {loan.status ===
                  "REJECTED" && (

                  <span className="bg-red-300 px-3 py-1 rounded">

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