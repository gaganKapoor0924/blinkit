import React, { useEffect, useState } from "react";
import { CubeContext } from "@cubejs-client/react";
import DataTable from "react-data-table-component";
import moment from "moment";

const ProductInsightsTable = ({ startDate, endDate }) => {
    const { cubeApi } = React.useContext(CubeContext);
    const [tableData, setTableData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]); 

    const getQuery = (formattedStart, formattedEnd) => ({
        measures: [
            "blinkit_insights_sku.sales_mrp_sum",
            "blinkit_insights_sku.qty_sold",
            "blinkit_insights_sku.drr_7",
            "blinkit_insights_sku.drr_14",
            "blinkit_insights_sku.drr_30",
            "blinkit_insights_sku.sales_mrp_max",
            "blinkit_insights_sku.month_to_date_sales",
            "blinkit_insights_sku.be_inv_qty",
            "blinkit_insights_sku.fe_inv_qty",
            "blinkit_insights_sku.inv_qty",
            "blinkit_insights_sku.days_of_inventory_14",
            "blinkit_insights_sku.days_of_inventory_max",
            "blinkit_scraping_stream.on_shelf_availability",
            "blinkit_scraping_stream.rank_avg",
            "blinkit_scraping_stream.selling_price_avg",
            "blinkit_scraping_stream.discount_avg"
        ],
        dimensions: [
            "blinkit_insights_sku.id",
            "blinkit_insights_sku.name"
        ],
        timeDimensions: [
            {
                dimension: "blinkit_insights_sku.created_at",
                dateRange: [formattedStart, formattedEnd],
            },
        ],
        
            limit:4
    });

    useEffect(() => {
        if (!startDate || !endDate) return;

        const formattedStart = moment(startDate).format("YYYY-MM-DD");
        const formattedEnd = moment(endDate).format("YYYY-MM-DD");

        cubeApi
            .load(getQuery(formattedStart, formattedEnd))
            .then((resultSet) => {
                const rawData = resultSet.rawData();
                
                const formattedData = rawData.map((item) => ({
                    id: item["blinkit_insights_sku.id"],
                    name: item["blinkit_insights_sku.name"],
                    sales: parseFloat(item["blinkit_insights_sku.sales_mrp_sum"]),
                    qtySold: parseInt(item["blinkit_insights_sku.qty_sold"]),
                    drr7: parseFloat(item["blinkit_insights_sku.drr_7"]),
                    drr14: parseFloat(item["blinkit_insights_sku.drr_14"]),
                    drr30: parseFloat(item["blinkit_insights_sku.drr_30"]),
                    maxSales: parseFloat(item["blinkit_insights_sku.sales_mrp_max"]),
                    monthToDate: parseFloat(item["blinkit_insights_sku.month_to_date_sales"]),
                    beInvQty: parseInt(item["blinkit_insights_sku.be_inv_qty"]),
                    feInvQty: parseInt(item["blinkit_insights_sku.fe_inv_qty"]),
                    invQty: parseInt(item["blinkit_insights_sku.inv_qty"]),
                    daysInventory14: parseFloat(item["blinkit_insights_sku.days_of_inventory_14"]),
                    daysInventoryMax: parseFloat(item["blinkit_insights_sku.days_of_inventory_max"]),
                    shelfAvailability: parseFloat(item["blinkit_scraping_stream.on_shelf_availability"]),
                    rankAvg: parseFloat(item["blinkit_scraping_stream.rank_avg"]),
                    sellingPriceAvg: parseFloat(item["blinkit_scraping_stream.selling_price_avg"]),
                    discountAvg: parseFloat(item["blinkit_scraping_stream.discount_avg"]),
                }));

                setTableData(formattedData);
                console.log('table',tableData);
            })
            .catch((error) => console.error("Cube.js Error:", error));
    }, [startDate, endDate]); 
    const columns = [
        { name: "Product Name", selector: (row) => row.name, sortable: true },
        { name: "Sales MRP", selector: (row) => row.sales, sortable: true },
        { name: "Quantity Sold", selector: (row) => row.qtySold, sortable: true },
        { name: "DRR 7", selector: (row) => row.drr7, sortable: true },
        { name: "DRR 14", selector: (row) => row.drr14, sortable: true },
        { name: "DRR 30", selector: (row) => row.drr30, sortable: true },
        { name: "Max Sales", selector: (row) => row.maxSales, sortable: true },
        { name: "Month-to-Date Sales", selector: (row) => row.monthToDate, sortable: true },
        { name: "Inventory Qty", selector: (row) => row.invQty, sortable: true },
        { name: "Days of Inventory (14)", selector: (row) => row.daysInventory14, sortable: true },
        { name: "Days of Inventory (Max)", selector: (row) => row.daysInventoryMax, sortable: true },
        { name: "Shelf Availability", selector: (row) => row.shelfAvailability, sortable: true },
        { name: "Rank Avg", selector: (row) => row.rankAvg, sortable: true },
        { name: "Selling Price Avg", selector: (row) => row.sellingPriceAvg, sortable: true },
        { name: "Discount Avg", selector: (row) => row.discountAvg, sortable: true },
    ];

    // ✅ Handle row selection
    const handleRowSelected = (state) => {
        setSelectedRows(state.selectedRows);
    };

    return (
        <div className="table-container">
            <h2>{tableData.title}</h2>
            <DataTable
                columns={columns}
                data={tableData}
                pagination
                highlightOnHover
                striped
                selectableRows  // ✅ Enables row selection
                onSelectedRowsChange={handleRowSelected}  // ✅ Updates selectedRows state
            />

            {selectedRows.length > 0 && (
                <div className="selected-rows">
                    <h3>Selected Products</h3>
                    <ul>
                        {selectedRows.map((row) => (
                            <li key={row.id}>{row.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProductInsightsTable;
