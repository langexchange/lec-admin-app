import { Layout, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import PageHeader from "../components/PageHeader";
import { SettingOutlined } from "@ant-design/icons";

const items2: MenuProps["items"] = [
  {
    label: "Settings",
    key: "settings",
    icon: <SettingOutlined />,
  },
];

const SettingsPage: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <Layout style={{ minHeight: "calc(100vh - 64px)" }}>
        <Sider width={250} style={{ background: "white" }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <div>this is content</div>
      </Layout>
    </Layout>
  );
};

export default SettingsPage;
