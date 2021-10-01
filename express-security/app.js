//คำสั่ง สร้าง table
// const { sequelize } = require('./models');
// sequelize.sync({
//   force: true,
// });

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/authRoute');
const listRoute = require('./routes/listRoute');
const errorController = require('./controllers/errorController');
const passport = require('passport');
require('./config/passport');
const multer = require('multer');
const { List } = require('./models');
const cloundinary = require('cloudinary').v2;
const fs = require('fs');
const util = require('util'); //แปลง callback เป็น promise
const { User } = require('./models');

const uploadPromise = util.promisify(cloundinary.uploader.upload);

const app = express();

app.use(passport.initialize());

// app.get(
//   '/test-passport',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     res.json(req.user);
//   }
// );

//midldleware cors:allow access origin cross sharing
app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));

//--------------------------------------------------------------------------------------------------------------------------------
//config multer (multi-part/form-data middleware)
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       console.log(file); //{fieldname: 'thisisuploadinput', originalname: 'vscode.png', encoding: '7bit', mimetype: 'image/jpeg'}
//       cb(null, 'public/images'); //ตัวแรกคือ error obj ตัวที่สองคือตำแหน่งที่จะเก็บไฟล์
//     },
//     filename: (req, file, cb) => {
//       cb(null, new Date().getTime() + '' + '.' + file.mimetype.split('/')[1]); //ตัวแรกคือ error obj ตัวที่สองคือชื่อไฟล์ที่จะเก็บ
//     },
//   }),
// });

//upload on cloudinary
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(file);
      cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
      cb(null, new Date().getTime() + '' + '.' + file.mimetype.split('/')[1]);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

app.post(
  '/upload-to-cloud',
  upload.single('cloudinput'),
  async (req, res, next) => {
    console.log(req.file);
    const { username, password, email, confirmPassword } = req.body;
    // cloundinary.uploader.upload(req.file.path, async (err, result) => {
    //   if (err) {
    //     res.json({message: err.message});
    //   } else {
    //     console.log(result);
    //     fs.unlinkSync(req.file.path); //ลบไฟล์ที่อัพโหลดเข้ามาในระบบ
    //     await List.update({imageUrl: result.secure_url,},{where: {id: 3},});}
    // });
    //upload to cloudinary ในรูปแบบ promise
    // try {
    //   const result = await uploadPromise(req.file.path);
    //   await List.update({ imageUrl: result.secure_url }, { where: { id: 4 } });
    //   fs.unlinkSync(req.file.path);
    //   res.json({
    //     message: 'upload success',
    //   });
    // } catch (error) {}

    try {
      const result = await uploadPromise(req.file.path);
      const user = await User.create({
        username,
        password: result.secure_url, //ส่ง link image ไปเก็บใน column password
        email,
      });
      fs.unlinkSync(req.file.path);
      res.json({ user });
    } catch (error) {
      next(error);
    }
  }
);
////--------------------------------------------------------------------------------------------------------------------------------
//upload on disk
// app.post(
//   '/upload',
//   upload.single('thisisuploadinput'),
//   async (req, res, next) => {
//     try {
//       //อัพโหลดไฟล์แค่ 1 อัน
//       console.log(req.file);
//       await List.update(
//         {
//           imageUrl: req.file.path,
//         },
//         {
//           where: {
//             id: 2,
//           },
//         }
//       );
//       res.json({
//         message: 'Upload success',
//       });
//     } catch (error) {
//       next(error);
//     }
//   }
// );
//--------------------------------------------------------------------------------------------------------------------------------

//List Route
app.use('/lists', listRoute);
//Authendication Route
app.use('/', authRoute);

//path not found handling middleware
app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    message: 'Page not found',
  });
});

//error handling middleware
app.use(errorController);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
