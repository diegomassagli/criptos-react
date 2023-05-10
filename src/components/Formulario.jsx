import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Error from './Error'

import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'


const InputSubmit = styled.input`
  background-color : #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  margin-top: 30px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color .3s ease;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`

const Formulario = ({ setMonedas }) => {
  const [ criptos, setCriptos ] = useState([])

  const [ error, setError ] = useState(false)

  const [ moneda, SelectMonedas ] = useSelectMonedas('Elije tu Moneda', monedas)
  const [ criptomoneda, SelectCriptomoneda ] = useSelectMonedas('Elije tu Criptomoneda', criptos)
  
  useEffect( () => {
    const consultarAPI = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()
      
      const arrayCriptos = resultado.Data.map( cripto => {
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName
        }
        return objeto    // si no hago el return, por fuera del map el arrayCriptos quedaria como undeffined  !!!
      })
      
      setCriptos(arrayCriptos)   // voy llenando el state local con lo que llego de la API

    }
    consultarAPI();
  }, [])  //se ejecuta 1 vez cuando el componenete este listo

  const handleSubmit = e => {
    e.preventDefault()

    if ([moneda, criptomoneda].includes('')) {   //
      setError(true)

      setTimeout(() => {
        setError(false)
      }, 3000);
      return
    }
    setError(false)
    setMonedas({
      moneda,
      criptomoneda
    })

  }

  return (
    <>
      {error && <Error>Todos los Campos son Obligatorios</Error>}
        <form 
          onSubmit={handleSubmit}
        >
          <SelectMonedas />
          <SelectCriptomoneda />
      
          <InputSubmit 
            type="submit" 
            value="Cotizar" 
          />




        </form>
    </>
  )
}

export default Formulario
