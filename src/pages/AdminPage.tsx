import {
  Button,
  Dropdown,
  Form,
  Input,
  MenuProps,
  message,
  Modal,
  Popconfirm,
  Space,
  Switch,
  Table,
  Tag,
  Typography,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import {
  AdminAccount,
  useDeleteAdminAccountMutation,
  useGetAdminsQuery,
  useRegisterMutation,
} from "../services/authService";
import { DeleteOutlined, DownOutlined } from "@ant-design/icons";

const AdminPage: React.FC = () => {
  const { data, isLoading, refetch } = useGetAdminsQuery(undefined, {});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [createAccount, { isLoading: _isCreating }] = useRegisterMutation();
  const [deleteAccount, { isLoading: _isDeleting }] =
    useDeleteAdminAccountMutation();

  useEffect(() => {
    console.log(data);
  }, [data, isLoading]);

  const confirm = async (id: string) => {
    try {
      await deleteAccount(id).unwrap();
      refetch();
    } catch (error) {
      message.error("Error deleting account", 1);
    }
  };

  const columns: ColumnsType<AdminAccount> = [
    {
      title: "Firstname",
      dataIndex: "firstName",
    },
    {
      title: "Lastname",
      dataIndex: "remainName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Supper admin",
      dataIndex: "isSupperAdmin",
      render: (_, record) => (
        <Tag color={record.isSupperAdmin ? "green" : "red"}>
          {record.isSupperAdmin ? "Yes" : "No"}
        </Tag>
      ),
    },
    {
      title: "Update at",
      dataIndex: "updatedAt",
      render: (_, record) => new Date(record.updatedAt).toLocaleString(),
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      render: (_, record) => new Date(record.createdAt).toLocaleString(),
    },
    {
      title: "Action",
      key: "action",
      align: "right",
      render: (_, record) => (
        <Space size="small">
          <Popconfirm
            title="Delete user"
            description="Are you sure to delete?"
            onConfirm={(_e) => confirm(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      form.resetFields();
      await createAccount(values).unwrap();
      refetch();
      setIsModalOpen(false);
    } catch (error) {
      console.log("Validate Failed:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items: MenuProps["items"] = [
    {
      label: "Create new admin account",
      key: "1",
    },
  ];

  const handleMenuClick = (e: any) => {
    if (e.key === "1") {
      showModal();
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <Typography.Title level={4} className="m-0">
          Admin accounts management
        </Typography.Title>
        <Dropdown menu={menuProps}>
          <Button type="primary">
            <Space>
              Action
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
      <Table columns={columns} dataSource={data} bordered loading={isLoading} />
      <Modal
        title="Create new admin account"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form autoComplete="off" form={form} layout="vertical">
          <Form.Item
            label="Is supper admin"
            valuePropName="isSupperAdmin"
            name="isSupperAdmin"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="Firstname"
            name="firstName"
            rules={[{ required: true, message: "Please input Firstname!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Lastname"
            name="remainName"
            rules={[{ required: true, message: "Please input Lastname!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input password!" }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminPage;
