import React from 'react';
import { Card, CardMedia, Container, Grid, Typography } from '@mui/material';

const CatCard = ({cat}) => {
    return (
        <Grid item={true} xs={6} md={3}>
            <Card sx={{ '&:hover': { border: '1px solid #00ACC1' } }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="200"
                    image={cat.imgUrl}
                />
                <Container sx={{ p: 2 }}>
                    <Typography variant="body1">{cat.name}</Typography>
                </Container>
            </Card>
        </Grid>
    );
}

export default CatCard;
