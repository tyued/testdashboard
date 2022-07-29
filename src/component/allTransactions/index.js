import React, { memo, useState, createRef, useEffect,useCallback } from 'react';
import { Form, Input, Table, DatePicker, Button } from 'antd';
import moment from 'moment';
import css from './index.module.scss';
import { getAllTransactionsList } from '../../api';
import { useDebounce, formatMoney } from '../../utils/tools';

const { RangePicker } = DatePicker;

const AllTransactions = memo(() => {
    const form = createRef();
    const [query, setQuery] = useState({
        sessionId: sessionStorage.getItem('session_id'),
        pageNumber: 0,
        rowCount: 10,
        download: false,
    });

    const [dataList, setDataList] = useState([]);

    const columns = [
        {
            title: 'Location',
            dataIndex: 'location',
            width:'150px',
            align: 'center',
        },{
            title: 'Store Name',
            dataIndex: 'store_name',
            width:'150px',
            align: 'center',
        },{
            title: 'Transaction ID',
            dataIndex: 'transaction_id',
            width:'150px',
            align: 'center',
        },{
            title: 'Parent Transaction ID',
            render:({parent_transaction_id})=>(parent_transaction_id || ''),
            width:'150px',
            align: 'center',
        },{
            title: 'Reference',
            dataIndex: 'reference',
            width:'150px',
            align: 'center',
        },{
            title: 'Date/Time',
            dataIndex: 'time_created',
            width:'150px',
            align: 'center',
        },{
            title: 'Transaction Type',
            render:({transaction_type})=>{
                return transaction_type==='pos_payment' ? 'charge' : (transaction_type==='pos_refund' ? 'refund' : transaction_type)
            },
            width:'150px',
            align: 'center',
        },{
            title: 'Payment Method',
            render:({payment_method})=>{
                return payment_method==='wechatpay' ? 'WXP' : (payment_method==='alipay' ? 'ALP' : payment_method)
            },
            width:'150px',
            align: 'center',
        },{
            title: 'Card Number',
            dataIndex: 'buyer_id',
            width:'150px',
            align: 'center',
        },{
            title: 'Vendor Reference',
            dataIndex: 'method_trans_id',
            width:'150px',
            align: 'center',
        },{
            title: 'Total',
            render:({currency, total})=>(
                total===0 ? 'NA' : new Intl.NumberFormat('en-US',{ 
                style: 'currency', 
                currency: currency 
            }).format(total)),
            width:'150px',
            align: 'center',
        },{
            title: 'Sales',
            render:({currency, sales})=>(new Intl.NumberFormat('en-US',{
                style: 'currency', 
                currency: currency 
            }).format(sales)),
            width:'150px',
            align: 'center',
        },{
            title: 'Tip',
            render:({currency, tip})=>(new Intl.NumberFormat('en-US',{
                style: 'currency', 
                currency: currency 
            }).format(tip)),
            width:'150px',
            align: 'center',
        },{
            title: 'Login Code',
            dataIndex: 'login_code',
            width:'150px',
            align: 'center',
        },{
            title: 'Transaction Tag',
            dataIndex: 'transaction_tag',
            width:'150px',
            align: 'center',
        },{
            title: 'Terminal ID',
            dataIndex: 'terminal_id',
            width:'150px',
            align: 'center',
        },{
            title: 'Store of Original Payment',
            dataIndex: 'original_merchant_name_english',
            width:'150px',
            align: 'center',
        }
    ];

    const getAllTransactions = useCallback(
        async (curFormVal) => {
            console.log('BBBB')
            console.log(curFormVal)
            let formVal = {
                startDate: curFormVal.dateRange ? curFormVal.dateRange[0].format('YYYY-MM-DD') : '',
                endDate: curFormVal.dateRange ? curFormVal.dateRange[1].format('YYYY-MM-DD') : '',
                searchKey: curFormVal.searchKey,
            }
            let { data } = await getAllTransactionsList({...query,...formVal});

            setDataList(data.totalRecords>0 ? data.transactions : [])
            // console.log(res, 'allTransaction Res')
        },
        [query],
    )
     

    const changeForm = useDebounce((itemVal, formVal) => {
        getAllTransactions(formVal)
    },500)

    const tableProps = {
        columns:columns,
        dataSource: dataList,
        size: 'small',
        rowKey: (record) => {
            return record.transaction_id;
        },
        scroll: {
            x: 3000,
        },
    }

    useEffect(() => {
        console.log('AAAA')
        getAllTransactions(form.current.getFieldsValue(true))
    }, [])
    
    return (
        <div className={css.posMain}>
            <div className={css.summaryTable}>
                <div >
                    <Form
                        ref={form}
                        name='form'
                        className={css.searchMain}
                        onValuesChange={changeForm}
                        initialValues={{
                            dateRange: [moment().subtract(6, 'months'), moment()],
                            searchKey: '',
                        }}
                    >
                        <Form.Item
                            label='Filter by date'
                            name='dateRange'
                            className={css.condition}
                        >
                            <RangePicker />
                        </Form.Item>
                        <Form.Item
                            label='Search'
                            name='searchKey'
                            className={css.condition}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </div>
                <Table {...tableProps} />
            </div>
        </div>
    )
})

export default AllTransactions;