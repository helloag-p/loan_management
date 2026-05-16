import multer from "multer"

const storage = multer.diskStorage({

  destination: (
    req,
    file,
    cb
  ) => {

    cb(null, "uploads/")
  },

  filename: (
    req,
    file,
    cb
  ) => {

    cb(
      null,

      Date.now() +
      "-" +
      file.originalname
    )
  }
})

const fileFilter = (
  req: any,
  file: any,
  cb: any
) => {

  const allowedTypes = [

    "application/pdf",

    "image/png",

    "image/jpeg"
  ]

  if (
    allowedTypes.includes(
      file.mimetype
    )
  ) {

    cb(null, true)

  } else {

    cb(
      new Error(
        "Only PDF/JPG/PNG allowed"
      )
    )
  }
}

const upload = multer({

  storage,

  fileFilter,

  limits: {
    fileSize:
      5 * 1024 * 1024
  }
})

export default upload