 //este es un componente que toma un numero y lo formatea y muestra la pricetag, 
 //usa la funcion que formatea regionalmente en forma de dolar el numero y toma
 //las classes que se le pasen

 import { formatPrice } from "@/lib/format";

interface PriceTagProps {
  price: number;
  className?: string;
}

export default function PriceTag({ price, className }: PriceTagProps) {
  return <span className={`badge ${className}`}>{formatPrice(price)}</span>;
}
