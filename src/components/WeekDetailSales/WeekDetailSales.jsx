import React, {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./WeekDetailSales.css";
import { Chart, registerables } from "chart.js";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend as RechartsLegend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltipPie, Legend as RechartsLegendPie } from 'recharts';

Chart.register(...registerables);

const WeekDetailSales = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pieChartRef = React.useRef(null);
  const lineChartRef = React.useRef(null);
  const storedId = sessionStorage.getItem('id');

  const lineData = [
    { week: "1주차", sales: 500 },
    { week: "2주차", sales: 750 },
    { week: "3주차", sales: 1000 },
    { week: "4주차", sales: 600 },
  ];

  const pieData = [
    { name: "1주차", value: 100 },
    { name: "2주차", value: 150 },
    { name: "3주차", value: 200 },
    { name: "4주차", value: 120 },
  ];

  const COLORS = ["#cedfcd", "#c2c2ca", "#ffdba4", "#559abc"];

  React.useEffect(() => {
    // Pie Chart 관련 코드
  }, []);

  const getButtonClass = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div className="week-detail-sales-container">
      <header
        className="week-detail-sales-header"
      >
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1 onClick={() => navigate(`/ceo-main?id=${storedId}`)} style={{ cursor: 'pointer' }}>SpotRank</h1>
        <div className="week-detail-sales-button-group">
          <button className="week-detail-sales-button" onClick={() => navigate('/detail-sales')}>나는 사장</button>
          <button className="week-detail-sales-logout-button" onClick={() => navigate('/ceo-main')}>Logout</button>
        </div>
      </header>

      <div className="week-content-container">
        <nav className="week-detail-sales-sidebar">
          <ul>
            <li onClick={() => navigate(`/detail-sales?id=${id}`)}>실시간</li>
            <li onClick={() => navigate(`/day-detail-sales?id=${id}`)}>일간</li>
            <li onClick={() => navigate(`/week-detail-sales?id=${id}`)}>주간</li>
            <li onClick={() => navigate(`/month-detail-sales?id=${id}`)}>월간</li>
            <li onClick={() => navigate(`/shop-edit?id=${id}`)}>정보 수정</li>
          </ul>
        </nav>

        <main className="week-main-content">
          <div className="week-chart-container">
            <div className="week-line-chart">
              <h3 style={{ textAlign: 'center', fontSize: '16px', marginTop:'-5px', color: '#559abc' }}>주간 매출 분석</h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <RechartsTooltip />
                  <RechartsLegend />
                  <Line type="monotone" dataKey="sales" stroke="#87CEEB" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="week-pie-chart">
              <h3 style={{ textAlign: 'center', fontSize: '16px', marginTop: '-2px', color: '#559abc' }}>주간 메뉴 판매량</h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <RechartsTooltipPie />
                  <RechartsLegendPie />
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WeekDetailSales;
