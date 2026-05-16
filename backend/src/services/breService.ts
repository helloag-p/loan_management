interface BREInput {

  dob: Date

  monthlySalary: number

  pan: string

  employmentMode: string
}

export const runBRE = (
  data: BREInput
) => {

  const age =
    new Date().getFullYear() -
    new Date(data.dob).getFullYear()

  if (age < 23 || age > 50) {

    return {
      success: false,
      message:
        "Age must be between 23 and 50"
    }
  }

  if (data.monthlySalary < 25000) {

    return {
      success: false,
      message:
        "Salary must be above 25000"
    }
  }

  const panRegex =
    /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/

  if (!panRegex.test(data.pan)) {

    return {
      success: false,
      message:
        "Invalid PAN format"
    }
  }

  if (
    data.employmentMode ===
    "UNEMPLOYED"
  ) {

    return {
      success: false,
      message:
        "Employment not eligible"
    }
  }

  return {
    success: true
  }
}