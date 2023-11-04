import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
  CardActionArea
} from "@mui/material";
import { useState } from "react";
import Header from "../../components/Header";
import { useGetProductsQuery } from "@/state/api";
import Loader from "../../components/Loader";
import FormDialog from "./FormDialog";

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stats,
  index
}) => {
  const palette = useTheme().palette;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = async (userId) => {
    setOpen(false);

    if (userId){
      console.log('test');
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
  <>
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: palette.background.alt,
        borderRadius: "0.55rem",
      }}
      variant="outlined"
    >
      <CardActionArea onClick={handleOpen}>
        <CardMedia
          component="img"
          height="194"
          image={`https://api.slingacademy.com/public/sample-photos/${index}.jpeg`}
          loading="lazy"
          
          alt="Paella dish"
        />
      </CardActionArea>
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

        {isDescriptionExpanded ? (
          <Typography variant="body2">{description}</Typography>
        ) : (
          <Typography variant="body2">
            {description.slice(0, 100)} {/* Display first 100 characters */}
            {description.length > 100 && (
              <span
                style={{ cursor: 'pointer', color: 'white', fontWeight: 'bold'}}
                onClick={() => setIsDescriptionExpanded(true)}
              >
                {' '}
                ...
              </span>
            )}
          </Typography>
        )}        
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
          <Typography>Supply Left: {supply}</Typography>
          <Typography>Yearly Sales This Year: {stats?.yearlySalesTotal}</Typography>
          <Typography>Yearly Units Sold This Year: {stats?.yearlyTotalSoldUnits}</Typography>  
        </CardContent> 
      </Collapse>

    </Card>

      <FormDialog
      keepMounted
      open={open}
      name={name}
      description={description}
      price={price}
      rating={rating}
      index={index}
      onClose={handleClose}
      />
  </>  
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
            }, index) => (
              <Product key={_id} 
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stats={stats}
                index={index+1}
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
