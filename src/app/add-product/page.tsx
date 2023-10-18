import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: "Add Product - Flowmazon",
};

  // esta funcion recibe la formdata de la form de abajo, formdata es un tipo nativo
async function addProduct(formData: FormData) {
  //para usar server actions podemos hacer la funcion aca mismo sin hacer un endpoint en una file separada, 
  //es menos codigo y mas intuitivo, pero como estamos en un client side component, tenemos que definir la
  //funcion como server side:
  "use server";

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  //el ? indica que la propiedad solo se aplica si formData.get() no es falsey
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  //valor default de la funcion es 0 "||" (OR logico) indica que se tome el valor
  //de la izquierda cuando el valor derecho es falsey, una alternativa seria el  
  // Nullish coalescing operator (??) que toma el valor de la izquierda cuando el derecho es 
  //null o undefined
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect("/");
}

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
        // required hace que next automaticamente tire un error si 
        //no se relleno el campo
          required
          name="name"
          placeholder="Name"
          className="input-bordered input mb-3 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea-bordered textarea mb-3 w-full"
        />
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input-bordered input mb-3 w-full"
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input-bordered input mb-3 w-full"
        />
        {/* esto de abajo es un componente que deshabilita el boton y muestra que hay un request 
        en proceso */}
        <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
      </form>
    </div>
  );
}
