/*global QUnit*/

sap.ui.define([
	"demo/ZNK02/controller/RootViewCust.controller"
], function (Controller) {
	"use strict";

	QUnit.module("RootViewCust Controller");

	QUnit.test("I should test the RootViewCust controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});