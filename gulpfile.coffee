gulp          = require 'gulp'
coffee        = require 'gulp-coffee'
uglify        = require 'gulp-uglifyjs'




gulp.task 'compile-coffee', ->
  # bare false for AMD modules
  task = gulp.src "./src/backbone.statemanager.coffee"
    .pipe coffee bare: false  # wrap js modules
    .pipe gulp.dest "./"
    .pipe uglify "./backbone.statemanager.min.js", outSourceMap:true
    .pipe gulp.dest "./"

  task

    
# Define the default task as a sequence of the above tasks
gulp.task "default", ['compile-coffee'], ->
