/**
 * Created by delwar on 3/12/16.
 */


module.exports.MenuService = function (db) {

  var MenuBusiness = require('../business-component/menu-business').MenuBusiness;
  var menuBusiness = new MenuBusiness(db);

  return {

    /**
     *
     * @param paramDocument
     * @param callBack
     */
    saveMenu: function (paramDocument, callBack) {
      menuBusiness.saveMenu(paramDocument, callBack);
    },

    /**
     *
     * @param paramDocument
     * @param callBack
     */
    getMenu: function (paramDocument, callBack) {
      menuBusiness.getMenu(paramDocument, callBack);
    }
  };

};