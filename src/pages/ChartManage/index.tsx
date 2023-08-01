import { listMyChartByPageUsingPOST } from '@/services/Lime/chartController';
import { useModel } from '@@/exports';
import { Avatar, Card, Divider, List, message } from 'antd';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';

const ChartManage: React.FC = () => {
  const initSearchParams = {
    pageSize: 12,
  };

  const [setTotal] = useState<number>();
  const [chartList, setChartList] = useState<API.Chart[]>();
  // const [loading, setLoading] = useState();
  const [searchParams] = useState<API.ChartQueryRequest>({
    ...initSearchParams,
  });

  // 获取当前用户信息
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};

  const loadData = async () => {
    try {
      const res = await listMyChartByPageUsingPOST(searchParams);
      if (res.data) {
        setChartList(res.data.records ?? []);
        setTotal(res.data.total ?? 0);
      } else {
        message.error('获取图表失败，');
      }
    } catch (e: any) {
      message.error('获取图表失败，' + e.message);
    }
  };

  useEffect(() => {
    loadData();
    // console.log(chartList);
  }, [searchParams]);

  return (
    <div className="chartManage">
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        // itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={chartList}
        renderItem={(item) => (
          <>
            <Card style={{ width: '100%' }}>
              <ReactECharts option={item.genChart && JSON.parse(item.genChart)} />

              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={<Avatar src={currentUser && currentUser.userAvatar} />}
                  title={item.name}
                  description={item.chartType ? '图表类型：' + item.chartType : undefined}
                />
                {'分析目标：' + item.goal}
                <Divider style={{ fontWeight: 'bold', color: 'blue', fontSize: '16px' }}>
                  智能分析结果
                </Divider>
                <div style={{ whiteSpace: 'pre-wrap', overflow: 'auto' }}>
                  <p style={{ fontWeight: 'bold', color: '#0b93a1', textAlign: 'center' }}>
                    {item.genResult}
                  </p>
                </div>
              </List.Item>
            </Card>
          </>
        )}
      />
    </div>
  );
};
export default ChartManage;
