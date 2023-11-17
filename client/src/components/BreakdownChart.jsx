import { useGetSalesQuery } from "@/state/api";
import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import Loader from "./Loader";

const BreakdownChart = ({ isDashboard = false }) => {
  const { data, isLoading } = useGetSalesQuery();
  const palette = useTheme().palette;

  const colors = [
    palette.blueAccent[500],
    palette.blueAccent[300],
    palette.redAccent[300],
    palette.redAccent[500],
  ];

  if (!data || isLoading) {
    return <Loader />;
  }

  const formattedData = Object.entries(data.salesByCategory).map(
    ([category, sales], i) => ({
      id: category,
      label: category,
      value: sales,
      color: colors[i],
    })
  );

  return (
    <Box
      height={isDashboard ? "400px" : "100%"}
      width={undefined}
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "325px" : undefined}
      position="relative"
    >
      <ResponsivePie
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
                fill: palette.secondary[100],
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
              color: '#797A76',
            },
          },
        }}
        colors={{ datum: "data.color" }}
        margin={
          isDashboard
            ? { top: 40, right: 80, bottom: 100, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={!isDashboard}
        arcLinkLabelsTextColor={palette.secondary[200]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: isDashboard ? 20 : 0,
            translateY: isDashboard ? 50 : 56,
            itemsSpacing: 5,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: palette.primary[500],
                },
              },
            ],
          },
        ]}
      />
      <Box
        position='relative'
        top='50%'
        left='50%'
        color={palette.secondary[400]}
        textAlign='center'
        pointerEvents='none'
        sx={{
          transform: isDashboard
            ? "translate(-55%, -1950%)"
            : "translate(-50%, -2350%)",
        }}
      >
        <Typography variant="h6">
          {!isDashboard && 'Total: '} ${data.yearlySalesTotal}
        </Typography>
      </Box>

    </Box>
  );
};

export default BreakdownChart;
