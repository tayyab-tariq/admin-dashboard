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
import { useState, useRef, useCallback, useEffect } from "react";
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
  const [imageLoaded, setImageLoaded] = useState(false);
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

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
  <>
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: palette.background.alt,
        borderRadius: "0.55rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
      variant="outlined"
    >
      <CardActionArea onClick={handleOpen}>
        

        <CardMedia
          component="img"
          height="194"
          image={`https://api.slingacademy.com/public/sample-photos/${index}.jpeg`}
          loading="lazy"
          onLoad={handleImageLoad}
          alt={name}
        />
      
        {/* {!imageLoaded && <div className="shiny-placeholder" style={{ height: '194px' }}/>} */}
      
        
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
  const [page, setPage] = useState(0)
  const [products, setProducts] = useState([]); // Use a state variable for products
  const [loading, setLoading] = useState(false);


  const { data, isLoading } = useGetProductsQuery({ page, pageSize: 4 });
  const hasMore = data && data.length === 4; // Adjust this based on your actual page size
  const observer = useRef();

  const lastProductRef = useCallback(node => {
    if (isLoading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPageNumber => prevPageNumber + 1)
        setLoading(true);
      }
    })
    if (node) observer.current.observe(node)
  }, [isLoading, hasMore])

  useEffect(() => {
    // Append the new data to the existing products when data changes
    if (data) {
      setProducts(prevProducts => [...prevProducts, ...data]);
      setLoading(false);

    }
  }, [data]);

  return (
    <Box m="1.5rem 2rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />

      {products && products.length > 0 ? (
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
          {products && products.map((product, index) => {
            if (index+1 === products.length) {
              return (
                <div ref={lastProductRef} key={product._id}>
                  <Product index={index + 1} {...product} />
                </div>
              );
            } else {
              return <Product key={product._id} index={index + 1} {...product} />;
            }
          })}
        </Box>
        
      ) : (
        <Loader />
      )}
      {loading && <Loader />}
    </Box>
  );
};

export default Products;
