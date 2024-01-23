import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const ErrorPage = () => {
  return (
    <Box>
      <Typography variant='h1'>אופס! משהו השתבש.</Typography>
      <Typography >מצטערים על התקלה. אנא נסו שוב מאוחר יותר.</Typography>
      <Link to="/">
        <Button>עבור לדף הבית</Button>
      </Link>
    </Box>
  );
};

export default ErrorPage;
