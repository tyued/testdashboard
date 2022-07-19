export const defaultMerchant = {
    internal_status: {
      fd_number: '',
      jira_number: '',
      category: '',
      note: 'AAA',
    },
    account_info: {
      is_test_account: false,
      source_type: '',
      agent: '',
      cs_rep: '',
      sales_rep: '',
      sales_group: '',
      business_relationship: '',
    },
    service: {

    },
};

export const internal_status = [
    {
      id: 'category',
      label: 'Category',
      required: true,
    },
    {
      id: 'fd_number',
      label: 'FD Number',
      required: false,
    },
    {
      id: 'jira_number',
      label: 'Jira Number',
      required: false,
    },
    {
      id: 'note',
      label: 'Note',
      required: false,
    },
];

export const account_information = [
    {
        id: 'is_test_account',
        label: 'This is a test account / test merchant',
        required: false,
    },
    {
        id: 'source_type',
        label: 'Source Type',
        required: true,
    },
    {
        id: 'agent',
        label: 'Agent',
        required: true,
    },
    {
        id: 'cs_rep',
        label: 'CS Rep',
        required: true,
    },
    {
        id: 'sales_rep',
        label: 'Sales Rep',
        required: true,
    },
    {
        id: 'sales_group',
        label: 'Sales Group',
        required: true,
    },
    {
        id: 'business_relationship',
        label: 'Business Relationship',
        required: false,
    },
];

const paymentMethodInput = {
    id: 'payment_method',
    label: 'Payment Method',
    type: 'MULTI_SELECT_CONFIG',
    primaryKey: 'gateway',
    children: [
      {
        id:'ebanx',
        value: 'WeChat Pay',
        type: 'MULTI_SELECT_CONFIG',
        children:[
            {
                id:'mexico',
                value:'mexico',
                type: 'MULTI_SELECT_CONFIG',
                children:[
                    {
                        id:'oxxo',
                        value:'OXXO',
                    },{
                        id:'card',
                        value:'Card',
                    },
                ]
            },{
                id:'brazil',
                value:'brazil',
                type: 'MULTI_SELECT_CONFIG',
                children:[
                    {
                        id:'card',
                        value:'Card',
                    },
                ]
            }
        ],
        overrideConfig: true,
      },
     
      {
        id: 'gln',
        value: 'GLN',
        overrideConfig: true,
      },
    ],
};

export const service = [
    {
        id: 'dashboard_timezone',
        label: 'Dashboard Timezone',
        required: true,
    },
    paymentMethodInput
]

