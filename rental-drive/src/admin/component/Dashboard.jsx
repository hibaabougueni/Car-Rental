import { Fragment, useEffect, useState } from "react";
import Header from "./Header";
import { Box } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';
import OrderService from "../../services/OrderService";
import VehiculeService from "../../services/VehiculeService";
import CategoryService from "../../services/CategoryService";
import { PieChart } from "@mui/x-charts";

const chartSetting = {
  width: 400,
  height: 300,
};

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [orderCounts, setOrderCounts] = useState([]);
  const [vehicleCategories, setVehicleCategories] = useState([]);
  const [orderStatusCounts, setOrderStatusCounts] = useState([]);

  useEffect(() => {
    
    OrderService.getAllOrders()
      .then((res) => {
        const orderData = res.data.map((order) => ({
          id: order.id,
          orderDate: new Date(order.orderDate),
          orderItems: order.orderItems,
          orderStatus: order.orderStatus,
        }));
        setOrders(orderData);
  
        const counts = Array(12).fill(0);
        orderData.forEach(order => {
          const month = order.orderDate.getMonth();
          counts[month]++;
        });
  
        const countsData = counts.map((count, index) => ({
          month: months[index],
          count,
        }));
  
        setOrderCounts(countsData);
        console.log("Order Counts:", countsData);

        const statusCounts = { PLACED: 0, CONFIRMED: 0, CANCELED: 0 };

        orderData.forEach(order => {
          if (order.orderStatus) { 
            const statusKey = order.orderStatus ; 
            if (statusCounts[statusKey] !== undefined) {
              statusCounts[statusKey]++;
            }
          }
        });


        const totalOrders = orderData.length;
        const statusData = Object.keys(statusCounts).map(status => ({
          label: status ,
          value: ((statusCounts[status] / totalOrders) * 100).toFixed(2), 
        }));

        setOrderStatusCounts(statusData);
        
      })
      .catch((error) => {
        console.error("There was an error while showing the orders", error);
      });
  

    CategoryService.findAll()
      .then((res) => {
        const categories = res.data;
        console.log("Categories:", categories);
  

        VehiculeService.findAllVehicules()
          .then((res) => {
            const vehicles = res.data;
            console.log("Vehicles:", vehicles);
  
            const categoryCounts = categories.reduce((acc, category) => {
              const count = vehicles.filter(vehicle => vehicle.category.name === category.name).length;
              acc[category.name] = count;
              return acc;
            }, {});
  
            console.log("Category Counts:", categoryCounts);

            const totalVehicles = vehicles.length;
            if (totalVehicles > 0) {
              const categoryData = Object.keys(categoryCounts).map((category) => ({
                label: category,
                value: ((categoryCounts[category] / totalVehicles) * 100).toFixed(2), 
              }));
  
              setVehicleCategories(categoryData);
              console.log("Vehicle Categories Data:", categoryData);
            } else {
              console.log("No vehicles available for calculation.");
              setVehicleCategories([]);
            }
          })
          .catch((error) => {
            console.error("There was an error while fetching the vehicles", error);
          });
      })
      .catch((error) => {
        console.error("There was an error while fetching the categories", error);
      });
  }, []);

  return (
    <Fragment>
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <BarChart
          dataset={orderCounts}
          xAxis={[{ dataKey: 'month', scaleType: 'band', label: 'Month' }]}
          yAxis={[{ dataKey: 'count', label: 'Number Of Orders' }]}
          series={[{ dataKey: 'count', label: 'Number Of Orders' }]}
          layout="vertical"
          {...chartSetting}
        />
      
        <PieChart
          series={[
            {
              data: vehicleCategories.map((category, index) => ({
                id: index,
                value: parseFloat(category.value),
                label: `${category.label}: ${category.value}%`,
              })),
            },
          ]}
          width={450}
          height={200}
        />
      </Box>
      <Box display="flex" alignItems="center">
        <PieChart
            series={[
              {
                data: orderStatusCounts.map((status, index) => ({
                  id: index,
                  value: parseFloat(status.value),
                  label: `${status.label}: ${status.value}%`,
                })),
                
              },
            ]}
            colors={['orange', 'green', 'red']}
            width={500}
            height={200}
        />
      </Box>
    </Fragment>
  );
}

export default Dashboard;
