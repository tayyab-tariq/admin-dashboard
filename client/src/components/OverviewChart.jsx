import { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetSalesQuery } from "@/state/api";
import Loader from "./Loader";

const OverviewChart = ({ isDashboard=false, view }) => {
  const palette = useTheme().palette;
  const { data, isLoading } = useGetSalesQuery();

  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!data) return [];

    const { monthlyData } = data;
    const totalSalesLine = {
        id: 'totalSales',
        color: palette.secondary.main,
        data: [],
    };
    const totalUnitsLine = {
        id: 'totalUnits',
        color: palette.secondary[600],
        data: [],
    };

    Object.values(monthlyData).reduce(
        (acc, { month, totalSales, totalUnits }) => {
            const currSales = acc.sales + totalSales;
            const currUnits = acc.units + totalUnits;

            totalSalesLine.data = [
                ...totalSalesLine.data,
                {x: month, y: currSales},
            ];

            totalUnitsLine.data = [
                ...totalUnitsLine.data,
                {x: month, y: currUnits},
            ];

            return {sales: currSales, units: currUnits};

        }, {sales: 0, units: 0}
    )
    
  
    return [[totalSalesLine], [totalUnitsLine]];
  }, [data]);


  return (
    data || !isLoading ? 
    <ResponsiveLine
        data={view === 'sales' ? totalSalesLine : totalUnitsLine}
    /> 
    
    : <Loader />
  );
}

export default OverviewChart