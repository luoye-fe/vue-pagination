var fs = require('fs');
var path = require('path');

var rollup = require('rollup');
var uglify = require('uglify-js');
var babel = require('rollup-plugin-babel');

var version = process.env.VERSION || require('../package.json').version;

var getSize = function(code) {
	return (code.length / 1024).toFixed(2) + 'kb';
};

var blue = function(str) {
	return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m';
};

var write = function(dest, code) {
	return new Promise(function(resolve, reject) {
		fs.writeFile(dest, code, function(err) {
			if (err) return reject(err);
			console.log(blue(dest) + ' ' + getSize(code));
			resolve();
		});
	});
};

var banner =
	'/*!\n' +
	' * vue-pagination v' + version + '\n' +
	' * (c) ' + new Date().getFullYear() + ' Luo Ye\n' +
	' */';

rollup.rollup({
	entry: path.join(__dirname, '../src/index.js'),
	plugins: [
		babel({
		})
	]
}).then(function(bundle) {
	return write(path.join(__dirname, '../dist/vue-pagination.js'), bundle.generate({
		format: 'umd',
		moduleName: 'vuePagination',
		banner: banner
	}).code);
}).then(function() {
	return rollup.rollup({
		entry: 'src/index.js',
		plugins: [
			babel({
			})
		]
	});
}).then(function(bundle) {
	var code = bundle.generate({
		format: 'umd',
		moduleName: 'vuePagination',
		banner: banner
	}).code;
	var res = uglify.minify(code, {
		fromString: true,
		output: {
			preamble: banner,
			ascii_only: true
		}
	});
	return write(path.join(__dirname, '../dist/vue-pagination.min.js'), res.code);
}).catch(function(err) {
	console.log(err);
});
