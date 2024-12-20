export function calculateIncreaseRate(hourlyPay: number, originalHourlyPay: number): string {
  return (((hourlyPay - originalHourlyPay) / originalHourlyPay) * 100).toFixed(0);
}

export function getDiscountClass(discountValue: number): string {
  return discountValue >= 50
    ? 'text-red-40 sm:bg-red-40 sm:text-white'
    : discountValue >= 30
      ? 'text-red-40 sm:bg-red-30 sm:text-white'
      : 'text-red-40 sm:bg-red-20 sm:text-white';
}
