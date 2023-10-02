import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import Header from "../../components/Header";
import { useGetProductsQuery } from "@/state/api";
import Loader from "../../components/Loader";

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stats,
}) => {
  const palette = useTheme().palette;
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: palette.background.alt,
        borderRadius: "0.55rem",
      }}
      variant="outlined"
    >
      <CardContent>
        <Typography sx={{
            fontSize: 14,
          }}
          color={palette.secondary[700]}
          gutterBottom        /* {Bottom margin} */
        >
          {category}
        </Typography>
        
        <Typography 
          variant='h5'
          component='div'
        >
          {name}
        </Typography>
        
        <Typography sx={{
            mb: '1.5rem'
          }}
          color={palette.secondary[400]}
        >
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
        
      </CardContent>
      
      <CardActions>
        <Button variant="primary" size="small" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'See Less' : 'See More'}
        </Button>
      </CardActions>

      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>  
          <Typography>Supply Left: {supply}</Typography>
          <Typography>Yearly Sales This Year: {stats.yearlySalesTotal}</Typography>
          <Typography>Yearly Units Sold This Year: {stats.yearlyTotalSoldUnits}</Typography>  
        </CardContent> 
      </Collapse>

    </Card>
  );
};

const Products = () => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const { data, isLoading } = useGetProductsQuery();
  return (
    <Box m="1.5rem 2rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />

      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0,1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span-4" },
          }}
        >
          {data.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stats,
            }) => (
              <Product key={_id} 
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stats={stats}
              />
            )
          )}
        </Box>
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default Products;
