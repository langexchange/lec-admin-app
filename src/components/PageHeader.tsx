import Logo from "../assets/images/logo.png";
import {
  Avatar,
  Button,
  Dropdown,
  Image,
  Input,
  Layout,
  MenuProps,
  Space,
  Typography,
} from "antd";
import {
  LogoutOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout, selectCredentials } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
const { Header } = Layout;

const PageHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const credentials = useAppSelector(selectCredentials);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      dispatch(logout());
      navigate("/login");
    }
  };

  const dropdownItems: MenuProps["items"] = [
    {
      label: "Logout",
      key: "logout",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  const menuDropdown = {
    items: dropdownItems,
    onClick: handleMenuClick,
  };

  return (
    <Header
      className="d-flex justify-content-between align-items-center px-4 position-sticky top-0"
      style={{
        background: "white",
        zIndex: 10,
        boxShadow:
          "0 1px 2px 0 rgba(1, 1, 1, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
      }}
    >
      <div className="d-flex align-items-center justify-content-start">
        <div
          style={{ minWidth: "226px" }}
          className="d-flex align-items-center"
        >
          <img src={Logo} height={28} className="" />
        </div>
        <Input
          placeholder="Type to search..."
          prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
          bordered={false}
          width={300}
          size="large"
          style={{
            borderLeft: "1px solid rgba(0, 0, 0, 0.06)",
            borderRadius: 0,
          }}
        />
      </div>
      <div className="d-flex align-items-center justify-content-end gap-2">
        <Typography.Title level={5} className="m-0">
          {credentials?.firstName + " " + credentials?.remainName}
        </Typography.Title>
        <Dropdown
          menu={menuDropdown}
          trigger={["click"]}
          placement="bottomLeft"
        >
          <Button
            type="text"
            className="d-flex align-items-center justify-content-center"
            size="large"
            shape="circle"
          >
            <Avatar icon={<UserOutlined />} />
          </Button>
        </Dropdown>
      </div>
    </Header>
  );
};

export default PageHeader;
