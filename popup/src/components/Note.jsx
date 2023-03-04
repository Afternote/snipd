import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import Typography from '@mui/material/Typography';
import "../App.css";
import { height } from '@mui/system';
import { Chip, Stack } from '@mui/material';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function Note({highlightedText, pageNumber, date, time, bookName}) {

 

  return (
    <Card style={{
      width: '100%',
      height: '100%',

    }}>
      <CardContent>
        <Typography style={{
          margin: '16px',
          textAlign: 'center'
        }} variant='h2' component="div"  >
          Selected Highlight
        </Typography>
        <br></br>

        <Divider variant="middle" >
          <Chip label={bookName} />
        </Divider>

        <br></br>

        <Stack direction="row" justifyContent="space-evenly"
          alignItems="center"
          spacing={0}>
          <Typography style={{
            margin: '16px',
            fontSize: '24px'
          }}
            sx={{ mb: 3.0 }} color="text.secondary">
            Your Highlight on page {pageNumber}
          </Typography>


          <Typography style={{
            margin: '16px',
            fontSize: '24px'

          }} sx={{ mb: 1.5 }} color="text.secondary">
            Location 264 - 265
          </Typography>

          <Typography style={{
            margin: '16px',
            fontSize: '24px'

          }} sx={{ mb: 1.5 }} color="text.secondary">
            Added on {date}
          </Typography>
          <Typography style={{
            margin: '16px',
            fontSize: '24px'

          }} sx={{ mb: 1.5 }} color="text.secondary">
            {time}
          </Typography>

        </Stack>


        <Typography style={{
          margin: '16px',
          fontSize: '24px',
          textAlign: 'center'
        }} sx={{ mb: 1.5 }} >
          ======================
        </Typography>
        <Typography style={{
          margin: '16px',
          fontSize: '24px',
        }} variant="body2">
          {highlightedText}
          <br />
        </Typography>

        <Typography style={{
          margin: '16px',
          fontSize: '24px',
          textAlign: 'center'
        }} sx={{ mb: 1.5 }} >
          ======================
        </Typography>
      </CardContent>
      <CardActions style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Button variant="outlined" >Central Page</Button>
      </CardActions>
    </Card>
  );
}