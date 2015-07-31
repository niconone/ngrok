var fs = require('fs');
var os = require('os');
var DecompressZip = require('decompress-zip');

var path = __dirname + '/bin/';

function unzipFile(file) {
	new DecompressZip(file)
		.extract({path: path})
		.once('error', function(e) {
			console.error('ngrok - error unpacking binary', e);
			process.exit(1);
		})
		.once('extract', function(log) {
			var suffix = os.platform() === 'win32' ? '.exe' : '';
			if (suffix === '.exe') {
				fs.writeFileSync(path + 'ngrok.cmd', 'ngrok.exe');
			}
			fs.unlinkSync(path + 'ngrok.zip');
			var target = path + 'ngrok' + suffix;
			fs.chmodSync(target, 0755);
			if (fs.existsSync(target) && fs.statSync(target).size > 0) {
				console.log('ngrok - binary unpacked.');
				process.exit(0);
			}
			console.error('ngrok - error unpacking binary.');
			process.exit(1);
		});
}

unzipFile(path + 'ngrok.zip');
