sap.ui.define([
	"demo/ZNK02/controller/BaseController",
	"sap/ui/core/UIComponent",
	"sap/m/MessageToast"
], function (BaseController, UIComponent, MessageToast) {
	"use strict";

	return BaseController.extend("demo.ZNK02.controller.MainView", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf demo.ZNK02.view.MainView
		 */
		onInit: function () {

		},

		goToDetails: function (evt) {

			// Get Property of the Clicked Item. i.e. PO number of the item which was clicked
			var ID = evt.getSource().getBindingContext().getProperty("ID");

			// Now Get the Router Info
			var oRouter = UIComponent.getRouterFor(this);

			// Tell the Router to Navigate To Route_PODetail which is linked to V_PODetail view
			oRouter.navTo("Route_DetailView", {
				ID: ID
			});

		},

		_onPressDisplay: function (oEvt) {

			var oTable = this.getView().byId("idProductsTable");
			var oItems = oTable.getSelectedItems();
			var noOfItems = oItems.length;
			if (noOfItems === 1) {
				var ID = oItems[0].getBindingContext().getProperty("ID");
				this.getRouter().navTo("Route_DetailView", {
					ID: ID
				});
			} else if (noOfItems === 0) {
				MessageToast.show("No Items Selected. Please Select an Item");
			} else if (noOfItems > 1) {
				MessageToast.show("Multiple Items Selected. Please Select only one Item");
			}
			
			oTable.removeSelections(true);
		},

		_onPressCreate: function (oEvt) {

			this.getRouter().navTo("Route_CreateView");
		},

		_onPressDelete: function (oEvt) {
				var oTable = this.getView().byId("idProductsTable");
				var itemIndex = oTable.indexOfItem(oTable.getSelectedItem());

				var oModel = this.getView().getModel();

				if (itemIndex !== -1) {
					var oItems = oTable.getSelectedItems();
					for (var i = 0; i < oItems.length; i++) {
						var ID = oItems[i].getBindingContext().getProperty("ID");
						oModel.remove("/MY_TABLE(" + ID + ")", {
							method: "DELETE",
							success: function (data) {
								MessageToast.show("Successfully Deleted");
							},
							error: function (oError) {
								var msg = new window.DOMParser().parseFromString(oError.responseText, "text/xml").getElementsByTagName("message")[0].textContent;
								MessageToast.show(msg);
							}
						});
					}
				} else {
					MessageToast.show("No Items Selected. Please Select an Item");
				}
			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf demo.ZNK02.view.MainView
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf demo.ZNK02.view.MainView
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf demo.ZNK02.view.MainView
		 */
		//	onExit: function() {
		//
		//	}

	});

});