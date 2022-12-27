const multer = require('multer');
const path = require('path');
const fs =require('fs')
const crypto = require('crypto');

const counters = {
  'before_pic': 0,
  'after_pic': 0,
  'video': 0,
  'technical_file': 0,
  'additional_pics': 0
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.session.userLogged.user_id;
    if(!req.dirName){
      const dirName = crypto.randomBytes(8).toString('hex')
      req.dirName = dirName;
    }
    const dir = path.join(__dirname, `../private/enterpriseDocumentation/${userId}/${req.dirName}`);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const field = file.fieldname;
    counters[field] += 1;
    cb(null, file.fieldname + '-' + counters[field] + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})
const upload = multer({ storage });

module.exports = upload;

