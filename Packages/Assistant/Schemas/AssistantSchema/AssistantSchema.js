define("AssistantSchema", ["AssistantSchemaResources"],
    function() {
        return {
            messages: {
            },
            mixins: {
             },
            attributes: {
                "ActionCollection": {
                    dataValueType: this.Terrasoft.DataValueType.COLLECTION
                },
                "ActionTabActionsMenuCollection": {
                    "dataValueType": this.Terrasoft.DataValueType.COLLECTION
                }
            },
            methods: {

                onGetItemConfig: function(itemConfig) {
                    var viewConfig = this.Terrasoft.deepClone(this.get("EmailViewConfig"));
                    itemConfig.config = viewConfig;
                },

                /**
                 * Initializes the schema.
                 */
                init: function(callback) {
                    this.initParameters();
                    this.callParent([function() {
                        Terrasoft.chain(
                            this.initActionTabActionsMenuCollection,
                            //this.initEmailProcessTag,
                            function() {
                                this.loadData();
                                callback();
                            }, this);
                    }, this]);
                },

                initActionTabActionsMenuCollection: function(callback, scope) {
                    var collection = this.get("ActionTabActionsMenuCollection") ||
                        this.Ext.create("Terrasoft.BaseViewModelCollection");
                    var refreshCaption = this.get("Resources.Strings.RefreshCaption");
                    var refreshItem = this.getButtonMenuItem({
                        "Caption": refreshCaption,
                        "Click": {bindTo: "onRefreshData"}
                    });
                    collection.addItem(refreshItem);
                    var executeLuaScriptCaption = this.get("Resources.Strings.ExecuteLuaScriptCaption");
                    var executeLuaScriptItem = this.getButtonMenuItem({
                        "Caption": executeLuaScriptCaption,
                        "Click": {bindTo: "showRunScriptWindow"},
                        "canExecute": {"bindTo": "canRunScript"},
                        "Visible": {bindTo: "isRunScriptItemVisible"}
                    });
                    collection.addItem(executeLuaScriptItem);
                    this.set("ActionTabActionsMenuCollection", collection);
                    if (!this.Ext.isEmpty(callback)) {
                        callback.call(scope || this);
                    }
                },

                ///**
                // * Add email account action handler.
                // */
                //onAddEmailAccount: function() {
                //    var modalBoxSize = {
                //        minHeight: "1",
                //        minWidth: "1",
                //        maxHeight: "100",
                //        maxWidth: "100"
                //    };
                //    var modalBoxContainer = ModalBox.show(modalBoxSize);
                //    this.sandbox.loadModule("CredentialsSyncSettingsEdit", {
                //        renderTo: modalBoxContainer,
                //        instanceConfig: {
                //            schemaName: "BaseSyncSettingsEdit",
                //            isSchemaConfigInitialized: true,
                //            useHistoryState: false
                //        }
                //    });
                //},

                initParameters: function() {
                    this.set("ActionCollection", this.Ext.create("Terrasoft.BaseViewModelCollection"));
                },

                /**
                 * Load data
                 * @protected
                 * @param {Boolean} clearCollection Clear existing emails list flag.
                 */
                loadData: function(clearCollection) {
                    var config = {
                        serviceName: "QuartzSchedulerProxyService",
                        methodName: "GetJobInfo",
                        scope: this,
                        data: {}
                    };
                    this.callService(config, this.onActionLoaded, this);
                },

                onRefreshData: function() {
                    this.loadData();
                },

                onActionLoaded: function(result) {
                    if (result.success) {
                        var dataCollection = result.collection;
                        //this.set("CanLoadMoreData", dataCollection.getCount() > 0);
                        var data = this.Ext.create("Terrasoft.BaseViewModelCollection");
                        dataCollection.each(function(item) {
                            //var model = this.onLoadEntity(item);
                            data.add(item.get("Id"), model);
                        }, this);
                        var collection = this.get("ActionCollection");
                        collection.clear();
                        collection.loadAll(data);
                    }
                    this.hideBodyMask();
                    this.set("IsDataLoaded", true);
                },

                /**
                 * Schema destroying event handler.
                 */
                onDestroyed: function() {
                }
            },
            diff: [
                {
                    "operation": "insert",
                    "name": "AssistantMainContainer",
                    "values": {
                        "id": "AssistantMainContainer",
                        "selectors": {"wrapEl": "#AssistantMainContainer"},
                        "itemType": Terrasoft.ViewItemType.CONTAINER,
                        "wrapClass": ["assistantMainContainer"],
                        "items": []
                    }
                },
                {
                    "operation": "insert",
                    "name": "AssistantTabHeader",
                    "propertyName": "items",
                    "parentName": "AssistantMainContainer",
                    "values": {
                        "itemType": Terrasoft.ViewItemType.CONTAINER,
                       // "classes": {"wrapClassName": ["emails-header-container"]},
                        "items": []
                    }
                },
                {
                    "operation": "insert",
                    "parentName": "AssistantTabHeader",
                    "propertyName": "items",
                    "name": "AssistantButton",
                    "values": {
                        "itemType": Terrasoft.ViewItemType.BUTTON,
                        "caption": "Add Action",
                        //"caption": {
                        //    "bindTo": "getMailTypeCaption"
                        //},
                        "style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
                        //"classes": {
                        //    "wrapperClass": ["email-type-button-wrapper", "left-button"],
                        //    "menuClass": ["email-type-button-menu"]
                        //},
                        "menu": {
                            "items": {"bindTo": "getAssistantMenuItems"}
                        },
                        "markerValue": "AssistantButton"
                    }
                },
                {
                    "operation": "insert",
                    "name": "AddAction",
                    "propertyName": "items",
                    "parentName": "AssistantTabHeader",
                    "values": {
                        "itemType": Terrasoft.ViewItemType.BUTTON,
                        "imageConfig": {"bindTo": "Resources.Images.AddActionImage"},
                        "style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
                        "click": {"bindTo": "addActon"}//,
                        //"classes": {wrapClassName: ["add-email-button-wrap"]}
                    }
                },
                {
                    "operation": "insert",
                    "name": "ActionTabActions",
                    "propertyName": "items",
                    "parentName": "AssistantTabHeader",
                    "values": {
                        "itemType": Terrasoft.ViewItemType.BUTTON,
                        "imageConfig": {"bindTo": "Resources.Images.ActionsButtonImage"},
                        "style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
                        //"classes": {
                        //    //wrapperClass: ["email-actions-button-wrapper", "email-tab-actions-button-wrapper"],
                        //    //menuClass: ["email-actions-button-menu"]
                        //},
                        "controlConfig": {
                            "menu": {
                                "items": {"bindTo": "ActionTabActionsMenuCollection"}
                            }
                        },
                        //"visible": {"bindTo": "IsEmailTabActionsVisible"},
                        "click": {"bindTo": "onActionsClick"},
                        "markerValue": "EmailTabActions",
                        "tips": []
                    }
                }
                ,
                //{
                //    "operation": "insert",
                //    "parentName": "EmailTabActions",
                //    "propertyName": "tips",
                //    "name": "EmailTabActionsTooltip",
                //    "values": {
                //        "content": {"bindTo": "TextEmailTabActionsTooltip"},
                //        "visible": {"bindTo": "ShowEmailTabActionsTooltip"},
                //        "linkClicked": {"bindTo": "onEmailTabActionsTooltipClick"},
                //        "items": [],
                //        "behaviour": {
                //            "displayEvent": Terrasoft.TipDisplayEvent.NONE
                //        },
                //        "restrictAlignType": Terrasoft.AlignType.BOTTOM
                //    }
                //},
                {
                    "operation": "insert",
                    "name": "ActionContainerList",
                    "propertyName": "items",
                    "parentName": "AssistantMainContainer",
                    "values": {
                        "itemType": Terrasoft.ViewItemType.CONTAINER,
                        "generator": "ContainerListGenerator.generateGrid",
                        "collection": {"bindTo": "ActionCollection"},
                        //"classes": {"wrapClassName": ["emails-container-list"]},
                        "onGetItemConfig": {"bindTo": "onGetItemConfig"},
                        "idProperty": "Id",
                        "observableRowNumber": 1,
                        "observableRowVisible": {"bindTo": "onLoadNext"},
                        //"rowCssSelector": ".email-container.selectable",
                        "getEmptyMessageConfig": {bindTo: "getEmptyMessageConfig"},
                        "items": []
                    }
                }
                //,
                //{
                //    "operation": "insert",
                //    "name": "NewButtonContainer",
                //    "propertyName": "items",
                //    "parentName": "EmailTabHeader",
                //    "values": {
                //        "itemType": Terrasoft.ViewItemType.CONTAINER,
                //        "classes": {"wrapClassName": ["email-reload-panel-button-wrapper"]},
                //        "visible": {
                //            "bindTo": "NewEmailsCounter",
                //            "bindConfig": {"converter": "getNewEmailsButtonVisible"}
                //        },
                //        "items": []
                //    }
                //},
                //{
                //    "operation": "insert",
                //    "name": "NewEmailsButton",
                //    "parentName": "NewEmailsButtonContainer",
                //    "propertyName": "items",
                //    "values": {
                //        "itemType": Terrasoft.ViewItemType.BUTTON,
                //        "imageConfig": {"bindTo": "Resources.Images.More"},
                //        "caption": {
                //            "bindTo": "NewEmailsCounter",
                //            "bindConfig": {"converter": "getNewEmailsButtonCaption"}
                //        },
                //        "style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
                //        "click": {"bindTo": "reloadEmails"},
                //        "markerValue": "LoadNewEmails",
                //        "tips": []
                //    }
                //
                //}

            ]
        };
    }
);
