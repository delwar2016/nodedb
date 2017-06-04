/**
 * Created by delwar on 3/12/16.
 */
module.exports.MenuBusiness = function (db) {

  var assert = require('assert');
  var DAO = require('../data-access-component/data-access-object').DAO;
  var dao = new DAO(db);
  var DataAccessEntity = require('../data-access-component/entity/data-access-entity').Entity;
  var dataAccessEntity = new DataAccessEntity();
  dataAccessEntity.setDocumentName('menus');
  var _ = require('underscore');

  return {

    /**
     *
     * @param paramDocument
     * @param callBack
     */
    saveMenu: function (paramDocument, callBack) {
      var propertyName;
      var findProperty;

      propertyName ='_id';
      findProperty = _.find(paramDocument.documentProperties, function (property) {
        return property.propertyName === propertyName;
      });
      if(findProperty){
        dataAccessEntity.setDocumentProperty(findProperty.propertyName, findProperty.propertyType, findProperty.propertyValue);
      }

      propertyName ='name';
      findProperty = _.find(paramDocument.documentProperties, function (property) {
        return property.propertyName === propertyName;
      });
      if(findProperty){
        dataAccessEntity.setDocumentProperty(findProperty.propertyName, findProperty.propertyType, findProperty.propertyValue);
      }

      propertyName ='url';
      findProperty = _.find(paramDocument.documentProperties, function (property) {
        return property.propertyName === propertyName;
      });
      if(findProperty){
        dataAccessEntity.setDocumentProperty(findProperty.propertyName, findProperty.propertyType, findProperty.propertyValue);
      }

      propertyName ='parent';
      findProperty = _.find(paramDocument.documentProperties, function (property) {
        return property.propertyName === propertyName;
      });
      if(findProperty){
        dataAccessEntity.setDocumentProperty(findProperty.propertyName, findProperty.propertyType, findProperty.propertyValue);
      }
      else{
        dataAccessEntity.setDocumentProperty(propertyName, 'string',"0");
      }

      var document = dataAccessEntity.getDocument();

      dao.SaveData(document, function (err, paramData) {
        if(!err){
          document.documentData = paramData;
        }
        callBack(err, document);
      });
    },

    /**
     *
     * @param paramDocument
     * @param callBack
     */
    getMenu: function (callBack){

      var document = dataAccessEntity.getDocument();

      dao.getDataWithOutPagination(document, function (err, paramData) {
        if(!err){
          document.documentData = paramData;
        }
        callBack(err, document);
      });
    }

  };
};
