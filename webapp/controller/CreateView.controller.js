sap.ui.define([
	"demo/ZNK02/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function (BaseController, JSONModel, MessageToast, MessageBox) {
	"use strict";

	return BaseController.extend("demo.ZNK02.controller.CreateView", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf demo.ZNK02.view.DetailView
		 */
		onInit: function () {
			var createModel = {
				"ID": null,
				"NAME": "",
				"DESCRIPTION": ""
			};
			var oModel = new sap.ui.model.json.JSONModel(createModel);
			this.getView().setModel(oModel, "createModel");
		},

		_onPressSave: function (oEvt) {

			var that = this;
			var oData = this.getView().getModel("createModel").getData();
			this.getOwnerComponent().getModel().create("/MY_TABLE", oData, {
				success: function () {
					var that1 = that;
					sap.m.MessageBox.show("Record Added Successfully", {
						icon: sap.m.MessageBox.Icon.SUCCESS,
						title: "Success",
						actions: sap.m.MessageBox.Action.OK,
						onClose: function (oAction) {
							var oRouter = sap.ui.core.UIComponent.getRouterFor(that1);
							oRouter.navTo("Route_MainView");
						},
						styleClass: "",
						initialFocus: null,
						textDirection: sap.ui.core.TextDirection.Inherit
					});
				},
				error: function (oError) {
					var msg = new window.DOMParser().parseFromString(oError.responseText, "text/xml").getElementsByTagName("message")[0].textContent;
					sap.m.MessageBox.show(msg, {
						icon: sap.m.MessageBox.Icon.Error,
						title: "Error",
						actions: sap.m.MessageBox.Action.OK,
						onClose: "",
						styleClass: "",
						initialFocus: null,
						textDirection: sap.ui.core.TextDirection.Inherit
					});
				}
			});

			var createModel = {
				"ID": null,
				"NAME": "",
				"DESCRIPTION": ""
			};
			var oModel = new sap.ui.model.json.JSONModel(createModel);
			this.getView().setModel(oModel, "createModel");

		},

		_onPressCancel: function (oEvt) {

			var createModel = {
				"ID": null,
				"NAME": "",
				"DESCRIPTION": ""
			};
			var oModel = new sap.ui.model.json.JSONModel(createModel);
			this.getView().setModel(oModel, "createModel");

			this.getRouter().navTo("Route_MainView");

		},
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf demo.ZNK02.view.DetailView
		 */
			onBeforeRendering: function() {
		
			},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf demo.ZNK02.view.DetailView
		 */
			onAfterRendering: function() {
		
			},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf demo.ZNK02.view.DetailView
		 */
		onExit: function () {
			//
		}

	});

});