/**
 * Created by delwar on 3/12/16.
 */
module.exports.DocumentBusiness = function (db) {

  var assert = require('assert');
  var DAO = require('../data-access-component/data-access-object').DAO;
  var dao = new DAO(db);
  var DataAccessEntity = require('../data-access-component/entity/data-access-entity').Entity;
  var dataAccessEntity = new DataAccessEntity();

  return {

    /**
     *
     * @param paramDocument
     * @param callBack
     */
    getDocument: function (paramDocument, callBack) {

      dataAccessEntity.setDocument(paramDocument);
      var document = dataAccessEntity.getDocument();

      dao.getData(document, function (err, paramData) {
        if(!err){
          document.documentData = paramData;
        }
        callBack(err, document);
      });
    }

  };
};
