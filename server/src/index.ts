import express from "express"
import cors from "cors"
import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
  })

const upload = multer({storage: storage})

const app = express()
app.use(cors())

app.get("/healthy-server", (req, res) => {
    console.log("server is working")
    res.json({
        message: "HEALTHY SERVER"
    })
})

app.post("/upload/pdf", upload.single("pdf"), (req, res) => {
    res.json({
        status: "file uploaded"
    })
})

app.listen(8080, () => {
    console.log("server listening")
})