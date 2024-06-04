const { extname } = require('path');
const { diskStorage } = require('multer');
const { existsSync, mkdirSync } = require('fs');
const { randomUUID } = require('crypto');
const { Env } = require('.');
const { HttpException } = require('../exceptions/HttpException');

const multerOptions = {
  // Enable file size limits
  limits: {
    fileSize: Env.UPLOAD_MAX_FILE_SIZE,
  },
  // Check the mimetype to allow for upload
  fileFilter: (req, file, cb) => {
    const fileTypeOkay = file.mimetype.match(/\/(jpg|jpeg|png|gif)$/);
    const contentLength = parseInt(req.headers['content-length']);
    const fileSizeOkay = contentLength <= parseInt(Env.UPLOAD_MAX_FILE_SIZE) || 2097152;
    if (fileTypeOkay && fileSizeOkay) {
      // Allow storage of file
      cb(null, true);
    } else {
      let errorMess = '';
      if (!fileTypeOkay) {
        errorMess = `Unsupported file type ${extname(file.originalname)}`;
      }
      if (!fileSizeOkay) {
        errorMess = errorMess + ', File size is exceed limit size: 2.3MB';
      }
      // Reject file
      cb(new HttpException(400, errorMess), false);
    }
  },
  // Storage properties
  storage: diskStorage({
    // Destination storage path details
    destination: (req, file, cb) => {
      const uploadPath = process.env.UPLOAD_LOCATION;
      // Create folder if doesn't exist
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    // File modification details
    filename: (req, file, cb) => {
      // Calling the callback passing the random name generated with the original extension name
      cb(null, `${randomUUID()}${extname(file.originalname)}`);
    },
  }),
};

module.exports = { multerOptions };
