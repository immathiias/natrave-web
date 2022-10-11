import { useState, useEffect } from 'react'
import { useAsyncFn, useLocalStorage } from 'react-use'
import { useParams, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import axios from 'axios'

import { Icon, Card, RoundSelect } from '~/components'

export const Profile = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [currentRound, setRound] = useState('1')
  const [auth, setAuth] = useLocalStorage('auth', {})

  const [{ value: user, loading, error }, fetchHunches] = useAsyncFn(async () => {
    const res = await axios({
      method: 'get',
      baseURL: import.meta.env.VITE_API_URL,
      url: `/${params.username}`,
    })

    const hunches = res.data.hunches.reduce((acc, hunch) => {
      acc[hunch.gameId] = hunch
      return acc
    }, {})

    return {
      ...res.data,
      hunches
    }
  })

  const [games, fetchGames] = useAsyncFn(async (params) => {
    const res = await axios({
      method: 'get',
      baseURL: import.meta.env.VITE_API_URL,
      url: '/games',
      params
    })

    return res.data

  })

  const logout = () => {
    setAuth({})
    navigate('/login')
  }

  const isLoading = games.loading || loading
  const hasError = games.error || error
  const isDone = !isLoading && !hasError

  useEffect(() => {
    fetchHunches()
  }, [])

  useEffect(() => {
    fetchGames({ rod: currentRound })
  }, [currentRound])


  return (
    <>

      <header className="bg-red-500 text-white p-4">
        <div className="container max-w-3xl flex justify-between items-center">
          <img src="/logo/logo-fundo-vermelho.svg" className="w-28 md:w-40" />
          {auth?.user?.username == params.username ?
            <div onClick={logout} className="flex items-center gap-1 cursor-pointer">
              <span className="font-bold border-y-2 border-l-2 rounded px-2">Sair</span>
              <Icon name="logout" className="w-6" />
            </div> : ''}
        </div>
      </header>

      <main className="space-y-6">
        <section id="header" className="bg-red-500 text-white">
          <div className="container max-w-3xl space-y-4 p-4">
            <a href="/dashboard">
              <Icon name="back" className="w-6 sm:w-8" />
            </a>
            {auth?.user?.username == params.username ? <h3 className="text-2xl font-bold">  {user?.name}</h3> : <h3 className="text-2xl font-bold">Palpites de {user?.name}</h3>}
          </div>
        </section>

        <section id="content" className="container max-w-3xl py-4 px-2 sm:px-4 space-y-4">
          {auth?.user?.username == params.username
            ? <h2 className="text-xl text-red-500 font-bold px-2">Seus palpites</h2>
            : ''}


          <RoundSelect currentRound={currentRound} onChange={setRound} />

          <div className="space-y-4">
            {isLoading && <Icon name="spinnerTwo" className="w-10 h-10" />}
            {hasError && 'Ops! Algo deu errado.'}

            {isDone && !games.error && games.value?.map(game => (
              <Card
                key={game.id}
                gameId={game.id}
                homeTeam={game.homeTeam}
                awayTeam={game.awayTeam}
                group={game.grp}
                rod={game.rod}
                btn={undefined}
                date={format(new Date(game.gameTime), "d 'de' MMMM", { locale: ptBR })}
                gameTime={format(new Date(game.gameTime), 'HH:mm')}
                homeTeamScore={user?.hunches?.[game.id]?.homeTeamScore == undefined ? '' : user?.hunches?.[game.id]?.homeTeamScore}
                awayTeamScore={user?.hunches?.[game.id]?.awayTeamScore == undefined ? '' : user?.hunches?.[game.id]?.awayTeamScore}
                disabled={true}
              />
            ))}

          </div>
        </section>
      </main>
    </>
  )
}