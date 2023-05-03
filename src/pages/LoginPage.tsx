import { Button, Form, Image, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Logo from "../assets/images/logo.png";

const LoginPage: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="text-center mt-5 pt-5">
      <Image src={Logo} width={380} className="mt-5 mb-3" />
      <Form
        name="login"
        className="mx-auto"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ maxWidth: "380px" }}
        size="large"
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="px-5">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
