import {
  Avatar,
  Button,
  message,
  Popconfirm,
  Space,
  Table,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../services/userService";
import { DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

interface Lanugage {
  id: string;
  level: number;
  localeCode: string;
  name: string;
}

interface DataType {
  avatar: string;
  country: string;
  firstName: string;
  lastName: string;
  middleName: string;
  numOfPartners: number;
  numOfPosts: number;
  nativeLanguage: Lanugage;
  targetLanguages: Lanugage[];
}

const UsersPage: React.FC = () => {
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const { data, isLoading, isFetching } = useGetAllUsersQuery(
    {
      page: tableParams.pagination?.current || 1,
      perPage: tableParams.pagination?.pageSize || 10,
    },
    {}
  );

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  useEffect(() => {
    if (data) {
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: data.total,
        },
      });
    }
  }, [data, isLoading]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTableParams({
      pagination,
    });

    // // `dataSource` is useless since `pageSize` changed
    // if (pagination.pageSize !== tableParams.pagination?.pageSize) {
    //   setData([]);
    // }
  };

  const confirm = async (record: any) => {
    try {
      // await deleteUser()
    } catch (error) {
      message.error("Error deleting user", 1);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "User",
      dataIndex: "user",
      render: (_, record) => (
        <Space>
          <Avatar src={record.avatar} />
          <span>{record.firstName + " " + record.lastName}</span>
        </Space>
      ),
    },
    {
      title: "Country",
      dataIndex: "country",
    },
    {
      title: "Partners",
      dataIndex: "numOfPartners",
    },
    {
      title: "Posts",
      dataIndex: "numOfPosts",
    },
    {
      title: "Native language",
      dataIndex: "native",
      render: (_, record) => record.nativeLanguage.name,
    },
    {
      title: "Target languages",
      dataIndex: "target",
      render: (_, record) =>
        record.targetLanguages.map((item: any) => item.name).join(", "),
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
            onConfirm={(e) => confirm(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <Typography.Title level={4} className="m-0">
          Users management
        </Typography.Title>
      </div>
      <Table
        columns={columns}
        dataSource={data?.items}
        bordered
        pagination={tableParams.pagination}
        loading={isLoading || isFetching}
        onChange={handleTableChange}
      />
    </>
  );
};

export default UsersPage;
