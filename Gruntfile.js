var grunt = require('grunt');

//配置
grunt.config.init({
  pkg: grunt.file.readJSON('gruntPackage.json'),
  'create-windows-installer': {
    x64: {
      version: '1.0.0',
      authors: 'Alidaibi',
      projectUrl: '',
      appDirectory: './outApp/doubanMovie-win32-x64',
      output: './OutPut',
      exe: 'doubanMovie.exe',
      description: 'doubanMovie',
      setupIcon: './favicon.ico',
      noMsi: true
    }
  }
});

grunt.loadNpmTasks('grunt-electron-installer');

grunt.registerTask('default', ['create-windows-installer']);