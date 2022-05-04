import { prisma } from "../helpers/utils.js";

export const create = async (req, reply) => {
  try {
    const { name, description, acessory, quality } = req.body;
    const file = req.file;
    const jowel = await prisma.jowel.create({
      data: {
        name,
        description,
        acessory,
        quality,
        user_id: req.user.id,
        img: file.path,
      },
    });
    return reply.status(201).send(jowel);
  } catch (error) {
    reply.status(500).send({ error: "Deu problema mermão" });
  }
};

export const del = async (req, reply) => {
  const { id } = req.params;
  try {
    const jowel = await prisma.jowel.delete({
      where: {
        id: Number(id),
      },
    });
    reply.status(200).send("jowel deletado com sucesso");
  } catch (error) {
    if (error.code === "P2025") {
      reply.status(500).send({ error: "jowel não existe" });
    } else {
      reply.status(500).send({ error: "Deu problema mermão" });
    }
  }
};

export const getAll = async (req, reply) => {
  try {
    const jowels = await prisma.jowel.findMany({
      include: {
        user: {
          select: {
            name: true,
            username: true,
            email: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return reply.send({
      jowels,
    });
  } catch (error) {
    reply.status(500).send({ error: "Deu problema mermão" });
  }
};
