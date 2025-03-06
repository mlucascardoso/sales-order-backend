using { MainService } from '../routes/main';

annotate MainService.SalesOrderHeaders with @(
    Capabilities: {
        DeleteRestrictions : {
            $Type : 'Capabilities.DeleteRestrictionsType',
            Deletable: false,
        },
        FilterRestrictions : {
            $Type : 'Capabilities.FilterRestrictionsType',
            FilterExpressionRestrictions: [
                {
                    Property: createdAt,
                    AllowedExpressions: 'SingleRange'
                },
                {
                    Property: modifiedAt,
                    AllowedExpressions: 'SingleRange'
                }
            ]
        },
    },
    UI: {
        SelectionFields: [
            id,
            totalAmount,
            customer_id,
            status_id,
            createdAt,
            modifiedAt
        ],
        LineItem: [
            {
                $Type : 'UI.DataField',
                Value : id,
                ![@HTML5.CssDefaults] : {
                    $Type : 'HTML5.CssDefaultsType',
                    width : '18rem',
                }
            },
            {
                $Type : 'UI.DataField',
                Label: 'Cliente',
                Value : customer.id,
                ![@HTML5.CssDefaults] : {
                    $Type : 'HTML5.CssDefaultsType',
                    width : '18rem',
                }
            },
            {
                $Type : 'UI.DataField',
                Label: 'Status',
                Value : status.id,
                Criticality: (status.id = 'COMPLETED' ? 3 : (status.id = 'PENDING' ? 2 : 1)),
                CriticalityRepresentation: #WithoutIcon,
                ![@HTML5.CssDefaults] : {
                    $Type : 'HTML5.CssDefaultsType',
                    width : '18rem',
                }
            },
            {
                $Type : 'UI.DataField',
                Value : totalAmount,
                ![@HTML5.CssDefaults] : {
                    $Type : 'HTML5.CssDefaultsType',
                    width : '10rem',
                }
            },
            {
                $Type : 'UI.DataField',
                Value : createdAt,
                ![@HTML5.CssDefaults] : {
                    $Type : 'HTML5.CssDefaultsType',
                    width : '15rem',
                }
            },
            {
                $Type : 'UI.DataField',
                Value : createdBy,
                ![@HTML5.CssDefaults] : {
                    $Type : 'HTML5.CssDefaultsType',
                    width : '15rem',
                }
            }
        ],
        HeaderInfo: {
            $Type: 'UI.HeaderInfoType',
            TypeName: 'Pedido',
            TypeNamePlural: 'Pedidos',
            Title: {
                $Type: 'UI.DataField',
                Value: 'Pedido: {id}',
            },
        },
        Facets: [
            {
                ID: 'salesOrderData',
                $Type: 'UI.CollectionFacet',
                Label: 'Informações do Cabeçalho do Pedido',
                Facets: [
                    {
                        ID: 'header',
                        $Type: 'UI.ReferenceFacet',
                        Target : '@UI.FieldGroup#Header',
                    }
                ]
            },
            {
                ID: 'customerData',
                $Type: 'UI.ReferenceFacet',
                Label: 'Informações do Cliente',
                Target : 'customer/@UI.FieldGroup#CustomerData'
            },
            {
                ID: 'itemsData',
                $Type: 'UI.ReferenceFacet',
                Label: 'Itens do pedido',
                Target : 'items/@UI.LineItem'
            }
        ],
        FieldGroup#Header: {
            $Type : 'UI.FieldGroupType',
            Data: [
                {
                    $Type: 'UI.DataField',
                    Value: id,
                },
                {
                    $Type: 'UI.DataField',
                    Value: totalAmount,
                },
                {
                    $Type: 'UI.DataField',
                    Value: createdAt,
                },
                {
                    $Type: 'UI.DataField',
                    Value: createdBy,
                }
            ]
        },
    }
) {
    id @title: 'ID';
    totalAmount @title: 'Valor total';
    createdAt @title: 'Data de criação';
    createdBy @title: 'Criado por';
    modifiedAt @title: 'Data de atualização';
    modifiedBy @title: 'Atualizado por';
    customer @(
        title: 'Cliente',
        Common: {
            Label: 'Cliente',
            ValueList: {
                $Type: 'Common.ValueListType',
                CollectionPath: 'Customers',
                Parameters: [
                    {
                        $Type: 'Common.ValueListParameterInOut',
                        ValueListProperty: 'id',
                        LocalDataProperty: 'customer_id'
                    },
                    {
                        $Type: 'Common.ValueListParameterDisplayOnly',
                        ValueListProperty: 'firstName'
                    },
                    {
                        $Type: 'Common.ValueListParameterDisplayOnly',
                        ValueListProperty: 'lastName'
                    },
                    {
                        $Type: 'Common.ValueListParameterDisplayOnly',
                        ValueListProperty: 'email'
                    }
                ]
            },
        }
    );
    status @(
        title: 'Status',
        Common: {
            Label: 'Status',
            Text : status.description,
            TextArrangement: #TextOnly,
            ValueListWithFixedValues,
            ValueList: {
                $Type: 'Common.ValueListType',
                CollectionPath: 'SalesOrderStatuses',
                Parameters: [
                    {
                        $Type: 'Common.ValueListParameterInOut',
                        ValueListProperty: 'id',
                        LocalDataProperty: 'status_id'
                    }
                ]
            },
        }
    );
};

annotate MainService.SalesOrderStatuses with {
    id @Common.Text: description @Common.TextArrangement: #TextOnly;
};

annotate MainService.Customers with @(
    UI: {
        FieldGroup#CustomerData: {
            $Type : 'UI.FieldGroupType',
            Data: [
                {
                    $Type: 'UI.DataField',
                    Value: id,
                },
                {
                    $Type: 'UI.DataField',
                    Value: firstName,
                },
                {
                    $Type: 'UI.DataField',
                    Value: lastName,
                },
                {
                    $Type: 'UI.DataField',
                    Value: email,
                }
            ]
        },
    }
) {
    id @title: 'ID';
    firstName @title: 'Nome';
    lastName @title: 'Sobrenome';
    email @title: 'E-mail';
};

annotate MainService.SalesOrderItems with @(
    UI: {
        LineItem: [
            {
                $Type: 'UI.DataField',
                Value: id,
                ![@HTML5.CssDefaults] : {
                    $Type : 'HTML5.CssDefaultsType',
                    width : '18rem',
                }
            },
            {
                $Type: 'UI.DataField',
                Value: price,

            },
            {
                $Type: 'UI.DataField',
                Value: quantity,
            },
            {
                $Type: 'UI.DataField',
                Value: product.name,
                ![@HTML5.CssDefaults] : {
                    $Type : 'HTML5.CssDefaultsType',
                    width : '15rem',
                }
            }
        ],
    }
) {
    id @title: 'ID';
    price @title: 'Preço';
    quantity @title: 'Qtd.';
    header @UI.Hidden @UI.HiddenFilter;
    product @UI.Hidden @UI.HiddenFilter;
};

annotate MainService.Products with {
    name @title: 'Produto';
};

