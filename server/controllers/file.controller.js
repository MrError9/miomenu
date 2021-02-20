const db = require('../models');
const UploadedImages = db.uploadedImages;
const crypto = require('crypto');
var path = require('path');
var fs = require('fs');
var url = '192.168.11.58:5000'

const allDest = ['products', 'blogs', 'partners'];
const privateDest = ['products'];

// GET private file
// api/files/private/:dest/:file
//not using it right now 
exports.getPrivateFile = async (req, res) => {
	const { file, dest } = req.params;

	res.sendFile(path.resolve(`./uploads/${dest}/${file}`), (err) => {
		console.log('err', err);
		if (err)
			return res.status(404).json({
				result: 'Fail',
				message: {
					en: 'File not found'
				}
			});
	});
};

// GET private file
// api/files/private/:dest/:file
exports.getAllImages = async (req, res) => {
	//TODO: PRIVILAHE NOT SPECIFIED
	try {
		const images = await UploadedImages.findAll()
		res.json({
			result: "Success",
			message: images
		})
	} catch (error) {
		console.log('error :>> ', error);
		res.json({
			result: "Fail",
			message: {
				en: 'Wrong destination specified'
			}
		})
	}

};


// GET public file
// api/files/public/:dest/:file
exports.getImageFile = async (req, res) => {
	const { file } = req.params;

	res.sendFile(path.resolve(`./uploads/images/${file}`), (err) => {
		console.log('err', err);
		if (err)
			return res.status(404).json({
				result: 'Fail',
				message: {
					en: 'File not found'
				}
			});
	});
};

// GET public file
// api/files/public/:dest/:file
//not using it right now 
exports.getPublicFile = async (req, res) => {
	const { file, dest } = req.params;
	if (privateDest.includes(dest))
		return res.status(401).json({
			result: 'Fail',
			message: {
				en: 'Unauthorized'
			}
		});

	res.sendFile(path.resolve(`./uploads/${dest}/${file}`), (err) => {
		console.log('err', err);
		if (err)
			return res.status(404).json({
				result: 'Fail',
				message: {
					en: 'File not found'
				}
			});
	});
};

// GET ALL UploadedImages
// api/files/fetch/:destj
//not using it right now 
exports.getMultiFiles = async (req, res) => {
	const { blogId } = req.params;
	try {
		const data = await UploadedImages.findByPk(blogId);
		if (!data) {
			res.status(500).json({
				result: 'Fail',
				message: {
					en: error || 'there is no data'
				}
			});
		}
		return res.json({
			result: 'Success',
			message: data
		});
	} catch (error) {
		res.status(500).json({
			result: 'Fail',
			message: {
				en: error || 'Some error occurred while getting the UploadedImages'
			}
		});
	}
};

// @route   POST api/files/upload
// @desc    upload image
// @access  Private - UploadedImages
//not using it right now 
exports.uploadFile = async (req, res) => {
	const { dest } = req.params;
	if (!dest || !allDest.includes(dest))
		return res.status(400).json({
			result: 'Fail',
			message: {
				en: 'Wrong destination specified'
			}
		});
	let destState = privateDest.includes(dest) ? 'private' : 'public';

	//TODO: add security and priviliges

	try {
		/** When using the "single"
	  data come in "req.file" regardless of the attribute "name". **/
		var tmp_path = req.file.path;

		/** The original name of the uploaded file
			stored in the variable "originalname". **/
		//rename the file in here
		var format = req.file.mimetype.replace('image/', '.');
		var newFileName = `${Date.now()}_${crypto.randomBytes(8).toString('hex')}${format}`;
		var target_path = `uploads/${dest}/` + newFileName;

		// Create a UploadedImages
		const newImage = {
			image_name: newFileName,
			image_dest: dest,
			image_url: `${url}/api/files/${destState}/${dest}/${newFileName}`
		};
		// Save UploadedImage in the database
		await UploadedImages.create(newImage);

		/** copy the uploaded file. **/
		var src = fs.createReadStream(tmp_path);
		var destPath = fs.createWriteStream(target_path);
		fs.unlinkSync(tmp_path);
		src.pipe(destPath);
		src.on('end', () => {
			res.status(200).json({
				result: 'Success',
				message: newImage
			});
		});
		src.on('error', (err) => {
			console.log('err', err);
			return res.status(500).json({
				result: 'Fail',
				message: {
					en: 'File could not be uploaded'
				}
			});
		});
	} catch (error) {
		console.log('error', error);
		return res.status(500).json({
			result: 'Fail',
			message: {
				en: 'File could not be uploaded'
			}
		});
	}
};

// @route   POST api/files/upload
// @desc    upload image
// @access  Private - UploadedImages
exports.uploadMultiFiles = async (req, res) => {
	try {
		// req.files is array of `photos` files
		let allImages = []
		for (let index = 0; index < req.files.length; index++) {
			var tmp_path = req.files[index].path;
			var format = req.files[index].mimetype.replace('image/', '.');
			var newFileName = `${Date.now()}_${crypto.randomBytes(8).toString('hex')}${format}`;
			var target_path = `uploads/images/` + newFileName;

			// Create a UploadedImages
			const newImage = {
				image_name: newFileName,
				image_dest: 'images',
				image_url: `${url}/api/files/images/${newFileName}`
			};
			allImages.push(newImage)
			// Save UploadedImage in the database
			await UploadedImages.create(newImage);

			/** copy the uploaded file. **/
			console.log('tmp_path :>> ', tmp_path);
			var src = fs.createReadStream(tmp_path);
			var destPath = fs.createWriteStream(target_path);
			fs.unlinkSync(tmp_path);
			src.pipe(destPath);
			src.on('error', (err) => {
				console.log('err', err);
				return res.status(500).json({
					result: 'Fail',
					message: {
						en: 'File could not be uploaded'
					}
				});
			});
		}
		res.status(200).json({
			result: 'Success',
			message: allImages
		});
	} catch (error) {
		console.log('error', error);
		return res.status(500).json({
			result: 'Fail',
			message: {
				en: 'File could not be uploaded'
			}
		});
	}
};

// @route   DELETE api/files/delete/:file
// @desc    delete file from the storage and the database as well
// @access  Private - UploadedImages
exports.deleteImage = async (req, res) => {
	const { file } = req.params;
	try {
	
		const file_path = `uploads\\images\\${file}`
		// delete it from the db
		await UploadedImages.destroy({
			where:{
				image_name:file
			}
		});

		/** delete file in the storage. **/
		fs.unlinkSync(file_path);
		return res.status(200).json({
			result: 'Success',
			message: "image deleted"
		});
		
	} catch (error) {
		console.log('error', error);
		return res.status(500).json({
			result: 'Fail',
			message: {
        en: 'File could not be deleted'
			}
		});
	}
};