import React from 'react';
import { Card, CardMedia, Container, Grid } from '@mui/material';

const CatCard = ({cat}) => {
    return (
        <Grid item={true} xs={6} md={3}>
            <Card className='card'>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="200"
                    image={cat.imgUrl}
                />
                <Container sx={{ p: 2 }}>
                    <span>{cat.name}</span>
                </Container>
            </Card>
        </Grid>
    );
}

export default CatCard;
