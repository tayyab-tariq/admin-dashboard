import { useMemo, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { Box, useTheme } from "@mui/material";
import { useGetSalesQuery } from "@/state/api";
import Loader from "@/components/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "@/components/Header";

const Monthly = () => {
  const palette = useTheme().palette;
  const { data, isLoading } = useGetSalesQuery();

  const [formattedData] = useMemo(() => {
    if (!data) return [];

    const { monthlyData } = data;
    const totalMonthlySales = {
      id: "totalSales",
      color: palette.secondary.main,
      data: [],
    };
    const totalMonthlyUnits = {
      id: "totalUnits",
      color: palette.secondary[600],
      data: [],
    };

    Object.values(monthlyData).forEach(({ month, totalSales, totalUnits }) => {
        
      totalMonthlySales.data = [
          ...totalMonthlySales.data,
          { x: month, y: totalSales },
        ];

        totalMonthlyUnits.data = [
          ...totalMonthlyUnits.data,
          { x: month, y: totalUnits },
        ];
    });

    const formattedData = [totalMonthlySales, totalMonthlyUnits];

    return [formattedData];
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="MONTHLY SALES" subtitle="Chart of monthly sales" />
      <Box height="75vh">
  
        {data ? (
          <ResponsiveLine
            data={formattedData}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: palette.primary.main,
                },
              },
            }}
            colors={{ datum: "color" }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            // curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Month",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total",
              legendOffset: -50,
              legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 50,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <Loader />
        )}
      </Box>
    </Box>
  );
};

export default Monthly;
