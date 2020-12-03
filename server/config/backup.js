const fs = require('fs');
const mysqldump = require('mysqldump');
const Importer = require('mysql-import');

const host = 'localhost';
const user = 'root';
const password = '12345678';
const database = 'nutrition_store';

exports.backupDB = (req, res) => {
	const currDate = new Date();
	const DMY = currDate.getDate() + '-' + (currDate.getMonth() + 1).toFixed() + '-' + currDate.getFullYear();
	const dir = 'D:\\MySQL\\Backup\\' + DMY;
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
	mysqldump({
		connection: {
			host,
			user,
			password,
			database
		},
		dumpToFile: dir + '\\dump.sql.gz',
		compressFile: true
	});
	res.send('completed');
}

exports.restoreDB = (req, res) => {
	const importer = new Importer({ host, user, password, database });
	importer
		.import(req.body.path)
		.then(() => {
			var files_imported = importer.getImported();
			console.log(`${files_imported.length} SQL file(s) imported.`);
			res.send('completed');
		})
		.catch((err) => {
			console.error('THIS IS THE RESTORE ERROR', err);
			res.status(500).send('completed');
		});
}
