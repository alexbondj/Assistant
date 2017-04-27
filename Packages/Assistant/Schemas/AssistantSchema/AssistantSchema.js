define("AssistantSchema", ["AssistantSchemaResources"],
    function() {
        return {
            messages: {
            },
            mixins: {
             },
            attributes: {
            },
            methods: {

                /**
                 * Initializes the schema.
                 */
                init: function() {
                    this.callParent(arguments);
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
                    "name": "assistantMainContainer",
                    "values": {
                        "id": "assistantMainContainer",
                        "selectors": {"wrapEl": "#assistantMainContainer"},
                        "itemType": Terrasoft.ViewItemType.CONTAINER,
                        "wrapClass": ["assistantMainContainer"],
                        "items": []
                    }
                }

            ]
        };
    }
);
