/**
 * Created by delwar on 3/10/16.
 */
/*
 Copyright (c) 2008 - 2016 MongoDB, Inc. <http://mongodb.com>

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */


var express = require('express'),
  bodyParser = require('body-parser'),
  nunjucks = require('nunjucks');

var MongoClient = require('mongodb').MongoClient,
  assert = require('assert');

var DataAccessEntity = require('./data-access-component/entity/data-access-entity').Entity;
var dataAccessEntity ;

var CollectionService = require('./service-layer/collection-service').CollectionService;
var collectionService;

var DocumentService = require('./service-layer/document-service').DocumentService;
var documentService;

var MenuService = require('./service-layer/menu-service').MenuService;
var menuService;

var server;
var db;
// Set up express
app = express();
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use('/static', express.static(__dirname + '/public/static'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));


/*
 Configure nunjucks to work with express
 Not using consolidate because I'm waiting on better support for template inheritance with
 nunjucks via consolidate. See: https://github.com/tj/consolidate.js/pull/224
 */
var env = nunjucks.configure('views', {
  autoescape: true,
  express: app
});

var nunjucksDate = require('nunjucks-date');
nunjucksDate.setDefaultFormat('MMMM Do YYYY, h:mm:ss a');
env.addFilter("date", nunjucksDate);

MongoClient.connect('mongodb://localhost:27017/testreach', function (err, database) {
  "use strict";
  assert.equal(null, err);
  db = database;

  collectionService = new CollectionService(db);
  documentService = new DocumentService(db);
  menuService = new MenuService(db);

  var router = express.Router();

  router.get("/", function (req, res) {
    console.log('ok');
    res.redirect('/views/index.html');
  });
  router.get("/collection/", function (req, res) {
    "use strict";
    collectionService.getCollection(function (err, col) {
      assert.equal(null, err);
      res.send(col);
    });

  });

  router.get("/document/:document", function (req, res) {
    "use strict";

    if(!req.params.document){
      res.send("Please pass document name in param");
      return;
    }
    dataAccessEntity = new DataAccessEntity();

    dataAccessEntity.setDocumentName(req.params.document);
    dataAccessEntity.setDocumentProperty("username");
    dataAccessEntity.setDocumentProperty("firstname");


    var document = dataAccessEntity.getDocument();

    documentService.getDocument( document,function (err, col) {
      assert.equal(null, err);
      res.send(col.documentData);
    });

  });

  router.post("/document/:id", function (req, res) {
    "use strict";

    var params = req.body;

    if(!params.document){
      res.send("document is not send");
      return;
    }

    dataAccessEntity = new DataAccessEntity();

    dataAccessEntity.setDocumentName(req.params.document);
    dataAccessEntity.setDocumentProperty("username");
    dataAccessEntity.setDocumentProperty("firstname");


    var document = dataAccessEntity.getDocument();

    documentService.getDocument( document,function (err, col) {
      assert.equal(null, err);
      res.send(col.documentData);
    });

  });

  router.get("/get_menus", function (req, res) {
    "use strict";

    menuService.getMenu(function (err, col) {
      assert.equal(null, err);
      res.send(col.documentData);
    });

  });

  router.post("/menu_save", function (req, res) {
    "use strict";

    var params = req.body;

    params.name= "parent 2.1";
    params.url= "url 2.1";
    params.parent = "57004e81f92889c6572e451b";

    dataAccessEntity = new DataAccessEntity();

    dataAccessEntity.setDocumentProperty('name','string', params.name);
    dataAccessEntity.setDocumentProperty('url', 'string', params.url);

    if(params.parent){
      dataAccessEntity.setDocumentProperty('parent', 'string', params.parent);
    }

    if(params._id){
      dataAccessEntity.setDocumentProperty('_id', 'string', params._id);
    }

    var document = dataAccessEntity.getDocument();

    menuService.saveMenu(document, function (err, col) {
      assert.equal(null, err);
      res.send(col.documentData);
    });

  });


  app.use('/', router);
  server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Server listening on port %s.', port);
  });


});