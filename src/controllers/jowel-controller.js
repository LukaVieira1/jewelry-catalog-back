import { prisma } from "../helpers/utils.js";
import cloudinary from "../helpers/cloudinary.js";
import fs from "fs";

export const create = async (req, reply) => {
  const { name, description, acessory, quality, price } = req.body;
  const file = req.file;
  try {
    const jowel = await prisma.jewel.create({
      data: {
        name,
        description,
        acessory,
        quality,
        price: Number(price),
        user_id: req.user.id,
        img: file.path,
      },
    });
    await cloudinary.cloudinary.uploader.upload(
      file.path,
      {
        public_id: file.path,
      },
      function (error, result) {
        console.log(result);
      }
    );
    fs.unlink(file.path, (error) => console.log(error));
    return reply.status(201).send(jowel);
  } catch (error) {
    console.log(error);
    reply.status(500).send({ error: "Deu problema mermão" });
  }
};

export const del = async (req, reply) => {
  const { id } = req.params;
  const { img } = req.query;
  try {
    const jowel = await prisma.jewel.delete({
      where: {
        id: Number(id),
      },
    });
    await cloudinary.cloudinary.api.delete_resources(
      img,
      function (error, result) {
        console.log(result);
      }
    );
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
    const jowels = await prisma.jewel.findMany({
      include: {
        user: {
          select: {
            name: true,
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
    console.log(error);
    reply.status(500).send({ error: "Deu problema mermão" });
  }
};
