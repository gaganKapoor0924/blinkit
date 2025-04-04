
import ItemsChart from "../ItemsSold";
import QuickHeader from "../QuickHeader";
import SalesChart from "../SalesChart";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import { useState } from "react";
import TopCitiesChart from "../CitiesChart";
import ProductInsightsTable from "../ProductInsights";

const QuickCommerce = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <div className="quick_commerce">
            <QuickHeader startDate={startDate} endDate={endDate} setStartDate={setStartDate} 
                setEndDate={setEndDate} />
            <div className="quick_sales_body">
                <div className="quick_summary">
                    <SalesChart startDate={startDate} endDate={endDate}/>
                    <ItemsChart startDate={startDate} endDate={endDate}/>
                    <TopCitiesChart startDate={startDate} endDate={endDate}/>
                </div>
            </div>
            <ProductInsightsTable startDate={startDate} endDate={endDate} setStartDate={setStartDate} 
                setEndDate={setEndDate} />
        </div>
    );
};

export default QuickCommerce;
