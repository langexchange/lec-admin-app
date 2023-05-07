import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import type { MenuProps } from "antd";
import {
  SettingOutlined,
  UserOutlined,
  DashboardOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const Sidebar: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>(
    window.location.pathname.split("/")[1]
  );
  const items2: MenuProps["items"] = [
    {
      label: (
        <NavLink to="dashboard" onClick={() => setSelectedKey("dashboard")}>
          Dashboard
        </NavLink>
      ),
      key: "dashboard",
      icon: <DashboardOutlined />,
    },
    {
      label: (
        <NavLink to="admins" onClick={() => setSelectedKey("admins")}>
          Admins
        </NavLink>
      ),
      key: "admins",
      icon: <LockOutlined />,
    },
    {
      label: (
        <NavLink to="users" onClick={() => setSelectedKey("users")}>
          Users
        </NavLink>
      ),
      key: "users",
      icon: <UserOutlined />,
    },
    {
      label: (
        <NavLink to="/settings" onClick={() => setSelectedKey("settings")}>
          Settings
        </NavLink>
      ),
      key: "settings",
      icon: <SettingOutlined />,
    },
  ];

  return (
    <Sider
      width={250}
      style={{
        background: "white",
      }}
      collapsible={true}
      theme="light"
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%" }}
        items={items2}
        className="pt-3"
        selectedKeys={[selectedKey]}
      />
    </Sider>
  );
};

export default Sidebar;
