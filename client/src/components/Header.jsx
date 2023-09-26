import { Typography, Box, useTheme } from "@mui/material"

// eslint-disable-next-line react/prop-types
const Header = ({ title, subtitle }) => {
  const palette = useTheme().palette;

  return (
    <Box>
      <Typography
        variant="h2"
        color={palette.secondary[100]}
        fontWeight='bold'
        sx={{ mb: '5px' }}
      >
        {title}
      </Typography>

      <Typography
        variant="h5"
        color={palette.secondary[300]}
      >
        {subtitle}
      </Typography>
    </Box>
  )
}

export default Header