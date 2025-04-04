import React, { useEffect, useState } from "react";
import { CubeContext } from "@cubejs-client/react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import moment from "moment";
import { format, parseISO } from "date-fns";
import help2 from '../../assets/brandSection/help2.svg';


import "./style.scss";



const ItemsChart = ({ startDate, endDate }) => {
  const { cubeApi } = React.useContext(CubeContext);
  const [chartData, setChartData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  const formattedStartDate = moment(startDate).format("YYYY-MM-DD");
  const formattedEndDate = moment(endDate).format("YYYY-MM-DD");

  useEffect(() => {

    const query = [
      {
        measures: ["blinkit_insights_sku.qty_sold"],
        timeDimensions: [
          {
            dimension: "blinkit_insights_sku.created_at",
            dateRange: [formattedStartDate, formattedEndDate],
            granularity: "day"
          }
        ],
        order: { "blinkit_insights_sku.created_at": "desc" }
      },
      {
        measures: ["blinkit_insights_sku.qty_sold"],
        timeDimensions: [
          {
            dimension: "blinkit_insights_sku.created_at",
            dateRange: [formattedStartDate, formattedEndDate],
            granularity: "day"
          }
        ],
        order: { "blinkit_insights_sku.created_at": "asc" }
      }
    ];


    cubeApi.load(query).then((response) => {
      let formattedData = [];

      if (response.decompose) {
        const decomposedResultSets = response.decompose();
        formattedData = decomposedResultSets.flatMap(resultSet =>
          resultSet.rawData().map(item => ({
            date: format(parseISO(item["blinkit_insights_sku.created_at"]), "dd MMM"),
            sales: parseFloat(item["blinkit_insights_sku.qty_sold"])
          }))
        );
      } else {
        formattedData = response.rawData().map(item => ({
          date: format(parseISO(item["blinkit_insights_sku.created_at"]), "dd MMM"),
          sales: parseFloat(item["blinkit_insights_sku.qty_sold"])
        }));
      }

      setChartData(formattedData);
      console.log(formattedData);
    }).catch(error => console.error("Cube.js Error:", error));
  }, [startDate, endDate]);



  return (
    <div className="sales_section">
      <div className="sales_header">
        <h2 className="sales_title">Items Sold</h2>
        <img src={help2} alt="" />

      </div>

      <div className="sales_mid">
        <p className="current_title">{totalSales} Units</p>
      </div>

      {/* Line Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(value) => value.toFixed(0)} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#34D399" name="Daily Sales" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ItemsChart;
