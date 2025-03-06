using { MainService } from '../routes/main';

annotate MainService.SalesOrderHeaders with @(
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

