import styled from "@emotion/styled"

const Contenedor = styled.div`
  color: #fff;
  font-family: 'Lato', sans-serif;  
  display: flex;
  align-items: start;
  gap: 1rem;
`
const Texto = styled.p`
  font-size: 18px;
  span{
    font-weight: 700;
  }
`
const Imagen = styled.img`
  display: block;                // por defecto las imagenes tienen display: inline y el flex hace que se estiren. salvo que le ponga align-items: start
  width: 120px;
  margin-top: 30px;
`
const Precio = styled.p`
  font-size: 24px;
  span{
    font-weight: 700;
  }
`

const Resultado = ( {resultado} ) => {
  console.log(resultado)

  const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = resultado
  return (
    <Contenedor>
      <Imagen 
        src={`https://www.cryptocompare.com/${IMAGEURL}`} 
        alt="Imagen Cripto" 
      />
      <div>
        <Precio>El precio es de: <span>{PRICE}</span></Precio>
        <Texto>Precio mas alto del dia: <span>{HIGHDAY}</span></Texto>
        <Texto>Precio mas bajo del dia: <span>{LOWDAY}</span></Texto>
        <Texto>Variacion ultimas 24hs: <span>{CHANGEPCT24HOUR}</span></Texto>
        <Texto>Ultima Actualizacion: <span>{LASTUPDATE}</span></Texto>           
      </div>
    </Contenedor>
  )
}

export default Resultado
