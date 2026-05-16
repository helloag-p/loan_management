"use client"

import Link from "next/link"

import {
  useEffect
} from "react"

import {
  useAuthStore
} from "@/store/authStore"

export default function DashboardLayout({

  children

}: {
  children: React.ReactNode
}) {

  const {

    user,

    logout,

    hydrate,

    hydrated

  } = useAuthStore()

  useEffect(() => {

    hydrate()

  }, [])

  if (!hydrated) {

    return null
  }

  const role =
    user?.role

  return (

    <div className="
      flex
      flex-col
      md:flex-row
      min-h-screen
    ">

      {/* Sidebar */}

      <div className="
        w-full
        md:w-[250px]
        bg-black
        text-white
        p-5
      ">

        <h1 className="
          text-2xl
          font-bold
          mb-8
        ">

          LMS Dashboard

        </h1>

        <div className="space-y-4">

          {(role === "ADMIN" ||
            role === "SANCTION") && (

            <Link
              href="/dashboard/sanction"

              className="block"
            >
              Sanction
            </Link>
          )}

          {(role === "ADMIN" ||
            role === "DISBURSEMENT") && (

            <Link
              href="/dashboard/disbursement"

              className="block"
            >
              Disbursement
            </Link>
          )}

          {(role === "ADMIN" ||
            role === "COLLECTION") && (

            <Link
              href="/dashboard/collection"

              className="block"
            >
              Collection
            </Link>
          )}

          {(role === "ADMIN" ||
            role === "BORROWER") && (

            <div className="space-y-2">

  <Link
    href="/dashboard/borrower"
    className="block"
  >
    My Loans
  </Link>

  <Link
    href="/dashboard/borrower/apply"
    className="block"
  >
    Apply Loan
  </Link>

</div>
          )}

        </div>

        <button

          onClick={logout}

          className="
          mt-10
          bg-red-500
          px-4
          py-2
          rounded
        "
        >

          Logout

        </button>

      </div>

      {/* Main */}

      <div className="
        flex-1
        p-4
        md:p-6
      ">

        {children}

      </div>

    </div>
  )
}