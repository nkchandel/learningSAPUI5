function initModel() {
	var sUrl = "/ZNKDestination/OData/services.xsodata/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}