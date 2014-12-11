var mainContainer = "#mainContainer";
var $mainContainer;
var Merror = "error";
var Mwarning = "warning";
var Msuccess = "success";
var MerrorMessage = "Error al guardar la informacion, por favor intentalo de nuevo, si el erorr persiste consulta al administrador.";
var MwarningMessage = "Error al guardar los datos, parte de la informacion no fue guardada, por favor intentalo de nuevo, si el erorr persiste consulta al administrador.";
var MsuccessMessage = "Los datos fueron guardados con exito.";
var Mserver = "http://www.mendezjr.com";


var homePage = "home.html";
var homeButton = "#homeButton";

var clientesPage = "clientes.html";
var clientesButton = "#clientesButton";
var clientesSave = Mserver+"/clientesSave.php";
var clientesAutoComplete = Mserver+"/clientesAutoComplete.php";
var clientesDireccionDEntrega = Mserver+"/clientesDireccionDEntrega.php";
var clientesDireccionPRecive = Mserver+"/clientesDireccionPRecive.php";
var clientesUpdate = Mserver+"/clientesUpdate.php"

var proveedoresPage = "proveedores.html";
var proveedoresButton = "#proveedoresButton";
var proveedoresSave = Mserver+"/proveedoresSave.php";
var proveedoresAutoComplete = Mserver+"/proveedoresAutoComplete.php";
var proveedoresUpdate = Mserver+"/proveedoresUpdate.php";

var productosPage = "productos.html";
var productosButton = "#productosButton";
var productosSave = Mserver+"/productosSave.php";
var productosAutoComplete = Mserver+"/productosAutoComplete.php";
var productosReceta = Mserver+"/productosReceta.php";
var productosUpdate = Mserver+"/productosUpdate.php";

var almacenesPage = "almacenes.html";
var almacenesButton = "#almacenesButton"
var almacenesSave = Mserver+"/almacenesSave.php";
var almacenesAutoComplete = Mserver+"/almacenesAutoComplete.php";
var alamacenesUpdate = Mserver+"/alamacenesUpdate.php";

var bancosPage = "bancos.html";
var bancosButton = "#bancosButton";
var bancosSave = Mserver+"/bancosSave.php";
var bancosAutoComplete = Mserver+"/bancosAutoComplete.php";
var bancosUpdate = Mserver+"/bancosUpdate.php";

var personalPage = "personal.html";
var personalButton = "#personalButton";

var ventaPage = "venta.html";
var ventaButton = "#ventaButton";
var getAlmacenDefault = Mserver+"/getAlmacenDefault.php";
var varDefaultAlmacen = {};
var getBancoDefault = Mserver+"/getBancoDefault.php";
var varDefaultBanco = {};
var ventaSave = Mserver+"/ventaSave.php";
var ventaUpdate = Mserver+"/ventaUpdate.php"
var ventaAutocomplete = Mserver+"/ventaAutocomplete.php";
var getDetalleVenta = Mserver+"/getDetalleVenta.php";
var getExactProducto = Mserver+"/getExactProducto.php";

var cortePage = "corte.html";
var corteButton = "#corteButton";

$( document ).ready(function() {
  $mainContainer = $(mainContainer);
  addActionsToMainMenus();
  loadPage(homePage);
});

function addActionsToMainMenus(){
  //CATALOGOS
  addActionToMenu(homeButton, homePage);
  addActionToMenu(clientesButton, clientesPage, function(){regAccionesClientes();});
  addActionToMenu(proveedoresButton, proveedoresPage, function(){regAccionesProveedores();});
  addActionToMenu(productosButton, productosPage, function(){regAccionesProdcutos();});
  addActionToMenu(almacenesButton, almacenesPage, function(){regAccionesAlmacenes();});
  addActionToMenu(personalButton, personalPage);
  addActionToMenu(bancosButton, bancosPage, function(){regAccionesBancos();});
  //OPERACION
  addActionToMenu(ventaButton, ventaPage, function(){regAccionesVentas();});
  addActionToMenu(corteButton, cortePage, function(){regAccionesVentas();});
}

function addActionToMenu(buttonID, pageToLoad, callbackLoad){
  console.log(buttonID, $(buttonID));
  $(buttonID).click(function(event){
    event.preventDefault();
    loadPage(pageToLoad, callbackLoad);
  })
}

function loadPage(page, callbackLoad){
  if (callbackLoad){
    $mainContainer.load(page, callbackLoad);
  } else {
    $mainContainer.load(page);
  }
}

//CLIENTES//CLIENTES//CLIENTES//CLIENTES//CLIENTES//CLIENTES//CLIENTES//CLIENTES
//CLIENTES//CLIENTES//CLIENTES//CLIENTES//CLIENTES//CLIENTES//CLIENTES//CLIENTES
//CLIENTES//CLIENTES//CLIENTES//CLIENTES//CLIENTES//CLIENTES//CLIENTES//CLIENTES

function regAccionesClientes(){
  addClientesGuardar();
  addRowTVentaTable();
  addClientesCancelar();
  addClientesAutoComplete(".nombre input",function(event, ui){
      $(".nombre input").data("id",ui.item.id);
      $(".direccion input").val(ui.item.direccion);
      $("input.telefono").val(ui.item.telefono);
      $("input.rfc").val(ui.item.rfc);
      $("input.limite").val(ui.item.credito_limite);
      $("input.periodo").val(ui.item.credito_periodo);
      $(".periodicidad").val(ui.item.credito_periodicidad);
      $(".numpagos").val(ui.item.credito_pagos);
      if (parseInt(ui.item.credito_cerrado)){
        $(".cerrado").prop('checked', true);
      } else {
        $(".cerrado").prop('checked', false);
      }
      $(".comentarios").val(ui.item.nota);

      $.ajax({
        url : clientesDireccionDEntrega,
        data : {'id': ui.item.id},
        dataType : "json",
        success: function(data){
          var $entrega = $(".entregaRecive");
          $entrega.html("");
          $.each(data, function(index, value){
            $entrega.append('<tr class=""><td><input type="text" class="form-control dentrega" value="'+value.dentrega+'"></td><td><input type="text" class="form-control recive"></td></tr>');
          });

          $.ajax({
            url : clientesDireccionPRecive,
            data : {'id': ui.item.id},
            dataType : "json",
            success: function(data){
              $entrega = $(".entregaRecive");
              var $preciveInput = $entrega.find("input.recive");
              $.each(data, function(index, value){
                if ($preciveInput.length > index){
                  $preciveInput.eq(index).val(value.precive);
                } else {
                  $entrega.append('<tr class=""><td><input type="text" class="form-control dentrega"></td><td><input type="text" class="form-control recive" value="'+value.precive+'"></td></tr>');
                }
              });
            },
            error: function(jqXHR, textStatus, errorThrown ){
              showSplashGeneral(Merror, MerrorMessage, $(".nombre input"));
            }
          });

        },
        error: function(jqXHR, textStatus, errorThrown ){
          showSplashGeneral(Merror, MerrorMessage, $(".nombre input"));
        }
      });

      $(".actualizar").show();
      $(".guardar").hide();

  });
  addClientesActualizar();
  addClientesFloatValidator();
  addCopiaDireccion();
}

function addCopiaDireccion(){
  $(".direccion input").change(function(){
    var $fdir = $(".dentrega:eq(0)");
    if ($fdir.val().trim() == ""){
      $fdir.val($(this).val());
    }
  });
}

function addClientesGuardar(){
  $(".clientes.guardar").click(function(){
    if (clientesValidaCampos()){
      clientesGuarda();
    }
  });
}

function addClientesCancelar(){
  $(".cancelar").click(function(){
    limpiaClientesFields();
  });
}

function addClientesAutoComplete(selector, selectFunction){
  $(selector).autocomplete({
    minLength: 3,
    source: clientesAutoComplete,
    select: function( event, ui ) {
      selectFunction(event, ui);
    }
  });
}

function addClientesActualizar(){
  $(".actualizar").click(function(){
    if (clientesValidaCampos()){
      clientesActualiza();
    }
  });
}

function addClientesFloatValidator(){
  $("input.limite, input.periodo, .numpagos").focusout(function(){
    var $this = $(this);
    $this.val(floatValidatorGeneral($this));
  });
}

function addRowTVentaTable(){
  var $entrega = $(".entregaRecive");
  addingRowVentaTable($entrega, ".dentrega");
  addingRowVentaTable($entrega, ".recive");
}

function addingRowVentaTable($entrega, selector){
  $entrega.on("focus", selector, function(){
    var $this = $(this);
    var $GOElements = $entrega.find(selector);
    if ($GOElements.length-1 == $GOElements.index($this)){
      $entrega.append('<tr class=""><td><input type="text" class="form-control dentrega"></td><td><input type="text" class="form-control recive"></td></tr>');
    }
  });
}

function getClientesFields(){
  var values = {};
  values["usuario"] = "0";//TOOD cuando se tenga autenciacion
  values["nombre"] = $(".nombre input").val();
  values["direccion"] = $(".direccion input").val();
  values["telefono"] = $("input.telefono").val();
  values["rfc"] = $("input.rfc").val();
  values["limite"] = $("input.limite").val();
  values["periodo"] = $("input.periodo").val();
  values["periodoa"] = $(".periodicidad").val();
  values["pagos"] = $(".numpagos").val();
  values["cerrado"] = $(".cerrado").is(":checked") ? '1' : '0';
  values["notas"] = $(".comentarios").val();

  $(".dentrega").each(function(index, value){
    var valdentrega = $(value).val();
    if (valdentrega.trim().length > 0){
      values["dentrega"+index] = valdentrega;
    }
  });

  $(".recive").each(function(index, value){
    var valdentrega = $(value).val();
    if (valdentrega.trim().length > 0){
      values["precive"+index] = valdentrega;
    }
  });

  return values;
}

function clientesGuarda(){
  var values = getClientesFields();

  $.ajax({
    url : clientesSave,
    data : values,
    dataType : "json",
    success: function(data){
      procesaAJAXQueryGeneral(data, null, limpiaClientesFields, limpiaClientesFields);
    },
    error: function(jqXHR, textStatus, errorThrown ){
      showSplashGeneral(Merror, MerrorMessage);

    }
  });
}

function clientesActualiza(){
  var values = getClientesFields();
  values["id"] = $(".nombre input").data("id");
  $.ajax({
    url : clientesUpdate,
    data : values,
    dataType : "json",
    success: function(data){
      procesaAJAXQueryGeneral(data, null, limpiaClientesFields, limpiaClientesFields);
    },
    error: function(jqXHR, textStatus, errorThrown ){
      showSplashGeneral(Merror, MerrorMessage);
    }
  });
}

function limpiaClientesFields(){
  $(".nombre input").val("").data("id","");
  $(".direccion input").val("");
  $("input.telefono").val("");
  $("input.rfc").val("");
  $("input.limite").val("0");
  $("input.disponible").val("0");
  $("input.periodo ").val("0");
  $(".periodicidad").val('dias');
  $(".numpagos").val("0");
  $(".cerrado").prop("checked", false);
  $(".comentarios").val("");

  var $tableReciveEntrega = $(".entregaRecive tr");
  $tableReciveEntrega.slice(1,$tableReciveEntrega.length).remove();
  $tableReciveEntrega.find("input").val("");

  $(".actualizar").hide();
  $(".guardar").show();

}

function clientesValidaCampos(){
  var ok = true;
  var $nombre = $(".nombre");
  var valNombre = $nombre.find("input").val();
  if (valNombre.trim() == ""){
    addGeneralError($nombre);
    ok = false;
  }
  return ok;
}


//ENDCLIENTES//ENDCLIENTES//ENDCLIENTES//ENDCLIENTES//ENDCLIENTES//ENDCLIENTES
//ENDCLIENTES//ENDCLIENTES//ENDCLIENTES//ENDCLIENTES//ENDCLIENTES//ENDCLIENTES
//ENDCLIENTES//ENDCLIENTES//ENDCLIENTES//ENDCLIENTES//ENDCLIENTES//ENDCLIENTES


//PROVEEDORES//PROVEEDORES//PROVEEDORES//PROVEEDORES//PROVEEDORES//PROVEEDORES
//PROVEEDORES//PROVEEDORES//PROVEEDORES//PROVEEDORES//PROVEEDORES//PROVEEDORES
//PROVEEDORES//PROVEEDORES//PROVEEDORES//PROVEEDORES//PROVEEDORES//PROVEEDORES


function regAccionesProveedores(){
  addProovedoresGuardar();
  addProveedoresCancelar();
  addProveedoresAutoComplete();
  addProveedoresActualizar();
  addClientesFloatValidator()
}

function addProovedoresGuardar(){
  $(".guardar").click(function(){
    if (clientesValidaCampos()){
      proveedoresGuarda();
    }
  });
}

function addProveedoresCancelar(){
  $(".cancelar").click(function(){
    limpiaProveedoresFields();
  });
}

function addProveedoresAutoComplete(){
  $(".nombre input").autocomplete({
    minLength: 3,
    source: proveedoresAutoComplete,
    select: function( event, ui ) {
      $(".nombre input").data("id",ui.item.id);
      $(".direccion input").val(ui.item.direccion);
      $("input.telefono").val(ui.item.telefono);
      $("input.rfc").val(ui.item.rfc);
      $("input.limite").val(ui.item.credito_limite);
      $("input.periodo").val(ui.item.credito_periodo);
      $(".periodicidad").val(ui.item.credito_periodicidad);
      $(".numpagos").val(ui.item.credito_pagos);
      if (parseInt(ui.item.credito_cerrado)){
        $(".cerrado").prop('checked', true);
      } else {
        $(".cerrado").prop('checked', false);
      }
      $(".comentarios").val(ui.item.nota);

      $(".actualizar").show();
      $(".guardar").hide();


    }
  });
}

function addProveedoresActualizar(){
  $(".actualizar").click(function(){
    if (clientesValidaCampos()){
      proveedoresActualiza();
    }
  });
}

function proveedoresGuarda(){
  var values = getProveedoresFields();
  $.ajax({
    url : proveedoresSave,
    data : values,
    dataType : "json",
    success: function(data){
      procesaAJAXQueryGeneral(data, null, limpiaProveedoresFields, limpiaProveedoresFields);
    },
    error: function(jqXHR, textStatus, errorThrown ){
      showSplashGeneral(Merror, MerrorMessage);
    }
  });
}

function getProveedoresFields(){
  var values = {};
  values["usuario"] = "0";//TOOD cuando se tenga autenciacion
  values["nombre"] = $(".nombre input").val();
  values["direccion"] = $(".direccion input").val();
  values["telefono"] = $("input.telefono").val();
  values["rfc"] = $("input.rfc").val();
  values["limite"] = $("input.limite").val();
  values["periodo"] = $("input.periodo").val();
  values["periodoa"] = $(".periodicidad").val();
  values["pagos"] = $(".numpagos").val();
  values["cerrado"] = $(".cerrado").is(":checked") ? '1' : '0';
  values["notas"] = $(".comentarios").val();

  return values;
}

function limpiaProveedoresFields(){
  $(".nombre input").val("").data("id","");
  $(".direccion input").val("");
  $("input.telefono").val("");
  $("input.rfc").val("");
  $("input.limite").val("0");
  $("input.disponible").val("0");
  $("input.periodo ").val("0");
  $(".periodicidad").val("dias");
  $(".numpagos").val("0");
  $(".cerrado").prop("checked", false);
  $(".comentarios").val("");

  $(".actualizar").hide();
  $(".guardar").show();

}

function proveedoresActualiza(){
  var values = getProveedoresFields();
  values["id"] = $(".nombre input").data("id");
  $.ajax({
    url : proveedoresUpdate,
    data : values,
    dataType : "json",
    success: function(data){
      procesaAJAXQueryGeneral(data, null, limpiaProveedoresFields, limpiaProveedoresFields);
    },
    error: function(jqXHR, textStatus, errorThrown ){
      showSplashGeneral(Merror, MerrorMessage);
    }
  });
}

//ENDPROVEEDORES//ENDPROVEEDORES//ENDPROVEEDORES//ENDPROVEEDORES//ENDPROVEEDORES
//ENDPROVEEDORES//ENDPROVEEDORES//ENDPROVEEDORES//ENDPROVEEDORES//ENDPROVEEDORES
//ENDPROVEEDORES//ENDPROVEEDORES//ENDPROVEEDORES//ENDPROVEEDORES//ENDPROVEEDORES

//PRUDUCTOS//PRUDUCTOS//PRUDUCTOS//PRUDUCTOS//PRUDUCTOS//PRUDUCTOS//PRUDUCTOS
//PRUDUCTOS//PRUDUCTOS//PRUDUCTOS//PRUDUCTOS//PRUDUCTOS//PRUDUCTOS//PRUDUCTOS
//PRUDUCTOS//PRUDUCTOS//PRUDUCTOS//PRUDUCTOS//PRUDUCTOS//PRUDUCTOS//PRUDUCTOS

function regAccionesProdcutos(){
  addProductosGuardar();
  addRowRecetaTable();
  addProductosCancelar();
  var selectElementFunction = function(event, ui){
      $(".descripcion").data("id",ui.item.id);
      $(".unidad").val(ui.item.medida);
      $(".merma").val(ui.item.merma_transporte);
      $(".precio").val(ui.item.precio);
      $(".minimo").val(ui.item.minimo);
      $(".barras").val(ui.item.barras);
      if (parseInt(ui.item.receta_invertida)){
        $(".invertida").prop('checked', true);
      } else {
        $(".invertida").prop('checked', false);
      }
      $(".comentarios").val(ui.item.nota);

      $.ajax({
        url : productosReceta,
        data : {'id': ui.item.id},
        dataType : "json",
        success: function(data){
          var $entrega = $(".recetaTabla");
          $entrega.html("");
          $.each(data, function(index, value){
            var checked = "";
            if (parseInt(value.merma) == 1){
              checked = 'checked="true"';
            }
            var $recetaItem = $('<tr class="recetaItem"><td><input type="text" class="form-control recetaProducto" value="'+value.descripcion+'" data-id="'+value.id_producto_receta+'"></td><td><input type="number" class="form-control recetaCantidad" min=0 value="'+value.cantidad+'"></td><td><input type="checkbox" class="merma" '+checked+'></td></tr>');
            $entrega.append($recetaItem);
          });

          var $recetaItem = $('<tr class="recetaItem"><td><input type="text" class="form-control recetaProducto"></td><td><input type="number" class="form-control recetaCantidad" min=0></td><td><input type="checkbox" class="merma"></td></tr>');
          $entrega.append($recetaItem);

          $entrega.find(".recetaProducto").autocomplete({
              minLength: 3,
              source: productosAutoComplete,
              select: function( event, ui ) {
                $(this).data("id",ui.item.id);
              }
          });

        },
        error: function(jqXHR, textStatus, errorThrown ){
          showSplashGeneral(Merror, MerrorMessage, $(".nombre input"));
        }
      });

      $(".actualizar").show();
      $(".guardar").hide();
  }
  addProductosAutoComplete(".descripcion", selectElementFunction);
  addProductosFloatValidator();
  addProductosRecetaAutomplete();
  addProductosActualizar();
}

function addProductosGuardar(){
  $(".guardar").click(function(){
    if (productosValidaCampos()){
      prodcutosGuarda();
    }
  });
}

function addProductosCancelar(){
  $(".cancelar").click(function(){
    limpiaProductosFields();
  });
}

function limpiaProductosFields(){
  $(".descripcion").val("").data("id","");
  $(".unidad").val("Kilo");
  $(".merma").val("0");
  $(".precio").val("0");
  $(".minimo").val("0");
  $(".barras").val("");
  $(".invertida").prop("checked", false);
  $(".comentarios").val("");

  var $tableReceta = $(".recetaItem");
  $tableReceta.slice(1,$tableReceta.length).remove();
  $tableReceta.find(".recetaProducto, .recetaCantidad").val("");
  $tableReceta.find(".merma").prop("checked", false);

  $(".actualizar").hide();
  $(".guardar").show();

}

function addRowRecetaTable(){
  var $entrega = $(".recetaTabla");
  addingRecetaTable($entrega, ".recetaProducto");
  addingRecetaTable($entrega, ".recetaCantidad");
}

function addingRecetaTable($entrega, selector){
  $entrega.on("focus", selector, function(){
    var $this = $(this);
    var $GOElements = $entrega.find(selector);
    if ($GOElements.length-1 == $GOElements.index($this)){
      var $recetaItem = $('<tr class="recetaItem"><td><input type="text" class="form-control recetaProducto"></td><td><input type="number" class="form-control recetaCantidad" min=0 value="0"></td><td><input type="checkbox" class="merma"></td></tr>');
      $entrega.append($recetaItem);
      $recetaItem.find(".recetaProducto").autocomplete({
        minLength: 3,
        source: productosAutoComplete,
        select: function( event, ui ) {
          $(this).data("id",ui.item.id);
        }
      });

    }
  });
}

function addProductosRecetaAutomplete(){
  $(".recetaProducto").autocomplete({
    minLength: 3,
    source: productosAutoComplete,
    select: function( event, ui ) {
      $(this).data("id",ui.item.id);
    }
  });
}

function productosValidaCampos(){
  var ok = true;
  var $descripcion = $(".descripcion");
  var valDescripcion = $descripcion.val();
  if (valDescripcion.trim() == ""){
    addGeneralError($descripcion.parent());
    ok = false;
  }
  return ok;
}

function prodcutosGuarda(){
  var values = getProdcutosFields();
  $.ajax({
    url : productosSave,
    data : values,
    dataType : "json",
    success: function(data){
      procesaAJAXQueryGeneral(data, null, limpiaProductosFields, limpiaProductosFields);
    },
    error: function(jqXHR, textStatus, errorThrown ){
      showSplashGeneral(Merror, MerrorMessage);
    }
  });
}

function getProdcutosFields(){
  var values = {};
  values["usuario"] = "0";//TOOD cuando se tenga autenciacion
  values["descripcion"] = $(".descripcion").val();
  values["unidad"] = $(".unidad").val();
  values["merma"] = $(".merma").val();
  values["precio"] = $(".precio").val();
  values["minimo"] = $(".minimo").val();
  values["barras"] = $(".barras").val();
  values["invertida"] = $(".invertida").is(":checked") ? '1' : '0';
  values["notas"] = $(".comentarios").val();

  $(".recetaItem").each(function(index, valueuns){
    var $this = $(this);
    var valProductoVal = $this.find(".recetaProducto").val();
    var valProducto = $this.find(".recetaProducto").data("id");
    var valCantidad = $this.find(".recetaCantidad").val();

    if (valProductoVal && valProductoVal !== undefined && valProductoVal.trim().length &&
        valProducto && valProducto !== undefined && valProducto.toString().trim().length > 0 &&
        valCantidad && valCantidad.trim().length > 0){
      values["recetaProducto"+index] = valProducto;
      values["recetaCandidad"+index] = valCantidad;
      values["recetaMerma"+index] = $this.find(".merma").is(":checked") ? '1' : '0';;
    }

  });

  return values;
}

function addProductosAutoComplete(element, selectElementFunction){

  $(element).autocomplete({
    minLength: 3,
    source: productosAutoComplete,
    select: function( event, ui ) {
      selectElementFunction(event, ui)
    }
  });
}

function addProductosFloatValidator(){
  $(".merma, .precio, .minimo").focusout(function(){
    var $this = $(this);
    $this.val(floatValidatorGeneral($this));
  });

  $(".recetaTabla").on("focusout", ".recetaCantidad", function(){
    var $this = $(this);
    $this.val(floatValidatorGeneral($this));
  });
}


function addProductosActualizar(){
  $(".actualizar").click(function(){
    if (productosValidaCampos()){
      productosActualiza();
    }
  });
}

function productosActualiza(){
  var values = getProdcutosFields();
  values["id"] = $(".descripcion").data("id");
  $.ajax({
    url : productosUpdate,
    data : values,
    dataType : "json",
    success: function(data){
      procesaAJAXQueryGeneral(data, null, limpiaProductosFields, limpiaProductosFields);
    },
    error: function(jqXHR, textStatus, errorThrown ){
      showSplashGeneral(Merror, MerrorMessage);
    }
  });
}
//ENDPRODUCTOS//ENDPRODUCTOS//ENDPRODUCTOS//ENDPRODUCTOS//ENDPRODUCTOS
//ENDPRODUCTOS//ENDPRODUCTOS//ENDPRODUCTOS//ENDPRODUCTOS//ENDPRODUCTOS
//ENDPRODUCTOS//ENDPRODUCTOS//ENDPRODUCTOS//ENDPRODUCTOS//ENDPRODUCTOS

//ALMACENES//ALMACENES//ALMACENES//ALMACENES//ALMACENES//ALMACENES//ALMACENES
//ALMACENES//ALMACENES//ALMACENES//ALMACENES//ALMACENES//ALMACENES//ALMACENES
//ALMACENES//ALMACENES//ALMACENES//ALMACENES//ALMACENES//ALMACENES//ALMACENES

function regAccionesAlmacenes(){
  addAlmacenesGuardar();
  addAlmacenesCancelar();
  addAlmacenesAutoComplete(".descripcion", function(event, ui){
    $(".descripcion").data("id",ui.item.id);

      if (parseInt(ui.item.compartida)){
        $(".compartida").prop('checked', true);
      } else {
        $(".compartida").prop('checked', false);
      }

      if (parseInt(ui.item.alamacen_default)){
        $(".default").prop('checked', true);
      } else {
        $(".default").prop('checked', false);
      }

      $(".comentarios").val(ui.item.notas);


      $(".actualizar").show();
      $(".guardar").hide();
  });
  addAlmacenesActualizar();
  addClientesFloatValidator();
}

function addAlmacenesGuardar(){
  $(".guardar").click(function(){
    if (almacenesValidaCampos()){
      almacenesGuarda();
    }
  });
}

function almacenesValidaCampos(){
  var ok = true;
  var $descripcion = $(".descripcion");
  var valDescripcion = $descripcion.val();
  if (valDescripcion.trim() == ""){
    addGeneralError($descripcion.parent());
    ok = false;
  }
  return ok;
}

function almacenesGuarda(){
  var values = getAlmacenesFields();
  $.ajax({
    url : almacenesSave,
    data : values,
    dataType : "json",
    success: function(data){
      procesaAJAXQueryGeneral(data, null, limpiaAlmacenessFields, limpiaAlmacenessFields);
    },
    error: function(jqXHR, textStatus, errorThrown ){
      showSplashGeneral(Merror, MerrorMessage);
    }
  });
}

function getAlmacenesFields(){
  var values = {};
  values["usuario"] = "0";//TOOD cuando se tenga autenciacion
  values["descripcion"] = $(".descripcion").val();
  values["compartida"] = $(".compartida").is(":checked") ? '1' : '0';
  values["default"] = $(".default").is(":checked") ? '1' : '0';
  values["notas"] = $(".comentarios").val();

  if (values["compartida"] == '1'){
    //TODO cuando se agrege personal agregar responsabilidad compartida
    $(".recetaItem").each(function(index, valueuns){
      var $this = $(this);
      var valProductoVal = $this.find(".recetaProducto").val();
      var valProducto = $this.find(".recetaProducto").data("id");
      var valCantidad = $this.find(".recetaCantidad").val();

      if (valProductoVal && valProductoVal !== undefined && valProductoVal.trim().length &&
          valProducto && valProducto !== undefined && valProducto.toString().trim().length > 0 &&
          valCantidad && valCantidad.trim().length > 0){
        values["recetaProducto"+index] = valProducto;
        values["recetaCandidad"+index] = valCantidad;
        values["recetaMerma"+index] = $this.find(".merma").is(":checked") ? '1' : '0';;
      }

    });
  }


  return values;
}

function limpiaAlmacenessFields(){

  $(".descripcion").val("").data("id","");
  $(".compartida").prop("checked", false);
  $(".default").prop("checked", false);
  $(".comentarios").val("");

  $(".actualizar").hide();
  $(".guardar").show();

}

function addAlmacenesCancelar(){
  $(".cancelar").click(function(){
    limpiaAlmacenessFields();
  });
}

function addAlmacenesAutoComplete(selector, selectFunction){
  $(selector).autocomplete({
    minLength: 3,
    source: almacenesAutoComplete,
    select: function( event, ui ) {
      selectFunction(event, ui);
    }
  });
}

function addAlmacenesActualizar(){
   $(".actualizar").click(function(){
    if (productosValidaCampos()){
      almacenesActualiza();
    }
  });
}

function almacenesActualiza(){
  var values = getAlmacenesFields();
  values["id"] = $(".descripcion").data("id");
  $.ajax({
    url : alamacenesUpdate,
    data : values,
    dataType : "json",
    success: function(data){
      procesaAJAXQueryGeneral(data, null, limpiaAlmacenessFields, limpiaAlmacenessFields);
    },
    error: function(jqXHR, textStatus, errorThrown ){
      showSplashGeneral(Merror, MerrorMessage);
    }
  });
}

//ENDALMACENES//ENDALMACENES//ENDALMACENES//ENDALMACENES//ENDALMACENES
//ENDALMACENES//ENDALMACENES//ENDALMACENES//ENDALMACENES//ENDALMACENES
//ENDALMACENES//ENDALMACENES//ENDALMACENES//ENDALMACENES//ENDALMACENES
//BANCOS//BANCOS//BANCOS//BANCOS//BANCOS//BANCOS//BANCOS//BANCOS//BANCOS//BANCOS
//BANCOS//BANCOS//BANCOS//BANCOS//BANCOS//BANCOS//BANCOS//BANCOS//BANCOS//BANCOS
//BANCOS//BANCOS//BANCOS//BANCOS//BANCOS//BANCOS//BANCOS//BANCOS//BANCOS//BANCOS
//BANCOS//BANCOS//BANCOS//BANCOS//BANCOS//BANCOS//BANCOS//BANCOS//BANCOS//BANCOS


function regAccionesBancos(){
  addBancosGuardar();
  addBancosCancelar();
  addBancosAutoComplete(".descripcion", function(event, ui){
      $(".descripcion").data("id",ui.item.id);


      $(".banco").val(ui.item.banco);
      $(".sucursal").val(ui.item.banco_sucursal);
      $(".cuenta").val(ui.item.cuenta);
      $(".clabe").val(ui.item.clabe);

      if (parseInt(ui.item.chequera)){
        $(".chequera").prop('checked', true);
      } else {
        $(".chequera").prop('checked', false);
      }

      if (parseInt(ui.item.tarjeta)){
        $(".tarjeta").prop('checked', true);
      } else {
        $(".tarjeta").prop('checked', false);
      }

      if (parseInt(ui.item.banco_default)){
        $(".default").prop('checked', true);
      } else {
        $(".default").prop('checked', false);
      }

      $(".comentarios").val(ui.item.notas);

      $(".actualizar").show();
      $(".guardar").hide();
  });
  addBancosActualizar();
}

function addBancosGuardar(){
  $(".guardar").click(function(){
    if (bancosValidaCampos()){
      bancosGuarda();
    }
  });
}

function bancosValidaCampos(){
  var ok = true;
  var $descripcion = $(".descripcion");
  var valDescripcion = $descripcion.val();
  if (valDescripcion.trim() == ""){
    addGeneralError($descripcion.parent());
    ok = false;
  }
  return ok;
}

function bancosGuarda(){
  var values = getBancosFields();
  $.ajax({
    url : bancosSave,
    data : values,
    dataType : "json",
    success: function(data){
      procesaAJAXQueryGeneral(data, null, limpiaBancosFields, limpiaBancosFields);
    },
    error: function(jqXHR, textStatus, errorThrown ){
      showSplashGeneral(Merror, MerrorMessage);
    }
  });
}

function getBancosFields(){
  var values = {};
  values["usuario"] = "0";//TOOD cuando se tenga autenciacion
  values["descripcion"] = $(".descripcion").val();
  values["banco"] = $(".banco").val();
  values["sucursal"] = $(".sucursal").val();
  values["cuenta"] = $(".cuenta").val();
  values["clabe"] = $(".clabe").val();
  values["chequera"] = $(".chequera").is(":checked") ? '1' : '0';
  values["tarjeta"] = $(".tarjeta").is(":checked") ? '1' : '0';
  values["default"] = $(".default").is(":checked") ? '1' : '0';
  values["notas"] = $(".comentarios").val();

  return values;
}

function limpiaBancosFields(){

  $(".descripcion").val("").data("id","");
  $(".banco").val("");
  $(".sucursal").val("");
  $(".cuenta").val("");
  $(".clabe").val("");

  $(".chequera").prop("checked", false);
  $(".tarjeta").prop("checked", false);
  $(".default").prop("checked", false);

  $(".comentarios").val("");

  $(".actualizar").hide();
  $(".guardar").show();

}

function addBancosCancelar(){
  $(".cancelar").click(function(){
    limpiaBancosFields();
  });
}

function addBancosAutoComplete(selector, functionSelected){
  $(selector).autocomplete({
    minLength: 3,
    source: bancosAutoComplete,
    select: function( event, ui ) {
      functionSelected(event, ui);

    }
  });
}

function addBancosActualizar(){
   $(".actualizar").click(function(){
    if (bancosValidaCampos()){
      bancosActualiza();
    }
  });
}

function bancosActualiza(){
  var values = getBancosFields();
  values["id"] = $(".descripcion").data("id");
  $.ajax({
    url : bancosUpdate,
    data : values,
    dataType : "json",
    success: function(data){
      procesaAJAXQueryGeneral(data, null, limpiaBancosFields, limpiaBancosFields);
    },
    error: function(jqXHR, textStatus, errorThrown ){
      showSplashGeneral(Merror, MerrorMessage);
    }
  });
}


//ENDBANCOS//ENDBANCOS//ENDBANCOS//ENDBANCOS//ENDBANCOS//ENDBANCOS//ENDBANCOS
//ENDBANCOS//ENDBANCOS//ENDBANCOS//ENDBANCOS//ENDBANCOS//ENDBANCOS//ENDBANCOS
//ENDBANCOS//ENDBANCOS//ENDBANCOS//ENDBANCOS//ENDBANCOS//ENDBANCOS//ENDBANCOS

//VENTAS//VENTAS//VENTAS//VENTAS//VENTAS//VENTAS//VENTAS//VENTAS//VENTAS//VENTAS
//VENTAS//VENTAS//VENTAS//VENTAS//VENTAS//VENTAS//VENTAS//VENTAS//VENTAS//VENTAS
//VENTAS//VENTAS//VENTAS//VENTAS//VENTAS//VENTAS//VENTAS//VENTAS//VENTAS//VENTAS


function regAccionesVentas(){
  var selectElementFunction = function(event, ui){
      var $currElement = $(event.target);
      $currElement.data("id",ui.item.id);
      $currElement = $currElement.parent().parent();
      $currElement.find(".unidad").html(ui.item.medida);
      $currElement.find(".pu").html(ui.item.precio);
  };
  addProductosAutoComplete(".contenEditale.producto", selectElementFunction);
  addAlmacenesAutoComplete(".contenEditale.almacen", function(event, ui){
      $(event.target).data("id",ui.item.id);
  });
  getDefaultAlmacen($(".contenEditale.almacen"));
  addRowNotaImtes();
  getDefaultBanco($(".banco"));
  addClientesAutoComplete(".cliente",function(event, ui){
      $(".cliente").data("id",ui.item.id);
      $(".facturar").prop('checked', false);
      if (ui.item.rfc == ""){
        $(".facturarContainer").hide();
      } else {
        $(".facturarContainer").show();
      }
      if (ui.item.credito_limite > 0){
        $(".tipo_pago [value=Credito]").show();
      } else {
        $(".tipo_pago").val("Efectivo").find("[value=Credito]").hide();
      }

      var $entrega = $(".envio");
      $entrega.html('<option value="0">Selecciona una direccion</option>');
      var $recive = $(".recive");
      $recive.html('<option value="0">Selecciona un resposable</option>');

      $.ajax({
        url : clientesDireccionDEntrega,
        data : {'id': ui.item.id},
        dataType : "json",
        success: function(data){
          $.each(data, function(index, value){
            $entrega.append('<option value="'+value.dentrega+'">'+value.dentrega+'</option>');
          });
        },
        error: function(jqXHR, textStatus, errorThrown ){
          showSplashGeneral(Merror, MerrorMessage, $(".nombre input"));
        }
      });

      $.ajax({
        url : clientesDireccionPRecive,
        data : {'id': ui.item.id},
        dataType : "json",
        success: function(data){
          $.each(data, function(index, value){
            $recive.append('<option value="'+value.precive+'">'+value.precive+'</option>');
          });
        },
        error: function(jqXHR, textStatus, errorThrown ){
        }
      });

  });
  addBancosAutoComplete(".banco", function(event, ui){
      $(".banco").data("id",ui.item.id);
  });
  addDeleteNotaRow();
  addBarrasScan();
  addVentasFloatValidator();
  addNotaItemsTotalCalculation();
  addVentasCancelar();
  addVentasGuardar();
  addVentasActualizar();
  addVentasAutoComplete(".ventaN",function(event, ui){

    $(".ventaN").data("id",ui.item.id);
    $("#supTotal").html(ui.item.total);
    $(".cliente").val(ui.item.nombre).data("id",ui.item.cliente);
    $(".factura").val(ui.item.factura);
    $(".facturar").prop('checked', false);

      if (ui.item.rfc == ""){
        $(".facturarContainer").hide();
      } else {
        $(".facturarContainer").show();

      }
      if (ui.item.credito_limite > 0){
        $(".tipo_pago [value=Credito]").show();
      } else {
        $(".tipo_pago").val("Efectivo").find("[value=Credito]").hide();
      }

      var $entrega = $(".envio");
      $entrega.html('<option value="0">Selecciona una direccion</option>');
      var $recive = $(".recive");
      $recive.html('<option value="0">Selecciona un resposable</option>');

      if (ui.item.cliente != "0"){
        $.ajax({
          url : clientesDireccionDEntrega,
          data : {'id': ui.item.cliente},
          dataType : "json",
          success: function(data){
            $.each(data, function(index, value){
              $entrega.append('<option value="'+value.dentrega+'" selected="'+ (ui.item.cliente_envio == value.dentrega) +'">'+value.dentrega+'</option>');
            });
          },
          error: function(jqXHR, textStatus, errorThrown ){
            showSplashGeneral(Merror, MerrorMessage, $(".nombre input"));
          }
        });

        $.ajax({
          url : clientesDireccionPRecive,
          data : {'id': ui.item.cliente},
          dataType : "json",
          success: function(data){
            $.each(data, function(index, value){
              $recive.append('<option value="'+value.precive+'"  selected="'+ (ui.item.cliente_recive == value.precive) +'">'+value.precive+'</option>');
            });
          },
          error: function(jqXHR, textStatus, errorThrown ){
          }
        });
      }


    $(".tipo_pago").val(ui.item.tipo_pago);
    $(".documento_pago").val(ui.item.documento_pago);
    $(".cantidad").val(ui.item.cantidad_recivida);
    //$(".cambio").val("0");
    $(".banco").val(ui.item.descripcion).data("id", ui.item.banco);

    $.ajax({
      url : getDetalleVenta,
      data : {'id': ui.item.id},
      dataType : "json",
      success: function(data){

        var $entrega = $(".notaImtes");
        $entrega.html("");
        $.each(data, function(index, value){
          $entrega.append('<tr><td><span class="removeRow"> </span></td><td><span class="contenEditale barras" contenteditable></span></td>'+
          '<td><span class="contenEditale producto" contenteditable data-id="'+ value.producto +'">'+ value.descripcionproducto +'</span></td>'+
          '<td><span class="contenEditale almacen" contenteditable data-id="'+ value.almacen +'">'+ value.descripcionalmacen +'</span></td>'+
          '<td><span class="unidad">'+ value.unidad +'</span></td><td><span class="contenEditale cantidad" contenteditable>'+ value.cantidad +'</span></td>'+
          '<td><span class="contenEditale pu" contenteditable>'+ value.precio_unitario +'</span></td>'+
          '<td><span class="total">'+ value.total +'</span></td><td><span class="contenEditale obs" contenteditable>'+ value.observaciones +'</span></td></tr>');
        });

        addProductosAutoComplete(".contenEditale.producto", function(event, ui){
          var $currElement = $(event.target);
          $currElement.data("id",ui.item.id);
          $currElement = $currElement.parent().parent();
          $currElement.find(".unidad").html(ui.item.medida);
          $currElement.find(".pu").html(ui.item.precio);
        });

        addAlmacenesAutoComplete(".contenEditale.almacen", function(event, ui){
          $(event.target).data("id",ui.item.id);
        });



      },
      error: function(jqXHR, textStatus, errorThrown ){
        showSplashGeneral(Merror, MerrorMessage, $(".ventaN"));
      }
    });

    $(".actualizar").show();
    $(".guardar").hide();

  });
}

function addVentasCancelar(){
  $(".cancelar").click(function(){
    limpiaVentasFields();
  });
}

function addNotaItemsTotalCalculation(){
  $(".notaItemsTable").on("blur", ".cantidad, .pu, .producto", function(){

    var $varcont = $(this).parent().parent();
    $varcont.find(".total").html(Math.round($varcont.find(".cantidad").html() * $varcont.find(".pu").html()*100)/100);

    $varcont = $varcont.parent();
    var total = 0;
    $varcont.find(".total").each(function(){
      var loc = $(this).html();
      if (loc.trim() != ""){
        total = total + parseFloat(loc);
      }
    });
    $("#supTotal").html((Math.round(total*100)/100).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,") );
  });
}

function addDeleteNotaRow(){
  $(".notaItemsTable").on("click", ".removeRow", function(){
    var $varcont = $(this).parent().parent();
    if ($(".notaItemsTable").find("tbody tr").length == 1){
      $varcont.find("span").html("");
      $varcont.find(".almacen").html(varDefaultAlmacen["descripcion"]).data("id",varDefaultAlmacen["id"]);
    } else {
      $varcont.remove();
    }

  });
}


//2000010018459
//____ no sirve
//    ___ Barras del articulo
//       _____ peso en gramos
//            _ no sirve


function addBarrasScan(){

  $(".notaItemsTable").on("keydown", ".barras", function(e) {
    // trap the return key being pressed
    if (e.keyCode === 13) {
      console.log(e.target.innerHTML);
      if (e.target.innerHTML.length == 13){
        var saveVal = e.target.innerHTML.substr(4);
        var $saveElement = $(this);
        var prodid = saveVal.substring(0,3);
        var cantidad = parseFloat(saveVal.substr(3))/10000;
        $.ajax({
          url : getExactProducto,
          data : {'id': prodid},
          dataType : "json",
          success: function(data){
            for (value in data){
              //var $currElement = $(event.target);
              $saveElement = $saveElement.parent().parent();
              $saveElement.find(".producto").data("id",data[value].id).html(data[value].label);
              $saveElement.find(".unidad").html(data[value].medida);
              $saveElement.find(".pu").html(data[value].precio);
              $saveElement.find(".cantidad").html(cantidad).blur();
            }
          },
          error: function(jqXHR, textStatus, errorThrown ){

          }
        });
      }
      return false;
    }
  });
}



function getDefaultBanco($element){
 $.ajax({
    url : getBancoDefault,
    dataType : "json",
    success: function(data){
      varDefaultBanco = data[0];
      if (varDefaultBanco != undefined && varDefaultBanco["id"]!= undefined){
        if ($element != undefined){
          $element.val(varDefaultBanco["descripcion"]).data("id",varDefaultBanco["id"]);
        }
      } else {
        varDefaultBanco = {id:"",descripcion:""};
      }
    },
    error: function(jqXHR, textStatus, errorThrown ){
      varDefaultBanco = {id:"",descripcion:""};
    }
  });
}

function getDefaultAlmacen($element){
  $.ajax({
    url : getAlmacenDefault,
    dataType : "json",
    success: function(data){
      varDefaultAlmacen = data[0];
      if (varDefaultAlmacen != undefined && varDefaultAlmacen["id"]!= undefined){
        if ($element != undefined){
          $element.html(varDefaultAlmacen["descripcion"]).data("id",varDefaultAlmacen["id"]);
        }
        addRowNotaImtes();
      } else {
        varDefaultAlmacen = {id:"",descripcion:""};
        addRowNotaImtes();
      }
    },
    error: function(jqXHR, textStatus, errorThrown ){
      varDefaultAlmacen = {id:"",descripcion:""};
      addRowNotaImtes();
    }
  });
}

function addRowNotaImtes(){
  var $entrega = $(".notaImtes");
  addingRowNotaImtes($entrega, ".borrar");
  addingRowNotaImtes($entrega, ".barras");
  addingRowNotaImtes($entrega, ".producto");
  addingRowNotaImtes($entrega, ".almacen");
  addingRowNotaImtes($entrega, ".pu");
  addingRowNotaImtes($entrega, ".obs");
  addingRowNotaImtes($entrega, ".cantidad");
}

function addingRowNotaImtes($entrega, selector){
  $entrega.on("focus", selector, function(){
    var $this = $(this);
    var $GOElements = $entrega.find(selector);
    if ($GOElements.length-1 == $GOElements.index($this)){
      $entrega.append('<tr><td><span class="removeRow"> </span></td><td><span class="contenEditale barras" contenteditable></span></td>'+
        '<td><span class="contenEditale producto" contenteditable></span></td><td><span class="contenEditale almacen" contenteditable data-id="'+
        varDefaultAlmacen["id"]+'">'+varDefaultAlmacen["descripcion"]+'</span></td>'+
        '<td><span class="unidad"></span></td><td><span class="contenEditale cantidad" contenteditable></span></td><td><span class="contenEditale pu" contenteditable></span></td>'+
        '<td><span class="total"></span></td><td><span class="contenEditale obs" contenteditable></span></td></tr>');

      addProductosAutoComplete(".contenEditale.producto:last", function(event, ui){
          var $currElement = $(event.target);
          $currElement.data("id",ui.item.id);
          $currElement = $currElement.parent().parent();
          $currElement.find(".unidad").html(ui.item.medida);
          $currElement.find(".pu").html(ui.item.precio);
      });

      addAlmacenesAutoComplete(".contenEditale.almacen:last", function(event, ui){
        $(event.target).data("id",ui.item.id);
      });

    }
  });
}

function addVentasFloatValidator(){
  $(".notaImtes").on("focusout", ".cantidad, .pu", function(){
    var $this = $(this);
    $this.html(floatValidatorGeneralSpan($this));
  });

  $(".cantidad").focusout(function(){
    var $this = $(this);
    $this.val(floatValidatorGeneral($this));
  });
}

function limpiaVentasFields(){
  var $entrega = $(".notaImtes");
  $entrega.html('<tr><td><span class="removeRow"> </span></td><td><span class="contenEditale barras" contenteditable></span></td>'+
        '<td><span class="contenEditale producto" contenteditable></span></td><td><span class="contenEditale almacen" contenteditable data-id="'+
        varDefaultAlmacen["id"]+'">'+varDefaultAlmacen["descripcion"]+'</span></td>'+
        '<td><span class="unidad"></span></td><td><span class="contenEditale cantidad" contenteditable></span></td><td><span class="contenEditale pu" contenteditable></span></td>'+
        '<td><span class="total"></span></td><td><span class="contenEditale obs" contenteditable></span></td></tr>');

  addProductosAutoComplete(".contenEditale.producto:last", function(event, ui){
    var $currElement = $(event.target);
    $currElement.data("id",ui.item.id);
    $currElement = $currElement.parent().parent();
    $currElement.find(".unidad").html(ui.item.medida);
    $currElement.find(".pu").html(ui.item.precio);
  });

  addAlmacenesAutoComplete(".contenEditale.almacen:last", function(event, ui){
    $(event.target).data("id",ui.item.id);
  });

  $("#supTotal").html("0.0");
  $(".cliente").val("").data("id","");
  $(".factura").val("");
  $(".envio").html('<option value="0">Selecciona una direccion</option>');
  $(".recive").html('<option value="0">Selecciona un resposable</option>');
  $(".tipo_pago").val("Efectivo");
  $(".documento_pago").val("");
  $(".cantidad").val("");
 // $(".cambio").val("0");
  $(".banco").val(varDefaultBanco["descripcion"]).data("id",varDefaultBanco["id"]);
  $(".actualizar").hide();
  $(".guardar").show();

}

function addVentasGuardar(){
  $(".guardar").click(function(){
    if (ventasValidaCampos()){
      ventasGuarda();
    }
  });
}

function ventasGuarda(){
  var values = getVentasFields();
  $.ajax({
    url : ventaSave,
    data : values,
    dataType : "json",
    success: function(data){
      procesaAJAXQueryGeneral(data, null, limpiaVentasFields, limpiaVentasFields);
      if (values.tipo_pago == "Efectivo" && values.cambio > 0){
        $(".modal-body").html("Cambio: $"+(values.cantidad-values.total));
        $('#exampleModal').modal();
      }
    },
    error: function(jqXHR, textStatus, errorThrown ){
      showSplashGeneral(Merror, MerrorMessage);
    }
  });
}

function getVentasFields(){
  var list = {};

  var $entrega = $(".notaImtes");
  $entrega.find("tr").each(function(index, key){
    var $this = $(this);
    var dvproductoid = $this.find(".producto").data("id");
    var dvalmacenid = $this.find(".almacen").data("id");
    var dvunidad = $this.find(".unidad").html().trim();
    var dvcantidad = $this.find(".cantidad").html().trim();
    var dvpreciounitario = $this.find(".pu").html().trim();
    var dvtotal = $this.find(".total").html().trim();
    var dvobservaciones = $this.find(".obs").html().trim();

    if (!(dvproductoid == undefined || dvalmacenid == undefined || dvunidad == "" || dvcantidad == "" || dvcantidad == "0" || dvpreciounitario == "" || dvtotal == "" || dvtotal == "0")){
      list["detalleproducto"+index] = dvproductoid;
      list["detallealmacen"+index] = dvalmacenid;
      list["detalleunidad"+index] = dvunidad;
      list["detallecantidad"+index] = dvcantidad;
      list["detallepu"+index] = dvpreciounitario;
      list["detalletotal"+index] = dvtotal;
      list["detalleobs"+index] = dvobservaciones;
    }
  });

  list["total"] = $("#supTotal").html().trim();
  list["cliente"] = $(".cliente").data("id") == undefined ? "" : $(".cliente").data("id")  ;
  list["factura"] = $(".factura").val().trim();
  list["envio"] = $(".envio").val();
  list["recive"] = $(".recive").val();
  list["tipo_pago"] = $(".tipo_pago").val();
  list["documento_pago"] = $(".documento_pago").val();
  list["cantidad"] = $("[type=number].cantidad").val();
  if (list["cantidad"] == ""){
    list["cantidad"] = "0.0";
  }
  list["cambio"] = list.cantidad - list.total;
  //list["cambio"] = $(".cambio").val();
  list["banco"] = $(".banco").data("id");

  return list;
}

function ventasValidaCampos(){

  var ok = true;
  var $totalElement = $("#supTotal");
  var total = $totalElement.html();

  //productos agregados
  if (total.trim() != ""){
    total = parseFloat(total);
    if (total <= 0){
      showSplashGeneral("error", "No se detectaron productos en la venta", $totalElement.parent());
      ok = false;
    }
  } else {
    showSplashGeneral("error", "No se detectaron productos en la venta", $totalElement.parent());
    ok = false;
  }

  return ok;
}

function addVentasActualizar(){
   $(".actualizar").click(function(){
    if (ventasValidaCampos()){
      ventasActualiza();
    }
  });
}

function ventasActualiza(){
  var values = getVentasFields();
  values["id"] = $(".ventaN").data("id");
  $.ajax({
    url : ventaUpdate,
    data : values,
    dataType : "json",
    success: function(data){
      procesaAJAXQueryGeneral(data, null, limpiaVentasFields, limpiaVentasFields);
    },
    error: function(jqXHR, textStatus, errorThrown ){
      showSplashGeneral(Merror, MerrorMessage);
    }
  });
}

function addVentasAutoComplete(selector, functionSelected){
  $(selector).autocomplete({
    minLength: 1,
    source: ventaAutocomplete,
    select: function( event, ui ) {
      functionSelected(event, ui);
    }
  });
}



//ENDVENTAS//ENDVENTAS//ENDVENTAS//ENDVENTAS//ENDVENTAS//ENDVENTAS//ENDVENTAS
//ENDVENTAS//ENDVENTAS//ENDVENTAS//ENDVENTAS//ENDVENTAS//ENDVENTAS//ENDVENTAS
//ENDVENTAS//ENDVENTAS//ENDVENTAS//ENDVENTAS//ENDVENTAS//ENDVENTAS//ENDVENTAS

//CORTE//CORTE//CORTE//CORTE//CORTE//CORTE//CORTE//CORTE//CORTE//CORTE//CORTE
//CORTE//CORTE//CORTE//CORTE//CORTE//CORTE//CORTE//CORTE//CORTE//CORTE//CORTE
//CORTE//CORTE//CORTE//CORTE//CORTE//CORTE//CORTE//CORTE//CORTE//CORTE//CORTE

function regAccionesCorte(){

}

//ENDCORTE//ENDCORTE//ENDCORTE//ENDCORTE//ENDCORTE//ENDCORTE//ENDCORTE//ENDCORTE
//ENDCORTE//ENDCORTE//ENDCORTE//ENDCORTE//ENDCORTE//ENDCORTE//ENDCORTE//ENDCORTE
//ENDCORTE//ENDCORTE//ENDCORTE//ENDCORTE//ENDCORTE//ENDCORTE//ENDCORTE//ENDCORTE
//ENDCORTE//ENDCORTE//ENDCORTE//ENDCORTE//ENDCORTE//ENDCORTE//ENDCORTE//ENDCORTE


function showSplashGeneral(type,message,$element,time){

  var divAppend = "";
  if (type=="warning"){
    divAppend = '<div class="alert alert-warning';
  } else  if (type=="error"){
    divAppend = '<div class="alert alert-danger';
  } else if (type=="success"){
    divAppend = '<div class="alert alert-success';
  } else {
    divAppend = '<div class="alert alert-info';
  }
  var $divAppend = $(divAppend + ' alert-dismissible col-md-12" role="alert" style="margin-top:20px;"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+message+'</div>');

  if ($element && $element!=null){
    $element.append($divAppend);
  } else {
    $(".mainactions").append($divAppend);
  }

  if (!(time && time!=null)){
    time = 8000;
  }

  setTimeout(function(){
    $divAppend.remove();
  }, time);

}

function procesaAJAXQueryGeneral(data, callbackError, callbackWarning, callbackSuccess){
  if (data[Merror]){
    showSplashGeneral(Merror, MerrorMessage);
    if (callbackError != null)
      callbackError();
  } else if (data[Mwarning]){
    showSplashGeneral(Mwarning, MwarningMessage);
    if (callbackWarning != null)
      callbackWarning();
  } else if (data[Msuccess]){
    showSplashGeneral(Msuccess, MsuccessMessage);
    if (callbackSuccess != null)
      callbackSuccess();
  } else {
    showSplashGeneral(Merror, MerrorMessage);
  }
}

function addGeneralError($elemenmt){

  $elemenmt.addClass("has-error").addClass("has-feedback")
    .append('<span class="input-group-addon glyphicon glyphicon-remove" style="top:0px;"></span>');

  $elemenmt.find("input").focus();

  setTimeout(function(){
    $elemenmt.removeClass("has-error").removeClass("has-feedback").find(".glyphicon-remove").hide('slow', function(){
      $(this).remove();
    });
  }, 3000);

}

function floatValidatorGeneral($this){
    var valor = $this.val();
    if (parseFloat(valor)){
      return parseFloat(valor);
    } else {
      return "0"
    }
  }

function floatValidatorGeneralSpan($this){
    var valor = $this.html();
    if (parseFloat(valor)){
      return parseFloat(valor);
    } else {
      return "0"
    }
}