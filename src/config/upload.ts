import {extname, resolve } from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp', 'uploads')

export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
      if (err) return cb(null, err.message);

      return cb(null, res.toString('hex') + extname(file.originalname));
      });
    }
  })
};
