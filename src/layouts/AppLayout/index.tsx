import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { useHistory } from 'react-router';

const { Header, Content } = Layout;

// TODO: move this to helper functions folder/file
// Use constants instead of static string values
const getCurrentActiveRoute = (pathname: string): string => {
  switch(pathname) {
    case '/trading':
      return '1'
    case '/deposit':
      return '2'
    case '/profile':
      return '3'
    default: 
      return ''
  }
}

// TODO: move this to some helper functions folder/file
// Use constants instead of static string values
const getPath = (key: string): string => {
  switch(key) {
    case '1':
      return '/trading'
    case '2':
      return '/deposit'
    case '3':
      return '/profile'
    default: 
      return ''
  }
}

const AppLayout: React.FC = ({ children }) => {
  const history = useHistory();
  const currentPath = history.location.pathname;
  const [current, setCurrent] = useState<string>(getCurrentActiveRoute(currentPath));
    
  return (
    <Layout>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[current]}
            selectedKeys={[current]}
            onSelect={(data) => {
              setCurrent(data.key);
              history.push(getPath(data.key));
            }}
          >
            <Menu.Item key="1">Trading</Menu.Item>
            <Menu.Item key="2">Deposit</Menu.Item>
            <Menu.Item key="3">Profile</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ margin: '16px 16px 0', paddingTop: 10, paddingBottom: 10 }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
