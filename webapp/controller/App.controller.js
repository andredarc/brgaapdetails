sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("brgaapdetails.controller.App", {
           
            onInit: function () {
                   
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("details").attachMatched(this._onRouteMatched, this);
            },
            _onRouteMatched: function (oEvent) {
               
                var oArgs,oView;
                oArgs = oEvent.getParameter("arguments");
                oView = this.getView();

                oView.bindElement({
                    path: "/Details(" + oArgs.detailsId + ")",
                    events : {
                        change: this._onBindingChange.bind(this),
                        dataRequested: function (oEvent) {
                            oView.setBusy(true);
                        },
                        dataReceived: function (oEvent) {
                            oView.setBusy(false);
                        }
                    }
                });
                
            },

                    onSearch: function (oEvt) {
                        // add filter para pesquisa
                        var aFilters = [];
                        var sQuery = oEvt.getSource().getValue();
                        if (sQuery && sQuery.length > 0) {
                            var filter = new sap.ui.model.Filter("title", sap.ui.model.FilterOperator.Contains, sQuery);
                            aFilters.push(filter);
                        }
                        // update lista
                        var list = this.byId("invoiceList");
                        var binding = list.getBinding("items");
                        binding.filter(aFilters, "Application");
                    },
                    onUpdateStarted: function (oEvt) {
                        // show busy indicator
                        sap.ui.core.BusyIndicator.show();
                    },

                  
                   

                    onListItemPressed : function(oEvent){
                        var oItem, oCtx;
                        oItem = oEvent.getSource();
                        oCtx = oItem.getBindingContext();
                        this.getRouter().navTo("details",{
                            employeeId : oCtx.getProperty("detailsId")
                        });
                    }
                });
               

            
        
    });

   