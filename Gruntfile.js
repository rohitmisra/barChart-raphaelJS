module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			example: {
				port: 9001,
				base: '.'
			}	
		}
	});
	
	grunt.loadNpmTasks('grunt-connect');
	grunt.registerTask('default','connect:example');
}
