"use client"

import { useState } from "react"

import api from "@/services/api"

import {
  useAuthStore
} from "@/store/authStore"

export default function RegisterPage() {

  const { setAuth } =
    useAuthStore()

  const [form, setForm] =
    useState({

      name: "",

      email: "",

      password: ""
    })

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault()

      try {

        const res =
          await api.post(

            "/auth/register",

            form
          )

        setAuth(

          res.data.token,

          res.data.user
        )

        window.location.href =
          "/dashboard"

      } catch (error) {

        console.log(error)
      }
    }

  return (

    <div className="
      flex
      items-center
      justify-center
      min-h-screen
    ">

      <form
        onSubmit={handleSubmit}

        className="
        space-y-4
        w-[350px]
      "
      >

        <h1 className="
          text-3xl
          font-bold
          text-center
        ">
          Register
        </h1>

        <input
          placeholder="Name"

          className="
          border
          p-2
          w-full
        "

          onChange={(e) =>
            setForm({

              ...form,

              name:
                e.target.value
            })
          }
        />

        <input
          placeholder="Email"

          className="
          border
          p-2
          w-full
        "

          onChange={(e) =>
            setForm({

              ...form,

              email:
                e.target.value
            })
          }
        />

        <input
          type="password"

          placeholder="Password"

          className="
          border
          p-2
          w-full
        "

          onChange={(e) =>
            setForm({

              ...form,

              password:
                e.target.value
            })
          }
        />

        <button
          type="submit"

          className="
          bg-black
          text-white
          px-4
          py-2
          w-full
        "
        >

          Register

        </button>

      </form>

    </div>
  )
}