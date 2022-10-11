import { useEffect } from 'react'
import { useAsyncFn } from 'react-use'
import axios from 'axios'

import { Icon } from '~/components/Icon'


export const RoundSelect = ({ currentRound, onChange }) => {
  const [games, fetchGames] = useAsyncFn(async (params) => {
    const res = await axios({
      method: 'get',
      baseURL: import.meta.env.VITE_API_URL,
      url: '/games',
      params
    })

    return res.data

  })
  const hasError = games.error

  useEffect(() => {
    fetchGames()
  }, [currentRound])

  const round = currentRound
  const prevRound = () => {
    const subRound = (parseFloat(round) - 1)
    onChange(subRound)
  }
  const nextRound = () => {
    const nextRound = (parseFloat(round) + 1)
    onChange(nextRound)
  }


  return (
    <div className="p-4 flex space-x-4 justify-center items-center">
      {hasError || round <= 1 ? <Icon name="arrowLeft" className="text-red-500/[0.3] w-6 select-none disabled" />
        :
        < Icon name="arrowLeft" className="text-red-500 w-6 cursor-pointer select-none" onClick={prevRound} />}
      {round < 4 ?
        <span className="font-bold text-red-700 select-none"> Rodada {round} </span>
        : round == 4 ? <span className="font-bold text-red-700 select-none"> Oitavas de Final </span>
          : round == 5 ? <span className="font-bold text-red-700 select-none"> Quartas de Final </span>
            : round == 6 ? <span className="font-bold text-red-700 select-none"> Semi Final </span>
              : round == 7 ? < span className="font-bold text-red-700 select-none"> Final </span>
                : ''
      }

      {
        hasError || round >= 7 ? <Icon name="arrowRight" className="text-red-500/[0.3] w-6 select-none disabled" />
          :
          < Icon name="arrowRight" className="text-red-500 w-6 cursor-pointer select-none" onClick={nextRound} />
      }
    </div >
  )
}