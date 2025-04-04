import React, { useEffect, useState } from "react";
import { CubeProvider, useCubeQuery } from "@cubejs-client/react";
import { CubeContext } from '@cubejs-client/react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { format, parseISO } from "date-fns";
import './style.scss';
import moment from "moment";
import help2 from '../../assets/brandSection/help2.svg';


const SalesChart = ({ startDate, endDate }) => {
    const { cubeApi } = React.useContext(CubeContext);
    const [chartData, setChartData] = useState([]);
    const [currentSales, setCurrentSales] = useState(0);
    const [previousSales, setPreviousSales] = useState(0);
    const [percentageChange, setPercentageChange] = useState(0);

    const formattedStartDate = moment(startDate).format("YYYY-MM-DD");
    const formattedEndDate = moment(endDate).format("YYYY-MM-DD");

    useEffect(() => {

        const query = {
            measures: ["blinkit_insights_city.sales_mrp_sum"],
            timeDimensions: [
                {
                    dimension: "blinkit_insights_city.created_at",
                    granularity: "day",
                    dateRange: [formattedStartDate, formattedEndDate],
                },
            ],
            order: { "blinkit_insights_city.created_at": "asc" },
        };



        cubeApi.load(query).then((resultSet) => {
            const rawData = resultSet.rawData();

            const formattedData = rawData.map((item) => ({
                date: format(parseISO(item["blinkit_insights_city.created_at"]), "MMM dd"),
                sales: parseFloat(item["blinkit_insights_city.sales_mrp_sum"]),
            }));

            setChartData(formattedData);
            console.log(formattedData);

            const last30Days = formattedData.slice(-30);
            const prev30Days = formattedData.slice(-60, -30);

            const lastMonthTotal = last30Days.reduce((sum, d) => sum + d.sales, 0);
            const prevMonthTotal = prev30Days.reduce((sum, d) => sum + d.sales, 0);

            setCurrentSales(lastMonthTotal.toFixed(2));
            setPreviousSales(prevMonthTotal.toFixed(2));

            const change = prevMonthTotal
                ? ((lastMonthTotal - prevMonthTotal) / prevMonthTotal) * 100
                : 0;
            setPercentageChange(change.toFixed(2));
        });
    }, [startDate, endDate]);




    return (
        <div className="sales_section">
            <div className="sales_header">
                <h2 className="sales_title">Sales (MRP)</h2>
                <img src={help2} alt="" />

            </div>
            <div className="sales_mid">
                <p className="current_title">₹{currentSales}</p>
                <p className={`current_text ${percentageChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                    <span>{percentageChange >= 0 ? "↑" : "↓"} {percentageChange}%</span> vs ₹{previousSales} last month
                </p>
            </div>

         
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => (value / 1000).toFixed(0) + "K"} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#34D399" name="This Month" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};



export default SalesChart;
