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

      <h1 className="text-3xl font-bold mb-6">

        Collection Dashboard

      </h1>

      <div className="space-y-6">

        {loans.map((loan) => (

          <div

  key={loan._id}

  className="
    border
    rounded-lg
    p-5
    shadow
  "

>

  <div className="
    flex
    flex-col
    md:flex-row
    justify-between
    gap-4
  ">

    <div className="space-y-1">

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
        Loan Amount:
        ₹{loan.amount}
      </p>

      <p>
        Total Repayment:
        ₹{
          loan.totalRepayment
        }
      </p>

      <p>
        Outstanding:
        ₹{
          loan.outstandingAmount
        }
      </p>

    </div>

    <StatusBadge
      status={loan.status}
    />

  </div>

  <div
    className="
      mt-5
      grid
      grid-cols-1
      md:grid-cols-3
      gap-4
    "
  >

    <input

      type="text"

      placeholder="UTR Number"

      className="
        border
        p-2
        rounded
      "

      onChange={(e) =>
        handleChange(
          loan._id,
          "utrNumber",
          e.target.value
        )
      }
    />

    <input

      type="number"

      placeholder="Amount"

      className="
        border
        p-2
        rounded
      "

      onChange={(e) =>
        handleChange(
          loan._id,
          "amount",
          e.target.value
        )
      }
    />

    <button

      onClick={() =>
        submitPayment(
          loan._id
        )
      }

      className="
        bg-black
        text-white
        rounded
        px-4
        py-2
      "

    >

      Record Payment

    </button>

  </div>

</div>
        ))}

      </div>
    </div>
  )
}