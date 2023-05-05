import {
  Button,
  Card,
  Form,
  Input,
  Layout,
  Menu,
  MenuProps,
  Modal,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
} from "antd";
import Sider from "antd/es/layout/Sider";
import PageHeader from "../components/PageHeader";
import {
  SettingOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  useAddNewSupportedLocaleMutation,
  useCreateSettingsMutation,
  useGetAllSettingsQuery,
  useGetAllSupportedLocalesQuery,
  useUpdateSettingsMutation,
} from "../services/settingsService";
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Content } from "antd/es/layout/layout";
import TextArea from "antd/es/input/TextArea";

const items2: MenuProps["items"] = [
  {
    label: "Settings",
    key: "settings",
    icon: <SettingOutlined />,
  },
];

interface DataType {
  key: string;
  value: string;
}

const SettingsPage: React.FC = () => {
  const {
    data,
    isLoading,
    refetch: refetchSettings,
  } = useGetAllSettingsQuery({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isNewLocaleModalOpen, setIsNewLocaleModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [updateSetting, { isLoading: isUpdating }] =
    useUpdateSettingsMutation();
  const [createSetting, { isLoading: isCreating }] =
    useCreateSettingsMutation();
  const [addNewLocale, { isLoading: isAddingNewLocale }] =
    useAddNewSupportedLocaleMutation();
  const {
    data: supportedLocales,
    isLoading: isSupportedLocalesLoading,
    refetch: refetchLocales,
  } = useGetAllSupportedLocalesQuery({});
  const [form] = Form.useForm();
  const [formAdd] = Form.useForm();
  const [formNewLocale] = Form.useForm();

  const showModal = (record: any) => {
    setEditItem(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await updateSetting([values]).unwrap();
      refetchSettings();
      setIsModalOpen(false);
    } catch (error) {
      console.log("Validate Failed:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showAddModal = (record: any) => {
    setIsAddModalOpen(true);
  };

  const handleAddOk = async () => {
    try {
      const values = await formAdd.validateFields();
      formAdd.resetFields();
      await createSetting([values]).unwrap();
      refetchSettings();
      setIsAddModalOpen(false);
    } catch (error) {
      console.log("Validate Failed:", error);
    }
  };

  const handleAddCancel = () => {
    setIsAddModalOpen(false);
  };

  const showNewLocaleModal = (record: any) => {
    setIsNewLocaleModalOpen(true);
  };

  const handleNewLocaleOk = async () => {
    try {
      const values = await formNewLocale.validateFields();
      formNewLocale.resetFields();
      await addNewLocale([values.code]).unwrap();
      refetchLocales();
      setIsNewLocaleModalOpen(false);
    } catch (e) {
      console.log("Validate Failed:", e);
    }
  };

  const handleNewLocaleCancel = () => {
    setIsAddModalOpen(false);
  };

  useEffect(() => {
    console.log(data);
  }, [data, isLoading]);

  const columns: ColumnsType<DataType> = [
    {
      title: "Key",
      dataIndex: "key",
    },
    {
      title: "Value",
      dataIndex: "value",
    },
    {
      title: "Action",
      key: "action",
      align: "right",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          />
          <Button type="link" icon={<DeleteOutlined />} danger />
        </Space>
      ),
    },
  ];

  return (
    <>
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
          <Content className="px-4 py-3">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <Typography.Title level={3} className="m-0">
                Locale settings
              </Typography.Title>
              <Button type="primary" onClick={showAddModal}>
                Add new
              </Button>
            </div>
            <Card
              size="small"
              className="mb-2"
              loading={isSupportedLocalesLoading}
            >
              <div className="d-flex justify-content-between align-items-start">
                <Typography.Title level={5} className="m-0">
                  Current supported locale
                </Typography.Title>
                <Button type="primary" onClick={showNewLocaleModal}>
                  Add new
                </Button>
              </div>
              <Space>
                {supportedLocales?.map((item: any) => (
                  <Tag bordered={false} style={{ fontSize: "18px" }}>
                    {item}
                  </Tag>
                ))}
              </Space>
            </Card>
            <Spin spinning={isLoading}>
              {data &&
                data.map((item: any) => {
                  return (
                    <Table
                      columns={columns}
                      dataSource={item.settings}
                      bordered
                      title={() => item.locale}
                      key={item.locale}
                    />
                  );
                })}
            </Spin>
          </Content>
        </Layout>
      </Layout>
      <Modal
        title="Edit"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          autoComplete="off"
          form={form}
          initialValues={editItem}
          layout="vertical"
        >
          <Form.Item
            label="Key"
            name="key"
            rules={[{ required: true, message: "Please input key!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Value"
            name="value"
            rules={[{ required: true, message: "Please input value!" }]}
          >
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Add new"
        open={isAddModalOpen}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
      >
        <Form autoComplete="off" form={formAdd} layout="vertical">
          <Form.Item
            label="Locale"
            name="locale"
            rules={[{ required: true, message: "Please input locale!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Key"
            name="key"
            rules={[{ required: true, message: "Please input key!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Value"
            name="value"
            rules={[{ required: true, message: "Please input value!" }]}
          >
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Add new supported locale"
        open={isNewLocaleModalOpen}
        onOk={handleNewLocaleOk}
        onCancel={handleNewLocaleCancel}
      >
        <Form autoComplete="off" form={formNewLocale} layout="vertical">
          <Form.Item
            label="Locale code"
            name="code"
            rules={[{ required: true, message: "Please input locale code!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SettingsPage;
