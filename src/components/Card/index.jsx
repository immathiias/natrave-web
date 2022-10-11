import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useLocalStorage } from 'react-use'
import innerText from 'react-innertext';

const validationSchema = yup.object().shape({
  homeTeamScore: yup.string().required(),
  awayTeamScore: yup.string().required()
})

export const Card = ({ disabled, gameId, homeTeam, awayTeam, homeTeamScore, awayTeamScore, gameTime, date, rod, group, btn }) => {
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

      let btnClicked = document.getElementById(`btnClick${gameId}`)
      {
        (values.homeTeamScore >= 0) && (values.awayTeamScore >= 0) ?
          btnClicked.textContent = innerText('salvo com sucesso!')
          : btnClicked.textContent = innerText('erro ao salvar')
      }
      setTimeout(function () {
        btnClicked.textContent = innerText('salvar palpite')
      }, 500)
    },

    initialValues: {
      homeTeamScore,
      awayTeamScore
    },
    validationSchema

  })


  return (
    <div className="rounded-xl border border-grey-300 p-4 text-center space-y-3">

      <div className='grid'>
        {rod <= 3 ? <span className="text-sm md:text-base text-red-500 font-bold select-none uppercase">Grupo {group}</span>
          : ''}
        <span className="text-sm md:text-base text-red-700 font-bold select-none">{date} ás {gameTime}</span>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col space-y-4 space-x-2 mx:space-x-4 justify-center items-center">

        <div className="flex space-x-2 mx:space-x-4 justify-center items-center">
          <span className="text-sm sm:text-md font-bold uppercase">{homeTeam}</span>
          <img src={`/flags/${homeTeam}.png`} className="w-10 h-10 sm:w-12 sm:h-12" />

          <input
            type="number"
            className="bg-red-300/[0.2] w-8 h-10 sm:h-12 sm:w-12 text-red-700 font-bold text-center rounded"
            name="homeTeamScore"
            value={formik.values.homeTeamScore}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={disabled}
          />

          <span className="text-red-500 font-bold">X</span>

          <input
            type="number"
            className="bg-red-300/[0.2] w-8 h-10 sm:h-12 sm:w-12 text-red-700 font-bold text-center rounded"
            name="awayTeamScore"
            value={formik.values.awayTeamScore}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={disabled}
          />

          <img src={`/flags/${awayTeam}.png`} className="w-10 h-10 sm:w-12 sm:h-12" />
          <span className="text-sm sm:text-md font-bold uppercase">{awayTeam}</span>
        </div>

        {btn == true ?
          <button type="submit" id={`btnClick${gameId}`}
            className="bg-red-500 text-white text-center font-bold px-4 py-1 rounded border-2 border-red-500 uppercase 
            disabled:opacity-50
            hover:bg-red-700 ease-in duration-200" disabled={!formik.isValid} >
            {formik.handleChange && formik.isValid ? 'salvar palpite' : 'faça um palpite'}
          </button>

          : ''}
      </form>

    </div >
  )
}