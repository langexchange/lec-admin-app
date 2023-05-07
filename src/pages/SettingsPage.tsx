import {
  Button,
  Card,
  Dropdown,
  Form,
  Input,
  Modal,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
} from "antd";
import { EditOutlined, DeleteOutlined, DownOutlined } from "@ant-design/icons";
import {
  useAddNewSupportedLocaleMutation,
  useCreateSettingsMutation,
  useGetAllSettingsQuery,
  useGetAllSupportedLocalesQuery,
  useUpdateSettingsMutation,
} from "../services/settingsService";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import TextArea from "antd/es/input/TextArea";
import type { MenuProps } from "antd";

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

  const showAddModal = () => {
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

  const showNewLocaleModal = () => {
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
    setIsNewLocaleModalOpen(false);
  };

  const items: MenuProps["items"] = [
    {
      label: "Add new locale item",
      key: "1",
    },
    {
      label: "Add new supported locale",
      key: "2",
    },
  ];

  const handleMenuClick = (e: any) => {
    if (e.key === "1") {
      showAddModal();
    }
    if (e.key === "2") {
      showNewLocaleModal();
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

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
      <div className="d-flex align-items-center justify-content-between mb-3">
        <Typography.Title level={4} className="m-0">
          Locale settings
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
      <Card size="small" className="mb-2" loading={isSupportedLocalesLoading}>
        <Typography.Title level={5} className="m-0 mb-3">
          Currently supported locales
        </Typography.Title>
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
                title={() => (
                  <span style={{ fontWeight: 700 }}>{item.locale}</span>
                )}
                key={item.locale}
              />
            );
          })}
      </Spin>
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
