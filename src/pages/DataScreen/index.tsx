import {
  ActiveRingChart,
  ConicalColumnChart,
  Decoration5,
  Decoration9,
  FlylineChartEnhanced,
  FullScreenContainer,
  ScrollRankingBoard,
} from '@jiaminghi/data-view-react';
import { Layout, Space } from 'antd';
import React from 'react';
import { Link } from 'umi';

const { Header, Sider, Content, Footer } = Layout;

const headerStyle: React.CSSProperties = {
  position: 'relative',
  textAlign: 'center',
  color: '#fff',
  fontWeight: '900',
  fontSize: 20,
  width: '100%',
  height: 100,
  paddingInline: 50,
  lineHeight: '100px',
  backgroundColor: '#001529',
};
const Decoration5Style: React.CSSProperties = {
  width: '600px',
  height: '40px',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-300px,-20px)',
};
const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#001529',
};

export const config = {
  data: [
    {
      name: '周口',
      value: 55,
    },
    {
      name: '南阳',
      value: 120,
    },
    {
      name: '西峡',
      value: 78,
    },
    {
      name: '驻马店',
      value: 66,
    },
    {
      name: '新乡',
      value: 80,
    },
    {
      name: '信阳',
      value: 45,
    },
    {
      name: '漯河',
      value: 29,
    },
  ],
};
export const config1 = {
  points: [
    {
      name: '郑州',
      coordinate: [0.3, 0.42],
    },
    {
      name: '新乡',
      coordinate: [0.22, 0.33],
    },
    {
      name: '焦作',
      coordinate: [0.43, 0.29],
    },
    {
      name: '开封',
      coordinate: [0.35, 0.35],
    },
    {
      name: '许昌',
      coordinate: [0.43, 0.47],
    },
    {
      name: '平顶山',
      coordinate: [0.45, 0.54],
    },
    {
      name: '洛阳',
      coordinate: [0.36, 0.38],
    },
    {
      name: '周口',
      coordinate: [0.22, 0.65],
    },
    {
      name: '漯河',
      coordinate: [0.46, 0.26],
    },
    {
      name: '南阳',
      coordinate: [0.37, 0.56],
    },
    {
      name: '信阳',
      coordinate: [0.15, 0.68],
    },
    {
      name: '驻马店',
      coordinate: [0.35, 0.57],
    },
    {
      name: '济源',
      coordinate: [0.37, 0.29],
    },
    {
      name: '三门峡',
      coordinate: [0.2, 0.36],
    },
    {
      name: '商丘',
      coordinate: [0.46, 0.41],
    },
    {
      name: '鹤壁',
      coordinate: [0.52, 0.18],
    },
    {
      name: '濮阳',
      coordinate: [0.55, 0.17],
    },
    {
      name: '安阳',
      coordinate: [0.48, 0.1],
    },
  ],
  lines: [
    {
      source: '新乡',
      target: '郑州',
    },
    {
      source: '焦作',
      target: '郑州',
    },
    {
      source: '开封',
      target: '郑州',
    },
    {
      source: '许昌',
      target: '郑州',
    },
    {
      source: '平顶山',
      target: '郑州',
    },
    {
      source: '洛阳',
      target: '郑州',
    },
    {
      source: '周口',
      target: '郑州',
    },
    {
      source: '漯河',
      target: '郑州',
    },
    {
      source: '南阳',
      target: '郑州',
    },
    {
      source: '信阳',
      target: '郑州',
    },
    {
      source: '驻马店',
      target: '郑州',
    },
    {
      source: '济源',
      target: '郑州',
    },
    {
      source: '三门峡',
      target: '郑州',
    },
    {
      source: '商丘',
      target: '郑州',
    },
    {
      source: '鹤壁',
      target: '郑州',
    },
    {
      source: '濮阳',
      target: '郑州',
    },
    {
      source: '安阳',
      target: '郑州',
    },
  ],
  bgImgSrc:
    'https://gd-hbimg.huaban.com/fa30d121d8fc94fc0d72b5e540bdf3ca03b9c50da975a-MEhxn1_fw658webp',
};

const DataScreen: React.FC = () => (
  <FullScreenContainer>
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout>
        <Header style={headerStyle}>
          <span>熊猫智能 BI 可视化平台</span>
          <Decoration5 style={Decoration5Style} />
        </Header>

        <Layout>
          <Sider width={'300px'}>
            <ScrollRankingBoard
              config={config}
              style={{ width: '260px', height: '200px', margin: 20 }}
            />
            <ActiveRingChart config={config} style={{ width: '300px', height: '300px' }} />
          </Sider>
          <Content style={contentStyle}>
            <FlylineChartEnhanced config={config1} style={{ width: '100%', height: '500px' }} />
          </Content>
          <Sider width={'300px'}>
            <ConicalColumnChart
              config={config}
              style={{ width: '300px', height: '200px', marginTop: 30 }}
            />
            <Link to="/welcome">
              <Decoration9
                style={{
                  width: '260px',
                  height: '260px',
                  color: '#fff',
                  fontWeight: '900',
                  margin: '20px',
                }}
              >
                进入智能系统
              </Decoration9>
            </Link>
          </Sider>
        </Layout>
      </Layout>
    </Space>
  </FullScreenContainer>
);
export default DataScreen;
