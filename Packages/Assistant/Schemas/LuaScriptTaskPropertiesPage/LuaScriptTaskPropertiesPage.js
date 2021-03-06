/**
 * ScriptTask edit page schema.
 * Parent: BaseProcessSchemaElementPropertiesPage
 */
define("LuaScriptTaskPropertiesPage", ["terrasoft", "SourceCodeEdit"],
	function(Terrasoft) {
		return {
			messages: {
				/**
				 * @message GetValue
				 * Receive source code edit value.
				 */
				"GetValue": {
					"direction": Terrasoft.MessageDirectionType.PUBLISH,
					"mode": Terrasoft.MessageMode.PTP
				},

				/**
				 * @message GetSourceCodeData
				 * Returns source code edit data. Such as source code value, caption, language etc. For more
				 * information see GetSourceCodeData message in SourceCodeEditPage schema.
				 */
				"GetSourceCodeData": {
					"direction": Terrasoft.MessageDirectionType.SUBSCRIBE,
					"mode": Terrasoft.MessageMode.PTP
				},

				/**
				 * @message SourceCodeChanged
				 * Receive current source code edit value.
				 */
				"SourceCodeChanged": {
					"direction": Terrasoft.MessageDirectionType.SUBSCRIBE,
					"mode": Terrasoft.MessageMode.PTP
				}
			},
			attributes: {
				/**
				 * Body of ScriptTask element.
				 */
				"Body": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					isRequired: true,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Flag that indicates whether source code edit page loaded.
				 */
				"SourceCodeEditPageLoaded": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: false
				}
			},
			modules: {
				"SctiptTaskBody": {
					"config": {
						"schemaName": "LuaSourceCodeEditPage",
						"isSchemaConfigInitialized": true,
						"useHistoryState": false,
						"showMask": true,
						"autoGeneratedContainerSuffix": "-script-task-body",
						"parameters": {
							"viewModelConfig": {
								"Tag": "Body",
								"TooltipMessage": "UseFlowEngineBodyHint"
							}
						}
					}
				}
			},
			methods: {
				/**
				 * @inheritdoc ProcessSchemaElementEditable#onElementDataLoad
				 * @overridden
				 */
				onElementDataLoad: function(scriptTask, callback, scope) {
					this.callParent([scriptTask, function() {
						var parameter = this.getBodyParameter(scriptTask);
						var value = parameter.getValue();
						value = value ? value.replace(/"/g, "") : value;
						try	{
							if (value) {
								value = window.atob(value);
								this.set("Body", value);
							} else {
								this.setBodyDefValue();
							}
						} catch (e) {
							this.error(e);
						}
						this.initMessages();
						callback.call(scope);
					}, this]);
				},

				/**
				 * Subscribes to SourceCodeEditPage schema messages.
				 * @protected
				 * @virtual
				 */
				initMessages: function() {
					Terrasoft.each(this.modules, this.subscribeModuleEvents, this);
				},

				/**
				 * Subscribes for module events.
				 * @protected
				 * @param {Object} moduleConfig Module configuration.
				 * @param {String} moduleName Module name.
				 */
				subscribeModuleEvents: function(moduleConfig, moduleName) {
					var moduleId = this.getModuleId(moduleName);
					this.sandbox.subscribe("GetSourceCodeData", this.onGetSourceCodeData, this, [moduleId]);
					this.sandbox.subscribe("SourceCodeChanged", this.onSourceCodeChanged, this, [moduleId]);
				},

				/**
				 * GetSourceCodeData message handler. Returns source code data.
				 * @protected
				 * @virtual
				 * @return {Object} Source code edit data.
				 * @return {String} return.sourceCode Source code value.
				 * @return {String} return.dataItemMarker Source code edit marker value.
				 * @return {String} return.name Source code edit name.
				 * @return {String} return.caption Source code edit caption to display in expand mode.
				 * @return {String} return.language Source code edit language.
				 */
				onGetSourceCodeData: function() {
					this.set("SourceCodeEditPageLoaded", true);
					var scriptTask = this.get("ProcessElement");
					return {
						sourceCode: this.get("Body"),
						dataItemMarker: "ScriptTaskBody",
						name: scriptTask.name,
						caption: this.get("caption"),
						language: "lua"
					};
				},

				/**
				 * SourceCodeChanged message handler. Sets Body attribute value.
				 * @param {Object} data Current source code value.
				 * @param {String} data.tag Source code edit page tag.
				 * @param {String} data.sourceCode Source code value.
				 */
				onSourceCodeChanged: function(data) {
					this.set(data.tag, data.sourceCode);
				},

				/**
				 * Get source code edit value by publishing GetValue message. Value sets to Body attribute.
				 * @private
				 */
				getSourceCodeEditValue: function() {
					if (!this.get("SourceCodeEditPageLoaded")) {
						return;
					}
					Terrasoft.each(this.modules, function(moduleConfig, moduleName) {
						var moduleId = this.getModuleId(moduleName);
						var sandbox = this.sandbox;
						var sourceCodeData = sandbox.publish("GetValue", null, [moduleId]);
						this.set(sourceCodeData.tag, sourceCodeData.value);
					}, this);
				},

				/**
				 * Sets default value to 'Body' attribute.
				 * @private
				 */
				setBodyDefValue: function() {
					var body = this.get("Body");
					if (!this.Ext.isEmpty(body)) {
						return;
					}
					this.set("Body", "return true");
				},

				/**
				 * @inheritdoc BaseProcessSchemaElementPropertiesPage#saveValues
				 * @overridden
				 */
				saveValues: function() {
					this.callParent(arguments);
					var scriptTask = this.get("ProcessElement");
					this.getSourceCodeEditValue();
					this.setBodyDefValue();
					this.saveBody(scriptTask);
				},
				getBodyParameter: function(element) {
					return element.findParameterByName("Script");
				},
				saveBody: function(element) {
					var parameter = this.getBodyParameter(element);
					var script = this.get("Body");
					var sourceValue = {};
					if (script) {
						script = "\"" + window.btoa(script) + "\"";
						sourceValue = {
							value: script,
							source: Terrasoft.ProcessSchemaParameterValueSource.Script
						};
					}
					parameter.setMappingValue(sourceValue);
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "SctiptTaskBody",
					"parentName": "EditorsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.MODULE,
						"classes": {
							"wrapClassName": "script-task-body-container"
						},
						"controlConfig": {
							"styles": {
								"wrapStyles": {
									"height": "100%"
								}
							}
						},
						"items": []
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});
