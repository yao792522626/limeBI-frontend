import { genChartByAiAsyncMqUsingPOST } from '@/services/Lime/chartController';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Form, Input, message, Select, Space, Upload } from 'antd';
import React, { useState } from 'react';

import { CHART_TYPE_SELECT } from '@/constants';
import { ProForm } from '@ant-design/pro-components';
import useForm = ProForm.useForm;

const AddChartAysnc: React.FC = () => {
  const [form] = useForm();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const onFinish = async (values: any) => {
    // 避免重复提交
    if (submitting) {
      return;
    }
    // 开始提交
    setSubmitting(true);
    // console.log('Received values of form: ', values);
    // 对接后端，上传数据
    const params = {
      ...values,
      file: undefined,
    };

    // 请求接口 分析数据
    try {
      const res = await genChartByAiAsyncMqUsingPOST(params, {}, values.file.file.originFileObj);
      // 判断res是否存在
      if (!res?.data) {
        message.error('分析失败');
      } else {
        // console.log(res);
        message.success('分析成功,请稍后前往 我的图表 界面查看结果');
        form.resetFields();
      }
    } catch (e: any) {
      message.error('分析失败，' + e.message);
    }
    // 提交完成
    setSubmitting(false);
  };

  return (
    <div className="add-chart-async">
      <Card hoverable>
        <Divider style={{ fontWeight: 'bold', color: 'blue' }}>智能分析</Divider>
        <Form
          form={form}
          name="addChartAsync"
          labelAlign="left"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{}}
        >
          {/*分析需求*/}
          <Form.Item
            name="goal"
            label="分析目标"
            rules={[{ required: true, message: '请输入分析需求，以便获取更精确的结论！' }]}
          >
            <Input.TextArea placeholder="请输入你的分析需求，如分析网站用户的趋势" />
          </Form.Item>

          {/*图表名称*/}
          <Form.Item
            name="name"
            label="图表名称"
            rules={[{ required: true, message: '请输入图表名称。' }]}
          >
            <Input placeholder="请输入图表名称！" />
          </Form.Item>

          {/*图表类型*/}
          <Form.Item
            name="chartType"
            label="图表类型"
            rules={[{ required: true, message: '请选择图表类型。' }]}
          >
            <Select options={CHART_TYPE_SELECT} />
          </Form.Item>

          {/*文件上传*/}
          <Form.Item name="file" label="原始数据">
            <Upload name="file" maxCount={1} accept=".csv,.xls,.xlsx,.json,.txt,.xml,.sql">
              <Button icon={<UploadOutlined />}>上传 CSV 文件</Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>
                提交
              </Button>
              <Button htmlType="reset">重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default AddChartAysnc;
