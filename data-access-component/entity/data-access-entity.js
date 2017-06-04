/**
 * Created by delwar on 3/11/16.
 */

module.exports.Entity = function () {
  var documentName = undefined;
  var documentProperty = {
    propertyName: undefined,
    propertyType: undefined,
    propertyValue: undefined,
    displayName: undefined
  };
  var document = {

  };
  var documentProperties = [];
  var documentData = [];


  var pageSize = 3; // its default page size
  var pageIndex = 0; // for current Page
  var filters = {};
  var sortField = {};
  var selectedFiled = {};

  return {

    setDocumentName: function (paramDocumentName) {
      documentName = paramDocumentName;
    },

    setDocument: function (paramDocument) {
      document = paramDocument;

      documentProperties = paramDocument.documentProperties;
      documentName = paramDocument.documentName;
      selectedFiled = paramDocument.selectedFiled;
      pageSize = paramDocument.pageSize||pageSize;
      pageIndex = paramDocument.pageIndex||pageIndex;
      filters = paramDocument.filters,
      sortField = paramDocument.sortField,
      documentData = paramDocument.documentData

    },

    setDocumentProperty: function (paramPropertyName, paramPropertyType, paramPropertyValue, paramDisplayName) {
      documentProperty = {
        propertyName: paramPropertyName,
        propertyType: paramPropertyType,
        propertyValue: paramPropertyValue,
        displayName: paramDisplayName
      };
      selectedFiled[paramPropertyName] = 1;
      documentProperties.push(documentProperty);
    },

    setSort: function (paramPropertyName, paramDirection) {
      sortField[paramPropertyName] = paramDirection;
    },

    setPageIndex: function (paramPageIndex) {
      pageIndex = paramPageIndex;
    },

    setPageSize: function (paramPageSize) {
      pageSize = paramPageSize;
    },

    setFilter: function (paramFilter) {
      filters.push(paramFilter);
    },

    getDocumentProperties: function () {
      return documentProperties;
    },

    getDocument: function () {

      document = {
        documentProperties: documentProperties,
        documentName: documentName,
        selectedFiled: selectedFiled,
        pageSize: pageSize,
        pageIndex: pageIndex,
        filters: filters,
        sortField: sortField,
        documentData: documentData
      };
      return document;
    }

  };
};