import React, { useState } from 'react';
import { PageHeader, Table, Button, Divider, Select, Modal, Form, Input, FormInstance, Statistic, Row, Col } from 'antd';
import { useGetDepositsQuery, useMakeDepositMutation } from '../../services/transactions';
import { useGetBalancesQuery } from '../../services/balances';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const columns = [
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
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
];

const Deposit: React.FC = (): JSX.Element => {
  const formRef = React.createRef<FormInstance>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { data: balances, refetch: balancesRefetch } = useGetBalancesQuery();
  const { data: deposits, refetch: depositsRefetch } = useGetDepositsQuery();
  const [makeDeposit, { isLoading: makingDeposit  } ] = useMakeDepositMutation();

  const deposit = async () => {
    await makeDeposit({
      ...formRef.current?.getFieldsValue()
    }).then(() => {
      depositsRefetch();
      balancesRefetch();
    });

    if (formRef.current) {
      formRef.current.resetFields();
    }
    
    setModalVisible(false);
  }

  return (
    <div>
      <PageHeader  title="Deposit" subTitle="Default price for all tokens is: $450 - Demo convenience" />

      <Divider />

      <Row gutter={16}>
        {balances && balances.map(balance => {
          return (
            <Col span={6} key={balance.id}>
              <Statistic title={balance.token} value={balance.balance - balance.blockedBalance} suffix={`/ $${(balance.balance - balance.blockedBalance) * 450}`} />
            </Col>
          )
        })}
      </Row>

      <Divider />

      <Button type="primary" size={'middle'} onClick={() => { setModalVisible(true) }}>
        Deposit
      </Button>

      <Divider plain />
      <Table dataSource={deposits} columns={columns} />

      <Modal
        title="Make Deposit"
        visible={modalVisible}
        confirmLoading={makingDeposit}
        onOk={deposit}
        onCancel={() => { 
          formRef.current!.resetFields();
          setModalVisible(false)
        }}
      >
        <Form {...layout} ref={formRef} name="control-ref">
          <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
            <Input placeholder='Enter Amount' type='number' />
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

export default Deposit;
