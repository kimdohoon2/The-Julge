import { Notice } from '@/app/types/Shop';

export function hourPayComparisom(notice: Notice[], not: Notice) {
  const calculateAverageHourlyPay = (notice: Notice[]) => {
    const totalHourlyPay = notice.reduce((acc, not) => acc + not.item.hourlyPay, 0);
    return totalHourlyPay / notice.length;
  };

  const averageHourlyPay = notice ? calculateAverageHourlyPay(notice) : 0;
  const isHigherThanAverage = not.item.hourlyPay >= averageHourlyPay * 1.1;
  const percentageDifference = ((not.item.hourlyPay - averageHourlyPay) / averageHourlyPay) * 100;

  return { isHigherThanAverage, percentageDifference };
}
