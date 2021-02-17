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
	dest: '/uploads/menu',
	fileFilter
});

module.exports = (app) => {
	const menu = require('../controllers/menu.controller');

	var router = require('express').Router();

	// Retrieve all Clients
	router.get('/', menu.findAll);

	// Retrieve all Clients
	router.post('/upload', upload.single('menuImage'), menu.upload);

	app.use('/api/menu', router);
};
