import { getChartByIdUsingGET } from '@/services/Lime/chartController';
import { useParams } from '@@/exports';
import { Card, Col, Divider, message, Row, Spin } from 'antd';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';

const ViewChartData: React.FC = () => {
  const [chart, setChart] = useState<API.BiResponse>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [options, setOptions] = useState<any>();
  // useParams 获取id
  const params = useParams();

  // 查看图表数据
  const ViewChart = async () => {
    try {
      const res = await getChartByIdUsingGET({
        // @ts-ignore
        id: params.id,
      });
      if (!res?.data?.genChart) {
        message.error('图表不存在');
      }
      if (res.data) {
        const chartOption = JSON.parse(res.data.genChart ?? '{}');
        if (!chartOption) {
          message.error('生成图表为空');
          throw new Error('生成图标为空');
        } else {
          setChart(res.data);
          setOptions(chartOption);
          message.success('获取图表成功');
        }
      }
    } catch (e: any) {
      message.error('获取图表信息错误，' + e.message);
    }
  };
  useEffect(() => {
    ViewChart();
    console.log(params);
  }, []);

  // @ts-ignore
  return (
    <div className="view-chart">
      <Row gutter={24}>
        <Col span={12}>
          <Divider style={{ fontWeight: 'bold', color: 'blue' }}>原始数据</Divider>
          <Card>
            <div style={{ whiteSpace: 'pre-wrap', overflow: 'auto' }}>
              <p style={{ fontWeight: 'bold', color: '#0b93a1', textAlign: 'center' }}>
                {/*@ts-ignore*/}
                {chart?.chartData}
              </p>
            </div>
            <Spin spinning={submitting} />
          </Card>
        </Col>
        <Col span={12}>
          <Divider style={{ color: 'blue' }}>图表信息</Divider>
          <Card style={{ color: 'black' }}>
            <Col>分析目标：{chart?.goal}</Col>
            <Col>图表类型：{chart?.chartType}</Col>
            <Col>图表名称：{chart?.chartName}</Col>
            <Col>分析目标：{new Date(chart?.createTime).toLocaleString('zh-CN')}</Col>
            <Spin spinning={submitting} />
          </Card>
          <Divider style={{ color: 'blue' }}>可视化图表</Divider>
          <Card>
            {options ? <ReactECharts option={options} /> : <div>请先在左侧进行提交</div>}
            <Spin spinning={submitting} />
          </Card>
          <Divider style={{ color: 'blue' }}>分析结论</Divider>
          <Card>
            <div style={{ whiteSpace: 'pre-wrap', overflow: 'auto' }}>
              <p style={{ fontWeight: 'bold', color: '#0b93a1', textAlign: 'left' }}>
                {chart?.genResult ?? <div>请先在左侧进行提交</div>}
              </p>
            </div>
            <Spin spinning={submitting} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default ViewChartData;
