import Header from "@/components/Header";
import { useGetGeographyQuery } from "@/state/api";
import { Box, useTheme } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";
import Loader from "@/components/Loader";
import { geoData } from "@/state/geoData";

const Geography = () => {
  const palette = useTheme().palette;
  const { data, isLoading } = useGetGeographyQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="GEOGRAPHY" subtitle="Find where your users are located." />
      <Box
        mt="40px"
        height="70vh"
        border={`1px solid ${palette.secondary[200]}`}
        borderRadius="4px"
      >
        {data ? (
          <ResponsiveChoropleth
            data={data}
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
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
            domain={[0, 60]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={140}
            projectionTranslation={[0.45, 0.6]}
            projectionRotation={[0, 0, 0]}
            borderWidth={1.3}
            borderColor="#ffffff"
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: true,
                translateX: 0,
                translateY: -125,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: palette.background.alt,
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

export default Geography;
