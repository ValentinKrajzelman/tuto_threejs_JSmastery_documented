"use client";

import { ComponentProps } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

//normalmente se usan interfaces para este tipo de casos pero usamos type
//por que en este caso es necesario para usar componentProps que devuelve un objeto con 
//las props del elemento que se especifique y aca las estamos agregando a nuestro type
//es decir que estariamos "extendiendo" buttons
type FormSubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;


export default function FormSubmitButton({
  children,
  className,
  ...props
}: FormSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      className={`btn-primary btn ${className}`}
      type="submit"
      disabled={pending}
    >
      {/* pending pregunta si el request de la form donde esta el elemento 
      esta pending y devuelve un booleano el operador && entonces renderiza el span */}
      {pending && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
}
