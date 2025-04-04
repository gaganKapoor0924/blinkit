import React, { useEffect, useState } from "react";
import { CubeContext } from "@cubejs-client/react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import moment from "moment";
import help2 from '../../assets/brandSection/help2.svg';

import './style.scss';

const COLORS = ["#6C4FED", "#EA6153", "#F7C245", "#D9D9D9"];

const TopCitiesChart = ({ startDate, endDate }) => {
    const { cubeApi } = React.useContext(CubeContext);
    const [chartData, setChartData] = useState([]);
    const formattedStart = moment(startDate).format("YYYY-MM-DD");
    const formattedEnd = moment(endDate).format("YYYY-MM-DD");

    useEffect(() => {

      const query = {
        measures: ["blinkit_insights_city.sales_mrp_sum"],
        dimensions:["blinkit_insights_city.name"],
        timeDimensions: [
          {
            dimension: "blinkit_insights_city.created_at",
            granularity: "day",
            dateRange: [formattedStart, formattedEnd],
          },
        ],
        limit:4,
        order: { "blinkit_insights_city.sales_mrp_sum": "desc" },
    };

        if (!startDate || !endDate) return;

       

        cubeApi.load(query).then((resultSet) => {
            const rawData = resultSet.rawData();
            
            const formattedData = rawData.map((item) => ({
                name: item["blinkit_insights_city.name"],
                sales: parseFloat(item["blinkit_insights_city.sales_mrp_sum"]),
            }));

            setChartData(formattedData);
            console.log('chartData',chartData);
        });
    }, [startDate, endDate]); 

    return (
        <div className="sales_section">
            <div className="sales_header">
        <h2 className="sales_title">Top Cities</h2>
        <img src={help2} alt=""/>
      </div>
            <ResponsiveContainer width={"100%"} height={193}>
                <PieChart>
                   
                    <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          
          dataKey="sales"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>

            <div className="cities_list">
              {
                chartData?.map((chart, index)=>{
                  return(
                    <div className="city_data">
                      <h2><span style={{background:COLORS[index]}}></span>{chart?.name} </h2>
                      <h3>{chart?.sales}</h3>
                      </div>
                  )
                })
              }
            </div>
        </div>
    );
};

export default TopCitiesChart;
