import Link from "next/link"

export default function HomePage() {

  return (

    <div className="
      min-h-screen
      flex
      flex-col
      items-center
      justify-center
      gap-6
    ">

      <h1 className="text-4xl font-bold">

        Loan Management System

      </h1>

      <p className="text-gray-600">

        MERN + Next.js + TypeScript

      </p>

      <div className="flex gap-4">

        <Link
          href="/login"

          className="
          bg-black
          text-white
          px-5
          py-2
          rounded
        "
        >
          Login
        </Link>

        <Link
          href="/register"

          className="
          border
          px-5
          py-2
          rounded
        "
        >
          Register
        </Link>

      </div>

    </div>
  )
}