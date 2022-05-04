import { validateRequest } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import * as JowelController from "../controllers/jowel-controller.js";

export default {
  getAll: {
    method: "GET",
    url: "/jowels",
    handler: JowelController.getAll,
  },
  Create: {
    method: "POST",
    url: "/jowels",
    preHandler: [upload.single("image")],
    handler: JowelController.create,
  },
  Delete: {
    method: "DELETE",
    url: "/jowels/:id",
    preHandler: [validateRequest],
    handler: JowelController.del,
  },
};
