//aca lo que esta haciendo es tomar un numero plano y formateandolo por 
//para que se muestre como dolares 

//tolocalestring es una herramienta util para hacer mas reactivo y culturalmente apropiado
//los textos de la pagina, como primer argumento se especifica la region (BCP 47 language tag)
//sino se especifica se toma el default del browser, muy util para adaptar el texto al usuario

export function formatPrice(price: number) {
  return (price / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
