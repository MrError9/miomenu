const multer = require('multer');
//filtering the file so it takes just images
const fileFilter = (req, file, cb) => {
	if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
		cb(null, true);
	} else {
		cb('file type must be ( .jpeg , .png , .jpg)', false);
	}
};
//initializing upload
const upload = multer({
	dest: './uploads/temp',
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}${file.originalname}`);
	},
	limits: {
		fileSize: 1600 * 1600
	},
	fileFilter
});

module.exports = (app) => {
	const passport = require('passport');
	const file = require('../controllers/file.controller');
	var router = require('express').Router();

	//All users
	router.get('/all-images', passport.authenticate('jwt', { session: false }), file.getAllImages);

	router.get('/images/:file', file.getImageFile);
	//router.get('/public/:dest/:file', file.getPublicFile);
	//Only logged in users or users with special privilages
	//router.get('/private/:dest/:file', passport.authenticate('jwt', { session: false }), file.getPrivateFile);
	// Upload one image
	router.post(
		'/upload/:dest',
		passport.authenticate('jwt', { session: false }),
		upload.single('recfile'),
		file.uploadFile
	);

	router.post(
		'/upload-multiple',
		// passport.authenticate('jwt', { session: false }),
		upload.array('recfile', 10),
		file.uploadMultiFiles
	);

	router.delete('/delete/:file', passport.authenticate('jwt', { session: false }), file.deleteImage);

	app.use('/api/files', router);
};