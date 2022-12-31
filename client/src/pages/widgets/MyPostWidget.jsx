/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  IconButton,
  Button,
  useMediaQuery,
} from '@mui/material';
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import UserImage from '../../components/UserImage';
import WidgetWrapper from '../../components/WidgetWrapper';
import { authActions } from '../../store/authSlice';
import FlexBetween from '../../components/FlexBetween';

function MyPostWidget({ picturePath }) {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState('');
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  const { mediumMain } = palette.neutral;
  const { medium } = palette.neutral;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append('userId', _id);
    formData.append('description', post);
    if (image) {
      formData.append('picture', image);
      formData.append('picturePath', image.name);
    }

    const response = await fetch('http://localhost:6001/api/posts', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(authActions.setPost({ posts }));
    setImage(null);
    setPost('');
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="what's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: '100%',
            backgroundColor: palette.neutral.light,
            borderRadius: '2rem',
            padding: '1rem 2rem',
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          borderRadius="5px"
          border={`1px solid ${medium}`}
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg, .jpeg, .png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ '&:hover': { cursor: 'pointer' } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                { image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: '15%' }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>

        </Box>
      )}

      <Divider sx={{ margin: '1.25rem 0' }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ '&:hover': { cursor: 'pointer', color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <>
            <FlexBetween gap="0.25rem">
              <MoreHorizOutlined sx={{ color: mediumMain }} />
            </FlexBetween>
          </>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: '3rem',
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
}

export default MyPostWidget;
