/**
 * Created by delwar on 3/14/16.
 */
//The build will inline common dependencies into this file.

//For any third party dependencies, like jQuery, place them in the lib folder.

//Configure loading modules from the lib directory,
//except for 'app' ones, which are in a sibling
//directory.
requirejs.config({
  baseUrl: '../static/js/lib',
  paths: {
    'jquery': 'bower_components/jquery/dist/jquery.min',
    'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap.min',
    'metisMenu': 'bower_components/metisMenu/dist/metisMenu.min',
    'raphael': 'bower_components/raphael/raphael-min',
    'morrisjs': 'bower_components/morrisjs/morris.min',
    'morris': 'morris-data',
    'sbAdmin': 'sb-admin-2'
  },
  shim: {
    'bootstrap': ['jquery'],
    'metisMenu': ['jquery', 'bootstrap'],
    'morrisjs': ['raphael'],
    'morris': ['morrisjs'],
    'sbAdmin': ['metisMenu', 'morrisjs']
  }
});