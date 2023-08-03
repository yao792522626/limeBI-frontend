import {
  deleteChartUsingPOST,
  listChartByPageUsingPOST,
  listMyChartByPageUsingPOST
} from '@/services/Lime/chartController';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Avatar, Button, Card, Col, Divider, List, message, Modal, Result, Row } from 'antd';
import Search from 'antd/es/input/Search';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'umi';
import {listUserByPageUsingPOST} from "@/services/Lime/userController";

/**
 * 我的图标管理页面
 * **/
const MyChart: React.FC = () => {
  // 初始值
  const initSearchParams = {
    current: 1,
    pageSize: 4,
    sortField: 'createTime',
    sortOrder: 'desc',
  };
  // 查询参数
  const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({ ...initSearchParams });

  // 获取当前用户信息
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};

  // 分页获取图表
  const [total, setTotal] = useState<number>(0);
  const [chartList, setChartList] = useState<API.Chart[]>();
  const [loading, setLoading] = useState<boolean>(true);

  // 加载图表数据
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await listMyChartByPageUsingPOST(searchParams);
      console.log(res);
      if (res.data) {
        setChartList(res.data.records ?? []);
        setTotal(res.data.total ?? 0);
        //   对AI生成的Echarts代码进行优化 去除title部分
        if (res.data.records) {
          res.data.records.forEach((item) => {
            if (item.status === 'succeed') {
              const chartOption = JSON.parse(item.genChart ?? '{}');
              // 取出title并且设置为undefined
              chartOption.title = undefined;
              item.genChart = JSON.stringify(chartOption);
            }
          });
        }
      } else {
        message.error('获取图表失败，');
      }
    } catch (e: any) {
      message.error('获取图表失败，' + e.message);
    }
    setLoading(false);
  };

  /**
   变化时执行该处
   **/
  useEffect(() => {
    loadData();
    // console.log(chartList);
  }, [searchParams]);

  /**、
   删除图表
   @params chartId
   **/
  const handleDelete = (chartId: any) => {
    Modal.confirm({
      title: '确认删除',
      icon: <ExclamationCircleOutlined />,
      content: '确定删除这个图表吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        try {
          const res = await deleteChartUsingPOST({ id: chartId });
          // console.log('res', res);
          if (res.data) {
            message.success('删除成功');
            // 删除成功,重新载入数据
            loadData();
          } else {
            message.error('删除失败');
          }
        } catch (e: any) {
          message.error('删除失败' + e.message);
        }
      },
    });
  };

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <div className="chartManage">
      <div>
        <Search
          placeholder="请输入图表名称"
          enterButton
          loading={loading}
          onSearch={(value) => {
            // 设置搜索条件
            setSearchParams({
              ...initSearchParams,
              name: value,
            });
          }}
        />
      </div>

      <div className="margin-16" style={{ margin: '16px 0px' }} />

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
          // 设置分页
          showTotal: () => `共${total}条记录`,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30'],
          onChange: (page, pageSize) => {
            setSearchParams({
              ...searchParams,
              current: page,
              pageSize,
            });
          },
          current: searchParams.current,
          pageSize: searchParams.pageSize,
          total: total,
          responsive: true,
        }}
        dataSource={chartList}
        loading={loading}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card style={{ width: '100%' }}>
              <List.Item.Meta
                avatar={<Avatar src={currentUser && currentUser.userAvatar} />}
                title={currentUser?.userName}
              />
              {/*优化点：用户请求过多等等情况进行优化*/}
              <>
                {/*等待AI生成内容中*/}
                {item.status === 'wait' && (
                  <>
                    <Result
                      status="warning"
                      title="排队中..."
                      subTitle={item.execMessage ?? '当前队列繁忙，请耐心等待'}
                    />

                    <Row justify={'center'}>
                      <Col xs={6} sm={4} md={4} lg={6} xl={6}>
                        <Link to={`/ViewChartData/${item.id}`}>
                          <Button>查看</Button>
                        </Link>
                      </Col>
                      <Col xs={6} sm={4} md={4} lg={6} xl={6}>
                        <Button
                          danger
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                        >
                          删除
                        </Button>
                      </Col>
                    </Row>
                  </>
                )}
                {/*图表生成中*/}
                {item.status === 'running' && (
                  <>
                    <Result status="info" title="图表生成中..." subTitle={item.execMessage} />

                    <Row justify={'center'}>
                      <Col xs={6} sm={4} md={4} lg={6} xl={6}>
                        <Link to={`/ViewChartData/${item.id}`}>
                          <Button>查看</Button>
                        </Link>
                      </Col>
                      <Col xs={6} sm={4} md={4} lg={6} xl={6}>
                        <Button
                          danger
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                        >
                          删除
                        </Button>
                      </Col>
                    </Row>
                  </>
                )}

                {/*生成成功*/}
                {item.status === 'succeed' && (
                  <>
                    <p
                      style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: 'black',
                        fontSize: '16px',
                      }}
                    >
                      {'分析目标：' + item.goal}
                    </p>
                    <List.Item.Meta
                      style={{ textAlign: 'left', fontWeight: 'bold' }}
                      description={item.chartType ? '图表类型' + item.chartType : undefined}
                    />
                    <ReactECharts option={item.genChart && JSON.parse(item.genChart)} />
                    <p
                      style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#e617ff',
                        fontSize: '16px',
                      }}
                    >
                      {'图表名称：' + item.name}
                    </p>
                    <Divider style={{ fontWeight: 'bold', color: 'blue', fontSize: '16px' }}>
                      智能分析结果
                    </Divider>
                    <div style={{ whiteSpace: 'pre-wrap', overflow: 'auto' }}>
                      <p style={{ fontWeight: 'bold', color: '#0b93a1', textAlign: 'center' }}>
                        {item.genResult}
                      </p>
                    </div>
                    <p style={{ color: 'black', fontWeight: 'bold' }}>
                      {/*@ts-ignore*/}
                      {'图表生成时间：' + new Date(item.createTime).toLocaleString()}
                    </p>

                    <Row justify={'center'}>
                      <Col xs={6} sm={4} md={4} lg={6} xl={6}>
                        <Link to={`/ViewChartData/${item.id}`}>
                          <Button>查看</Button>
                        </Link>
                      </Col>
                      <Col xs={6} sm={4} md={4} lg={6} xl={6}>
                        <Button
                          danger
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                        >
                          删除
                        </Button>
                      </Col>
                    </Row>
                  </>
                )}

                {/* 图表生成失败 */}
                {item.status === 'failed' && (
                  <>
                    <Result status="error" title="图表生成失败" subTitle={item.execMessage} />

                    <Row justify={'center'}>
                      <Col xs={6} sm={4} md={4} lg={6} xl={6}>
                        <Link to={`/ViewChartData/${item.id}`}>
                          <Button>查看</Button>
                        </Link>
                      </Col>

                      <Col xs={6} sm={4} md={4} lg={6} xl={6}>
                        <Button
                          danger
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                        >
                          删除
                        </Button>
                      </Col>
                    </Row>
                  </>
                )}
              </>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
export default MyChart;
