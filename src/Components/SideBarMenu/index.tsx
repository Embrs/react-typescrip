import React, { useState } from 'react';
import { Menu } from 'antd';
// import { MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import pages from 'plugins/route/paths';

const { SubMenu } = Menu;

const MenuTest = () => {
  const [current, setCurrent] = useState('mail');
  return (
    <Menu onClick={() => setCurrent} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="mail">
        <div>
          {/* <MailOutlined /> */}
          <Link className="nav-link" to={pages.SignIn}>
            SignIn
          </Link>
        </div>
      </Menu.Item>
      <SubMenu
        title={(
          <span className="submenu-title-wrapper">
            {/* <SettingOutlined /> */}
            <Link
              className="nav-link dropdown-toggle"
              to={pages.Dashboard}
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dashboard
            </Link>
          </span>
        )}
      >
        <Menu.Item key="setting:1">
          <Link className="dropdown-item" to={pages.Page1}>
            Page1
          </Link>
        </Menu.Item>
        <Menu.Item key="setting:2">
          <Link className="dropdown-item" to={pages.Page2}>
            Page2
          </Link>
        </Menu.Item>
        <Menu.Item key="setting:3">
          <Link className="dropdown-item" to={pages.Page3}>
            Page3
          </Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};
export default MenuTest;
