const multer = require('multer')
const path = require('path')

// const imageConfig = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, './upload')
//     },
//     filename: (req, file, callback) => {
//         callback(null, `image-${Date.now()}.${file.originalname}`)
//     }
// })

// const isImage = (req, file, callback) => {
//     if (file.mimetype.startsWith("image")) {
//         callback(null, true)
//     } else {
//         callback(null, Error("only image allowed"))
//     }
// }

// const upload = multer({
//     storage: imageConfig,
//     fileFilter: isImage
// })

// module.exports = upload

// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname);
      cb(null, uniqueSuffix + extension);
    },
  });
  
  // Set up multer upload instance with the storage configuration
  const upload = multer({ storage });
  module.exports = upload
  // API endpoint for image and video upload
