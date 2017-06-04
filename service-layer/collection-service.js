/**
 * Created by delwar on 3/12/16.
 */


module.exports.CollectionService = function (db) {

  var ColletionBusiness = require('../business-component/collection-business').CollectionBusiness;
  var colletionBusiness = new ColletionBusiness(db);

  return {
    /**
     *
     * @param callBack
     */
    getCollection: function (callBack) {
      colletionBusiness.getCollections(callBack);
    }
  };

};