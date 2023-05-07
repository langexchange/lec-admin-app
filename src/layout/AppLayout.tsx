import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Sidebar from "../components/Sidebar";

const AppLayout: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <Layout style={{ height: "calc(100vh - 64px)" }}>
        <Sidebar />
        <Content className="px-4 py-3" style={{ overflowY: "scroll" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
