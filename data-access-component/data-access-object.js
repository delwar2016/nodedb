/**
 * Created by delwar on 3/11/16.
 */

var MongoClient = require('mongodb').MongoClient;



module.exports.DAO = function (database) {

  var db = database;
  var DataAccessEntity = require('./entity/data-access-entity').Entity;
  var dataAccessEntity;
  var _ = require('underscore');

  return {

    /**
     *
     * @param callBack
     */
    getCollectionList: function (callBack) {
      db.listCollections().toArray(function (err, collections) {
        callBack(err, collections);
      });
    },

    /**
     *
     * @param paramDocument
     * @param callBack
     */
    getData: function (paramDocument, callBack) {
      dataAccessEntity = new DataAccessEntity();
      dataAccessEntity.setDocument(paramDocument);
      var document = dataAccessEntity.getDocument();
      db.collection(document.documentName)
        .find(document.filters, document.selectedFiled)
          .sort(document.sortField)
            .skip(document.pageIndex * document.pageSize)
        .limit(document.pageSize).toArray(function (err, datas) {
          callBack(err, datas);
        });
    },

    /**
     *
     * @param paramDocument
     * @param callBack
     */
    getDataWithOutPagination: function (paramDocument, callBack) {
      dataAccessEntity = new DataAccessEntity();
      dataAccessEntity.setDocument(paramDocument);
      var document = dataAccessEntity.getDocument();

      db.collection(document.documentName)
        .find(document.filters, document.selectedFiled)
        .toArray(function (err, datas) {
          callBack(err, datas);
        });
    },

    /**
     *
     * @param paramDocument
     * @param callBack
     * @constructor
     */
    SaveData: function (paramDocument, callBack){
      dataAccessEntity = new DataAccessEntity();
      dataAccessEntity.setDocument(paramDocument);
      var document = dataAccessEntity.getDocument();

      var upDatedProperty = {};
      _.each(document.documentProperties, function (property) {
        if(property.propertyName !== '_id'){
          upDatedProperty[property.propertyName] = property.propertyValue;
        }
      });

      var hasProperty = _.find(document.documentProperties, function (property) {
        return property.propertyName === "_id";
      });

      if(hasProperty){
        // update document will goes here
        db.collection(document.documentName)
          .updateOne(
          {"_id": hasProperty.propertyName},
          {
            "$set": upDatedProperty
          }, function (err, response) {
            callBack(err, response);
          }
        );
      }
      else{
        // new document will goes here
        db.collection(document.documentName)
          .insertOne(upDatedProperty, function (err, response) {
            callBack(err, response);
          });
      }
    }
  };
};