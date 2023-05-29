import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CatChart = () => {
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
          label: "Skor CAT",
          data: [35, 30, 27, 25, 20, 12],
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
          text: "Data Skor COPD Assessment Test 6 Bulan Terakhir",
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
      <div className="w-full md:col-span-2 relative lg:h-[40vh] h-[40vh] m-auto p-4 border rounded-lg bg-white">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default CatChart;
