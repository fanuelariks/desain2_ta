import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: [
        "Bulan 1",
        "Bulan 2",
        "Bulan 3",
        "Bulan 4",
        "Bulan 5",
        "Bulan 6",
      ],
      datasets: [
        {
          fill: true,
          label: "Berat Badan",
          data: [72, 73, 75, 77, 77, 78, 79], 
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgb(53, 162, 235, 0.4",
        },
      ],
    });
    setChartOptions({
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Data Berat Badan 6 Bulan Terakhir",
          font: {
            family: "Arial",
            size: 24,
          },
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, []);

  return (
    <>
      <div className="w-full md:col-span-2 relative lg:h-[40vh] h-[35vh] m-auto p-4 border rounded-lg bg-white">
        <Line data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default BarChart;
