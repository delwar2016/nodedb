/**
 * Created by delwar on 3/12/16.
 */


module.exports.DocumentService = function (db) {

  var DocumentBusiness = require('../business-component/document-business').DocumentBusiness;
  var documentBusiness = new DocumentBusiness(db);

  return {

    /**
     *
     * @param paramDocument
     * @param callBack
     */
    getDocument: function (paramDocument, callBack) {
      documentBusiness.getDocument(paramDocument, callBack);
    }
  };

};