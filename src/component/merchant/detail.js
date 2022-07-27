import React, { useEffect, useState, useLayoutEffect, memo } from 'react';
import { GlobalOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import css from './index.module.scss';
import { getDetailReport } from '../../api/index';
import { formatMoney } from '../../utils/tools';
// import { useQuery } from 'react-query';

const Detail = memo(({show, query, hideDetail}) => {

    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dataList, setDataList] = useState([]);

    const columns = [
        {
            title: 'Transaction ID',
            dataIndex: 'transaction_id',
            width:'200px',
        },{
            title: 'Reference ID',
            dataIndex: 'reference',
            width:'200px',
            align: 'center',
        },{
            title: 'Date/Time',
            dataIndex: 'time_created_local',
            width:'200px',
            align: 'center',
        },{
            title: 'Transaction Type',
            dataIndex: 'transaction_type',
            width:'200px',
            align: 'center',
        },{
            title: 'Payment Method',
            dataIndex: 'payment_method',
            width:'200px',
            align: 'center',
        },{
            title: 'Card Number',
            dataIndex: 'buyer_id',
            width:'200px',
            align: 'center',
        },{
            title: 'Vendor Reference',
            dataIndex: 'method_trans_id',
            width:'200px',
            align: 'center',
        },{
            title: 'Gross',
            dataIndex: 'total',
            width:'200px',
            align: 'center',
        },{
            title: 'Discount',
            dataIndex: 'merchant_discount',
            width:'200px',
            align: 'center',
        },{
            title: 'Authorization',
            dataIndex: 'merchant_fixed',
            width:'200px',
            align: 'center',
        },{
            title: 'Fee',
            dataIndex: 'fee',
            width:'200px',
            align: 'center',
        },{
            title: 'Net',
            dataIndex: 'net',
            width:'200px',
            align: 'center',
        },{
            title: 'Tip',
            dataIndex: 'tip',
            width:'200px',
            align: 'center',
        },{
            title: 'Login Code',
            dataIndex: 'login_code',
            width:'200px',
            align: 'center',
        },{
            title: 'Settle time',
            dataIndex: 'time_settled',
            width:'200px',
            align: 'center',
        },{
            title: 'Store of Original Payment',
            dataIndex: 'original_merchant_name_english',
            width:'200px',
            align: 'center',
        },
    ]

    const detailProps = {
        columns,
        loading: loading,
        pagination: false,
        dataSource: detail.transactions,
        size: 'small',
        rowKey: (record, index) => index,
        scroll: {
            x:  3000
        },
    }

    useLayoutEffect(() => {
        const getDateil = async () => {
            let res = await getDetailReport(query);
            setDetail({...res.data})
        }
        if(show){
            getDateil();
        }
    }, [query, show])


    useEffect(() => {
        
        // setTimeout(setSelfShow(true),500)
    }, [])
    
    return (
        <div className={[css.DetailMain,show ? css.show : ''].join(' ')}>
            <div className={css.DetailScroll}>
                <div className={css.row}>
                    <div className={css.page_header}>
                        <GlobalOutlined /> Citcon.
                        <span className={css.date}>Date: {query?.type==='daily'? query?.date : query?.month}</span>
                    </div>
                </div>
                <div className={[css.row, css.detailInfoBox].join(' ')}>
                    <div className={css.detailInfo}>
                    From
                    {detail?.from.map((item, index)=>{
                        return (<div key={index}>
                                {index===0 ? <strong>item</strong> : item}
                            </div>)
                    })}
                    </div>
                    <div className={css.detailInfo}>
                        To
                        <div>
                            <strong>{detail?.store_name}</strong>
                        </div>
                        
                    </div>
                    <div className={css.detailInfo}>
                        {!detail?.is_isv && <strong>Status: {detail?.status}</strong>}<br/><br/>
                        <b>Transaction Period Start: </b>{detail?.settlement_begin}<br/>
                        <b>Transaction Period End: </b>{detail?.settlement_end}<br/>
                    </div>
                </div>
                <div className={css.detailTransactionTable}>
                    <Table {...detailProps}></Table>
                    <div className={css.netSum}>
                        <strong>Net of the day: {detail?.currency} {formatMoney(detail?.total_net)}</strong>
                    </div>
                    <div className={css.row}>
                        <div className={css.explain}>
                            <p>Please wait between 3-4 business days for payment to clear.Some payment methods could take a long time for payment to clear.</p>
                            <p>Transaction ID*: Transaction ID indicates Citcon ID.<br/>
                            Fee*: Service fee will be collected by Citcon later</p>
                        </div>
                    </div>
                </div>
            </div>
            <Button type="primary" size='small' danger className={css.closeDetail} shape="circle" onClick={()=>hideDetail()} icon={<CloseOutlined />} />
        </div>
    )
})

export default Detail
