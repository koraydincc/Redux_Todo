import React from 'react';
import TodoForm from '../components/TodoForm';
import { Layout } from 'antd';
import TodoList from '../components/TodoList';
import TodoFooter from '../components/TodoFooter';

const { Header, Footer,  Content } = Layout;

const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#fff',
  };
  const contentStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around', // içeriği yatayda ortala
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: 'black',
    backgroundColor: '#fff',
    
  };

  const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#fff',


  };
  const layoutStyle = {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    width: 'calc(50% - 8px)',
    maxWidth: 'calc(50% - 8px)',
    gap: '10px',
    backgroundColor:'#fff',
    borderLeft: '1px solid #ccc', 
    borderRight: '1px solid #ccc'
    

  };

function Main() {
  return (
    <Layout  style={layoutStyle}>
        <Header style={headerStyle}><TodoForm/></Header>
        <Content style={contentStyle}><TodoList/></Content>
        <Footer style={footerStyle}><TodoFooter/></Footer>
    </Layout>
  );
}

export default Main;
