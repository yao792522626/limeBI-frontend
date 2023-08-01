import { CHART_TYPE_SELECT } from '@/constants';
import { genChartByAiUsingPOST } from '@/services/Lime/chartController';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Form, Input, message, Row, Select, Space, Upload } from 'antd';
import ReactECharts from 'echarts-for-react';
import React, { useState } from 'react';

const AddChart: React.FC = () => {
  const [chart, setChart] = useState<API.BiResponse>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [options, setOptions] = useState<any>();
  const onFinish = async (values: any) => {
    // 避免重复提交
    if (submitting) {
      return;
    }
    setSubmitting(true);
    setOptions(undefined);
    setChart(undefined);
    // console.log('Received values of form: ', values);
    // 对接后端，上传数据
    const params = {
      ...values,
      file: undefined,
    };

    // 请求接口 分析数据
    try {
      const res = await genChartByAiUsingPOST(params, {}, values.file.file.originFileObj);
      // 判断res是否存在
      if (!res?.data) {
        message.error('分析失败');
      } else {
        // console.log(res);
        message.success('分析成功');
        const chartOption = JSON.parse(res.data.genChart ?? '');
        if (!chartOption) {
          throw new Error('图标代码解析有误');
        } else {
          setChart(res.data);
          setOptions(chartOption);
        }
      }
    } catch (e: any) {
      message.error('分析失败，' + e.message);
    }

    setSubmitting(false);
  };

  return (
    <div className="add-chart">
      <Row gutter={24}>
        <Col span={12}>
          <Card hoverable>
            <Divider style={{ fontWeight: 'bold', color: 'blue' }}>智能分析</Divider>
            <Form
              name="adChart"
              labelAlign="left"
              labelCol={{ span: 6 }}
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

              <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={submitting}
                    disabled={submitting}
                  >
                    提交
                  </Button>
                  <Button htmlType="reset">重置</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col span={12}>
          <Card loading={submitting} hoverable>
            <Divider style={{ fontWeight: 'bold', color: 'blue' }}>可视化图表</Divider>
            {options ? (
              <ReactECharts option={options} />
            ) : (
              <div style={{ color: 'red', fontSize: 20, fontWeight: '700', textAlign: 'center' }}>
                请在左侧先进行提交
              </div>
            )}
          </Card>
          <Divider />
          <Card loading={submitting} hoverable>
            <Divider style={{ fontWeight: 'bold', color: 'blue' }}>分析结论</Divider>
            {chart?.genResult ?? (
              <div style={{ color: 'red', fontSize: 20, fontWeight: '700', textAlign: 'center' }}>
                请在左侧先进行提交
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default AddChart;
