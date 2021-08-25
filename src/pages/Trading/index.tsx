import React, { useState } from 'react';
import { PageHeader, Table, Button, Divider, Select, Modal, Form, Input, FormInstance, Radio, Popconfirm, Alert } from 'antd';
import { useGetOrdersQuery, usePlaceOrderMutation, useCancelOrderMutation } from '../../services/orders';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const columns = ({
  onCancel
}: {
  onCancel: Function
}) => ([
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Token',
    dataIndex: 'token',
    key: 'token',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Side',
    dataIndex: 'orderType',
    key: 'orderType',
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    render: (_: any, record: { key: React.Key, id: number, status: string }) => record.status === 'PENDING' ?
      <Popconfirm title="Sure to delete?" onConfirm={() => onCancel(record.id)}>
        <a>Cancel Order</a>
      </Popconfirm> : null
  },
]);

const Trading: React.FC = (): JSX.Element => {
  const formRef = React.createRef<FormInstance>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { data: orders, refetch: ordersRefetch } = useGetOrdersQuery();
  const [placeOrderAync, { isLoading: orderPlacing,  } ] = usePlaceOrderMutation();
  const [cancelOrderAsync ] = useCancelOrderMutation();

  // Generates random price - only for testing
  const randomPrice = (Math.random() * 1000).toFixed(2);

  const placeOrder = async () => {
    await placeOrderAync({
      ...formRef.current?.getFieldsValue(),
      price: randomPrice,
      orderType: formRef.current?.getFieldsValue().orderType || 'BUY'
    }).then(() => {
      ordersRefetch();
    });

    setModalVisible(false);
  }

  return (
    <div>
      <PageHeader  title="Trading" subTitle="Price for buying or selling tokens is generated randomly when Buy/Sell modal has been opened - ONLY for demo, realtime prices integration is not required" />
      
      <Alert message="Orders will be updated by CRON job in background on backend project every minute, all orders will be converted to COMPLETED status. - DEMO CONVENIENCE" type="success" />

      <Divider />

      <Button type="primary" size={'middle'} onClick={() => { setModalVisible(true) }}>
        Place Order
      </Button>

      <Divider plain />
      <Table dataSource={orders as any} columns={columns({
        onCancel: async (id: number) => {
          await cancelOrderAsync(id);
          ordersRefetch();
        }
      })} />

      <Modal
        title="Place Order"
        visible={modalVisible}
        confirmLoading={orderPlacing}
        onOk={placeOrder}
        onCancel={() => { 
          formRef.current!.resetFields();
          setModalVisible(false)
        }}
      >
        <Form {...layout} ref={formRef} name="control-ref">
          <Form.Item name="orderType" label="Order Type">
            <Radio.Group defaultValue='BUY'>
              <Radio.Button value="BUY">BUY</Radio.Button>
              <Radio.Button value="SELL">SELL</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
            <Input placeholder='Enter Amount' type='number' />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input placeholder='Price' value={randomPrice} defaultValue={randomPrice} disabled />
          </Form.Item>
          <Form.Item name="token" label="Token" rules={[{ required: true }]}>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a Token"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              defaultActiveFirstOption={true}
            >
              <Option value="ETH">ETH</Option>
              <Option value="USDT">USDT</Option>
              <Option value="DVF">DVF</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Trading;
