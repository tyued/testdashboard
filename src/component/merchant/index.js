import React, { useState, useEffect, useCallback, memo } from 'react';
import { unstable_batchedUpdates as batchedUpdates } from 'react-dom';
import { useParams } from 'react-router-dom';
import { Radio, Table, Tag } from 'antd';
import css from './index.module.scss';
import { getSummaryList, getTransactionsList } from '../../api/index';
import { formatMoney } from '../../utils/tools';
import { reject } from 'lodash';
import Detail from './detail';


const Merchant = memo((props) => {
    const { mid } = useParams()

    const DailyColumns = [
        {
            title: 'Date',
            // dataIndex: 'date_month',
            key: 'date_month',
            width:'250px',
            render: (row) => {
                return <span className='linkSpan' onClick={()=>showDetail(row)}>{row.date_month}</span>
            },
            fixed: 'left',
        },{
            title: 'Total Tranx',
            dataIndex: 'num_tran',
            width:'100px',
            align: 'center',
        },{
            title: 'Gross',
            width:'170px',
            render: ({ currency, gross }) => {
                return `${currency} ${formatMoney((gross/100).toFixed(2))}`;
            },
        },{
            title: 'Net',
            width:'170px',
            render: ({ currency, net }) => {
                return `${currency} ${formatMoney((net/100).toFixed(2))}`;
            },
        },{
            title: 'Status',
            render: ({status, settle_date}) => {
                return status==='pending' ? <Tag color="#2db7f5">ACH {status}</Tag> : <Tag color="#87d068">ACH{status} {settle_date}</Tag>
            },
            disableDependency: ['monthly'],
            width:'200px',
        },{
            title: 'Payment Methods',
            dataIndex: 'vendor',
        }
    ]

    const LookupColumns = [
        {
            title: 'Location',
            dataIndex: 'location',
            width:'150px',
        },{
            title: 'Store Name',
            dataIndex: 'store_name',
            width:'150px',
        },{
            title: 'Transaction ID',
            dataIndex: 'transaction_id',
            width:'150px',
        },{
            title: 'Parent Transaction ID',
            dataIndex: 'parent_transaction_id',
            width:'150px',
        },{
            title: 'Reference ID',
            dataIndex: 'reference',
            width:'150px',
        },{
            title: 'Date/Time',
            dataIndex: 'time_created',
            width:'380px',
        },{
            title: 'Transaction Type',
            dataIndex: 'transaction_type',
            width:'150px',
        },{
            title: 'Payment Method',
            dataIndex: 'payment_method',
            width:'150px',
        },{
            title: 'Card Number',
            dataIndex: 'buyer_id',
            width:'150px',
        },{
            title: 'Vendor Reference',
            dataIndex: 'method_trans_id',
            width:'150px',
        },{
            title: 'Total',
            width:'150px',
            render: ({ currency, total }) => {
                return `${currency} ${formatMoney((total/100).toFixed(2))}`
            }
        },{
            title: 'Action',
            width:'150px',
        },{
            title: 'Sales',
            width:'150px',
            render: ({ currency, sales }) => {
                return `${currency} ${formatMoney((sales/100).toFixed(2))}`
            }
        },{
            title: 'Tip',
            width:'150px',
            render: ({ currency, tip }) => {
                return `${currency} ${formatMoney(((tip| 0)/100).toFixed(2))}`
            }
        },{
            title: 'Login Code',
            dataIndex: 'login_code',
            width:'150px',
        },{
            title: 'Dispute Tag',
            dataIndex: 'transaction_tag',
            width:'150px',
        },{
            title: 'Transaction Tag',
            dataIndex: 'transaction_tag',
            width:'150px',
        },{
            title: 'Terminal ID',
            dataIndex: 'terminal_id',
            width:'150px',
        },{
            title: 'Store of Original Payment',
            dataIndex: 'original_merchant_name_english',
            width:'150px',
        }
    ]
    
    const [searchType, setSearchType] = useState('daily');
    const [columns, setColumns] = useState(DailyColumns);
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [detailProps,setDetailProps] = useState({show: false});

    const hideDetail = useCallback(
      () => {
        setDetailProps((prop)=>{
            // console.log({...prop,show:true})
            return {...prop, show:false}
        })
      },
      [],
    )
    
    const showDetail = (rowDetail) => {
        // console.log(rowDetail, '2223213132')
        setDetailProps((prop)=>{
            console.log({...prop,show:true})
            return {
                ...prop, 
                show:true,
                query:{
                    type: searchType==='daily' ? 'daily' : 'monthly',
                    merchantId: mid,
                    is_isv: rowDetail.is_isv ? true : false,
                    sessionId: sessionStorage.getItem('session_id'),
                    date: rowDetail.db_year_month,
                    month: rowDetail.db_year_month,
                }, 
                hideDetail
            }
        })
        console.log('显示详情')
    }

    const changeType = (e) => {
        // if(['daily','monthly'].includes(e.target.value)) {
            setSearchType(e.target.value);
        // }
    }

    const getSummary  = async () => {
        setLoading(true);
        let params = {
            date_month: '',
            hierarchy_user_id: sessionStorage.getItem('curHierarchyId'),
            merchantId: mid,
            page_number: 0,
            row_count: 10,
            search_type: searchType,
            session_id: sessionStorage.getItem('session_id'),
        }
        let res = await getSummaryList(params);
        batchedUpdates(async ()=>{
            setDataList(res.data.transactions);
            setColumns(DailyColumns);
            setLoading(false);
        })
    }

    const getTransactions = async () => {
        setLoading(true);
        let params = {
            startDate: "",
            endDate: "",
            hierarchy: sessionStorage.getItem('hierarchyId'),
            merchantId: mid,
            pageNumber: 0,
            rowCount: 10,
            searchKey: "",
            selectedMid: sessionStorage.getItem('curHierarchyId'),
            sessionId: sessionStorage.getItem('session_id'),
        }
        let res = await getTransactionsList(params);
        batchedUpdates(async ()=>{
            setDataList(res.data.transactions);
            setColumns(LookupColumns);
            setLoading(false);
        })
    }

    const tableProps = {
        columns: reject(columns, (o) => {
            return o.disableDependency?.includes(searchType)
        }),
        loading: loading,
        dataSource: dataList,
        size: 'small',
        rowKey: (record) => {
            return record.date_month || record.transaction_id;
        },
        scroll: {
            x: searchType==='lookup'? 3000 : 1500,
        },
    }

    

    useEffect(() => {
        if(['daily','monthly'].includes(searchType)) {
            getSummary();
        } else if(['lookup'].includes(searchType)) {
            getTransactions();
        }
        
    }, [mid, searchType])
    
    
    return (
        <div className={css.posMain}>
            <div className={css.merchantMain}>
                <Radio.Group className={css.TabGroup} value={searchType} onChange={(e)=>changeType(e)} buttonStyle="solid">
                    <Radio.Button key={'daily'} value="daily">Daily Summary</Radio.Button>
                    <Radio.Button key={'monthly'} value="monthly">Monthly Summary</Radio.Button>
                    <Radio.Button key={'lookup'} value="lookup">Transaction Lookup</Radio.Button>
                    <Radio.Button key={'daily_settle'} value="daily_settle">Daily Settle Summary</Radio.Button>
                    <Radio.Button key={'daily_dispute'} value="daily_dispute">Dispute Summary</Radio.Button>
                </Radio.Group>
                <div className={css.summaryTable}>
                    <div className={css.summaryTitle}>{searchType} summary</div>
                <Table {...tableProps} />
                </div>
            </div>

            <Detail {...detailProps}></Detail>

        </div>
    )
})

export default Merchant;
