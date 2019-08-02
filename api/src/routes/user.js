import express from 'express';
import multer from 'multer';
import verify from '../verifyToken';
import User from '../models/User';

const routes = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './uploads/');
    },
    filename(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter,
});

routes.get('/:id', verify, async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });


    res.send({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
    });
});

routes.put('/:id', upload.single('avatar'), async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const query = { _id: id };

    // update a user
    const updateUser = {
        firstName: data.firstName,
        lastName: data.lastName,
        avatar: req.file.path,
    };

    try {
        const update = await User.update(query, updateUser);
        return res.send(update);
    }
    catch (err) {
        return res.status(400).send(err);
    }
});

export default routes;
