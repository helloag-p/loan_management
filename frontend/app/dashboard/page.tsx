"use client"

import {
  useAuthStore
} from "@/store/authStore"

export default function DashboardPage() {

  const { user } =
    useAuthStore()

  return (

    <div>

      <h1 className="text-3xl font-bold">

        Welcome {user?.name}

      </h1>

      <p className="mt-2">
        Role: {user?.role}
      </p>

    </div>
  )
}