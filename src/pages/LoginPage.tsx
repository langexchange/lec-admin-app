import { Button, Form, Image, Input, message, Spin } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Logo from "../assets/images/logo.png";
import { useLoginMutation } from "../services/authService";
import { useAppDispatch } from "../app/hooks";
import { setCredentials } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const credentials = await login(values).unwrap();
      console.log(credentials);
      dispatch(setCredentials(credentials));
      navigate("/settings");
      message.success("Login success", 1);
    } catch (error) {
      message.error("Login failed", 1);
    }
  };

  return (
    <div className="text-center mt-5 pt-5">
      <Image src={Logo} width={380} className="mt-5 mb-4" preview={false} />
      <Spin spinning={isLoading}>
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
      </Spin>
    </div>
  );
};

export default LoginPage;
