console.error('ngrok - downloading newest binary...');

var os = require('os');
var fs = require('fs');
var util = require('util');
var https = require('https');

var source = 'https://dl.ngrok.com/ngrok_2.0.19_';
var files = {
	darwinia32:	source + 'darwin_386.zip',
	darwinx64:	source + 'darwin_amd64.zip',
	linuxarm:	source + 'linux_arm.zip',
	linuxia32:	source + 'linux_386.zip',
	linuxx64:	source + 'linux_amd64.zip',
	win32ia32:	source + 'windows_386.zip',
	win32x64:	source + 'windows_amd64.zip',
	freebsdia32:	source + 'freebsd_386.zip',
	freebsdx64:	source + 'freebsd_amd64.zip'
};

var path = __dirname + '/bin/';
if (!fs.existsSync(path)) {
	fs.mkdirSync(path);
}

var which = os.platform() + os.arch();
https.get(files[which], function(resp) {
	var zip = fs.createWriteStream(path + 'ngrok.zip');
	resp.pipe(zip)
		.on('finish', function() {
			console.log('ngrok - binary downloaded (' + files[which] + ')...');
		})
		.on('error', function(e) {
			console.error('ngrok - error downloading binary', e);
			process.exit(1);
		});
});
