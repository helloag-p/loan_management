import mongoose, {
  Schema,
  Document
} from "mongoose"

export interface IApplication
  extends Document {

  userId: mongoose.Types.ObjectId

  fullName: string

  pan: string

  dob: Date

  monthlySalary: number

  employmentMode:
    | "SALARIED"
    | "SELF_EMPLOYED"
    | "UNEMPLOYED"

  salarySlip: string

  brePassed: boolean
}

const applicationSchema =
  new Schema<IApplication>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      },

      fullName: {
        type: String,
        required: true
      },

      pan: {
        type: String,
        required: true
      },

      dob: {
        type: Date,
        required: true
      },

      monthlySalary: {
        type: Number,
        required: true
      },

      employmentMode: {
        type: String,

        enum: [
          "SALARIED",
          "SELF_EMPLOYED",
          "UNEMPLOYED"
        ],

        required: true
      },

      salarySlip: {
        type: String,
        default: ""
      },

      brePassed: {
        type: Boolean,
        default: false
      }
    },

    {
      timestamps: true
    }
  )

const Application =
  mongoose.model<IApplication>(
    "Application",
    applicationSchema
  )

export default Application