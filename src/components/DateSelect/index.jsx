import { addDays, subDays, format, formatISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Icon } from '~/components/Icon'

export const DateSelect = ({ currentDate, onChange }) => {

  const date = new Date(currentDate)
  const prevDay = () => {
    const subDate = subDays(date, 1)
    onChange(formatISO(subDate))
  }
  const nextDay = () => {
    const nextDate = addDays(date, 1)
    onChange(formatISO(nextDate))

  }

  return (
    <div className="p-4 flex space-x-4 justify-center items-center">
      <Icon name="arrowLeft" className="text-red-500 w-6 cursor-pointer select-none" onClick={prevDay} />
      <span className="font-bold text-red-700 select-none"> {format(date, "d 'de' MMMM", { locale: ptBR })} </span>
      <Icon name="arrowRight" className="text-red-500 w-6 cursor-pointer select-none" onClick={nextDay} />
    </div>
  )
}