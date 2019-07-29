sap.ui.define([
	"demo/ZNK02/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function (BaseController, JSONModel, MessageToast, MessageBox) {
	"use strict";

	return BaseController.extend("demo.ZNK02.controller.DetailView", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf demo.ZNK02.view.DetailView
		 */
		onInit: function () {
			// Get the Router Info
			var oRouter = this.getRouter();
			// Validate/Match the Router Details sent from source using oRouter.navTo("Router_Detail", {SelectedItem: selectPO});
			oRouter.getRoute("Route_DetailView").attachMatched(this._onRouteFound, this);

		},
		// Custom Method to bind the elements using the Event Arguments
		_onRouteFound: function (oEvt) {
			
			var locModel = {
				"Edit": false
			};

			var oModel = new sap.ui.model.json.JSONModel(locModel);
			this.getView().setModel(oModel, "locModel");
			
			var oArgument = oEvt.getParameter("arguments");
			var oView = this.getView();
			oView.bindElement({
				path: "/MY_TABLE(" + oArgument.ID + ")"
			});
		},

		_onPressEdit: function (oEvt) {

			var tst = this.getView().getModel("locModel");
			var data = tst.getData();
			data.Edit = true;
			tst.setData(data);

		},

		_onPressSave: function (oEvt) {

			var oContext = oEvt.getSource().getBindingContext();
			var oPath = oContext.getPath();
			var oData = oContext.getModel().getProperty(oPath);
			var that = this;
			oContext.getModel().update(oPath, oData, {
				success: function () {
					var that1 = that;
					sap.m.MessageBox.show("Record Updated Successfully", {
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
				error: function () {
					MessageToast.show("Update failed", {
						duration: 1000
					});
				}
			});

			var tst = this.getView().getModel("locModel");
			var data = tst.getData();
			data.Edit = false;
			tst.setData(data);

		},

		_onPressCancel: function (oEvt) {
				var tst = this.getView().getModel("locModel");
				var data = tst.getData();
				data.Edit = false;
				tst.setData(data);
			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf demo.ZNK02.view.DetailView
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf demo.ZNK02.view.DetailView
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf demo.ZNK02.view.DetailView
		 */
		//	onExit: function() {
		//
		//	}

	});

});