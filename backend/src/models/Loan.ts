import mongoose, {
  Schema,
  Document
} from "mongoose"

export interface ILoan
  extends Document {

  borrower:
    mongoose.Types.ObjectId

  application:
    mongoose.Types.ObjectId

  amount: number

  tenure: number

  interestRate: number

  simpleInterest: number

  totalRepayment: number

  outstandingAmount: number

  status:
    | "APPLIED"
    | "SANCTIONED"
    | "REJECTED"
    | "DISBURSED"
    | "CLOSED"

  rejectionReason?: string

  disbursedAt?: Date
}

const loanSchema =
  new Schema<ILoan>(
    {

      borrower: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      },

      application: {
        type: Schema.Types.ObjectId,
        ref: "Application",
        required: true
      },

      amount: {
        type: Number,
        required: true
      },

      tenure: {
        type: Number,
        required: true
      },

      interestRate: {
        type: Number,
        default: 12
      },

      simpleInterest: {
        type: Number,
        required: true
      },

      totalRepayment: {
        type: Number,
        required: true
      },

      outstandingAmount: {
        type: Number,
        required: true
      },

      status: {

        type: String,

        enum: [
          "APPLIED",
          "SANCTIONED",
          "REJECTED",
          "DISBURSED",
          "CLOSED"
        ],

        default: "APPLIED"
      },

      rejectionReason: {
        type: String
      },

      disbursedAt: {
        type: Date
      }
    },

    {
      timestamps: true
    }
  )

const Loan =
  mongoose.model<ILoan>(
    "Loan",
    loanSchema
  )

export default Loan