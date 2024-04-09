import { PokemonContext } from "../context/PokemonContext";
import { useContext } from "react";

const usePokemonContext = () => useContext(PokemonContext)

export default usePokemonContext;