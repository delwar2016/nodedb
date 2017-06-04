///../lib/bower_components/underscore/underscore-min.js
var menuHtml = '';
$(function() {
   menus = [{"name":"parent 1","url":"url 1","parent":"0","_id":"57004e6f37b6dabb5794cb76"},{"name":"parent 2","url":"url 2","parent":"0","_id":"57004e81f92889c6572e451b"},{"name":"parent 2.1","url":"url 2.1","parent":"57004e81f92889c6572e451b","_id":"57004eda32e650ef57b39206"}];
  buildMenu(menus, '0');

  menuHtml = '<ul class="nav" id="side-menu">' + menuHtml + ' </ul>';

  $('#menu-container').empty();
  $('#menu-container').html(menuHtml);
  $('#side-menu').metisMenu();



});


function buildMenu (paramMenus, root){
  var rootMenus = _.filter(paramMenus, function(menu){
    return menu.parent === root;
  });

  _.each(rootMenus, function (rootMenu) {
    menuHtml = menuHtml + '<li>';

    var childMenu = _.find(paramMenus, function (menu) {
      return menu.parent === rootMenu._id;
    });
    if(childMenu){
      menuHtml = menuHtml + '<a href="#"><i class="fa fa-wrench fa-fw"></i> '+ rootMenu.name +'<span class="fa arrow"></span></a>';
    }
    else{
      menuHtml = menuHtml + '<a href="#"><i class="fa fa-wrench fa-fw"></i> '+ rootMenu.name +'</a>';
    }

    buildChild(paramMenus , rootMenu._id);
    menuHtml = menuHtml + '</li>';
  });
}

function buildChild(paramMenus, parrent){

  var childMenu = _.find(paramMenus, function (menu) {
    return menu.parent === parrent;
  });

  if(childMenu){
    menuHtml = menuHtml + ' <ul class="nav">';
    buildMenu(paramMenus, parrent);
    menuHtml = menuHtml + ' </ul>';
  }
  else{
    return;
  }
}

