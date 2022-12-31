/* eslint-disable react/prop-types */
import React from 'react';
import { Box } from '@mui/material';

const UserImage = ({ image, size = '60px' }) => (
  <Box
    width={size}
    height={size}
  >
    <img
      style={{ objectFit: 'cover', borderRadius: '50%' }}
      width={size}
      height={size}
      alt="user"
      src={`http://localhost:6001/assets/${image}`}
    />
  </Box>
);

export default UserImage;
