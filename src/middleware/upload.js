import multer from "fastify-multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);

    cb(null, file.fieldname + "-" + Date.now() + extension);
  },
});

export const upload = multer({ storage });
