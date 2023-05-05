import Logo from "../assets/images/logo.png";
import {
  Avatar,
  Button,
  Dropdown,
  Image,
  Layout,
  MenuProps,
  Space,
} from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
const { Header } = Layout;

const PageHeader: React.FC = () => {
  const handleMenuClick: MenuProps["onClick"] = (e) => {};

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
      className="d-flex justify-content-between align-items-center px-4"
      style={{ background: "white" }}
    >
      <img src={Logo} height={32} className="" />
      <Dropdown
        menu={menuDropdown}
        trigger={["click"]}
        arrow
        placement="bottom"
      >
        <Button
          type="text"
          className="d-flex align-items-center px-4"
          size="large"
        >
          <Avatar icon={<UserOutlined />} />
        </Button>
      </Dropdown>
    </Header>
  );
};

export default PageHeader;
