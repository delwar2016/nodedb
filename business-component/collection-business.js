/**
 * Created by delwar on 3/12/16.
 */

module.exports.CollectionBusiness = function (db) {

  var assert = require('assert');
  var DAO = require('../data-access-component/data-access-object').DAO;
  var dao = new DAO(db);

  return {

    /**
     *
     * @param callBack
     */
    getCollections: function (callBack) {
      dao.getCollectionList(function (err, collections) {
        callBack(err, collections);
      });
    }

  };
};
