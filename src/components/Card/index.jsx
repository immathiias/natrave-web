import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useLocalStorage } from 'react-use'

const validationSchema = yup.object().shape({
  homeTeamScore: yup.string().required(),
  awayTeamScore: yup.string().required()
})

export const Card = ({ disabled, gameId, homeTeam, awayTeam, homeTeamScore, awayTeamScore, gameTime }) => {
  const [auth] = useLocalStorage('auth')
  const formik = useFormik({
    onSubmit: (values) => {
      axios({
        method: 'post',
        baseURL: 'http://localhost:3000',
        url: '/hunches',
        headers: {
          authorization: `Bearer ${auth.accessToken}`
        },
        data: {
          ...values,
          gameId
        }
      })
    },
    initialValues: {
      homeTeamScore,
      awayTeamScore
    },
    validationSchema
  })

  return (
    <div className="rounded-xl border border-grey-300 p-4 text-center space-y-3">
      <span className="text-sm md:text-base text-grey-700 font-bold select-none">{gameTime}</span>

      <form className="flex space-x-2 mx:space-x-4 justify-center items-center">

        <span className="text-sm sm:text-md font-bold uppercase">{homeTeam}</span>
        <img src={`/flags/${homeTeam}.png`} className="w-10 h-10 sm:w-12 sm:h-12" />

        <input
          type="number"
          className="bg-red-300/[0.2] w-8 h-10 sm:h-12 sm:w-12 text-red-700 font-bold text-center rounded"
          name="homeTeamScore"
          value={formik.values.homeTeamScore}
          onChange={formik.handleChange}
          onBlur={formik.handleSubmit}
          disabled={disabled}
        />

        <span className="text-red-500 font-bold">X</span>

        <input
          type="number"
          className="bg-red-300/[0.2] w-8 h-10 sm:h-12 sm:w-12 text-red-700 font-bold text-center rounded"
          name="awayTeamScore"
          value={formik.values.awayTeamScore}
          onChange={formik.handleChange}
          onBlur={formik.handleSubmit}
          disabled={disabled}
        />

        <img src={`/flags/${awayTeam}.png`} className="w-10 h-10 sm:w-12 sm:h-12" />
        <span className="text-sm sm:text-md font-bold uppercase">{awayTeam}</span>
      </form>

    </div>
  )
}