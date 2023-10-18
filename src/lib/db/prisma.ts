//esto define el cliente de prisma que se usa para las interacciones con la DB
//la configuracion aca presente esta especificado en la documentacion de prisma sirve para no
//crear un nuevo cliente de prisma cada vez que guarda la aplicacion, en vez de eso para crear
//el cliente usamos el comando:
//npx prisma generate
//y solo cuando hagamos algun cambio a los schemas o algo asi

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prismaBase = globalForPrisma.prisma ?? new PrismaClient();

export const prisma = prismaBase.$extends({
  query: {
    cart: {
      async update({ args, query }) {
        args.data = { ...args.data, updatedAt: new Date() };
        return query(args);
      },
    },
  },
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaBase;
