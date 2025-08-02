import React, { Suspense, useState, useCallback, lazy } from 'react'
import './App.css'
import Loader from './components/Loader'
import { PokemonModalProvider } from './context/PokemonModalProvider'

const TypesBar = lazy(() => import('./components/TypesBar'))
const PokemonsContainer = lazy(() => import('./components/PokemonsContainer'))
const Modal = lazy(() => import('./components/modal/Modal'))

export default function App() {
  const [type, setType] = useState('ice')
  const handleTypeChange = useCallback(newType => setType(newType), [])

  return (
    <PokemonModalProvider>
      <div className="app">
        <header className="app__header">
          <h1 className="app__logo">Pokédex</h1>
        </header>

        <main className="app__content">
          <Suspense fallback={<Loader />}>
            <TypesBar onSelectType={handleTypeChange} selectedType={type} />
            <PokemonsContainer type={type} />
          </Suspense>
        </main>

        <Modal />
      </div>
    </PokemonModalProvider>
  )
}
