import Aside from './components/Aside'
import Pokemons from './components/Pokemons'
import ModalPokemon from './components/ModalPokemon'
import usePokemonContext from './hooks/usePokemonContext'

function App() {
  const { showDetailPokemon, closePokemonDetail, pokemonDetail } = usePokemonContext()

  return (
    <section className='bg-[#F6F8FC] h-screen font-outfit overflow-y-auto'>
     <main className='max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_350px]'>
      <Pokemons />
      <Aside />
      <ModalPokemon 
        showModal={showDetailPokemon}
        onCloseModal={closePokemonDetail}
        pokemon={pokemonDetail}
      />
     </main>
    </section>
  )
}

export default App
