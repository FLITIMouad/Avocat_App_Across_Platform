import multer from "multer"
import path from "path";
import { fileURLToPath } from 'url';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const arrName=file.originalname.split(".");
      const ext=arrName[arrName.length-1]
      const acceptExt=["jpg", "png", "dot", "pdf","doc","docx","docm"]
      if(!acceptExt.includes(ext)){throw new Error("Error file")}
      console.log(`${file.fieldname} - ${uniqueSuffix}.${ext}`)
      cb(null, `${file.fieldname} - ${uniqueSuffix}.${ext}`)
    }
  })
  const upload = multer({storage:storage})