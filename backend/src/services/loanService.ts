export const calculateLoan =
(
  principal: number,
  tenure: number
) => {

  const rate = 12

  const simpleInterest =
    (
      principal *
      rate *
      tenure
    ) / (365 * 100)

  const totalRepayment =
    principal +
    simpleInterest

  return {

    interestRate: rate,

    simpleInterest:
      Number(
        simpleInterest.toFixed(2)
      ),

    totalRepayment:
      Number(
        totalRepayment.toFixed(2)
      )
  }
}