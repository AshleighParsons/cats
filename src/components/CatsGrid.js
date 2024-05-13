import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography } from '@mui/material';
import CatCard from './CatCard';
import Filter from './Filter';
import { Container } from '@mui/material';
import { BreedContext } from "../BreedContext.js";

const CatsGrid = () => {
    const [cats, setCats] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [context, setContext] = useContext(BreedContext);

    const headers = new Headers({
        "Content-Type": "application/json",
        "x-api-key": process.env.CATS_API_KEY
    });
    
    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };

    useEffect(() => {
        const getCats = async () => {
            try {
                //  get cat breeds based on filter
                const url = context ? `https://api.thecatapi.com/v1/breeds/search?q=${context}&attach_image=1` : `https://api.thecatapi.com/v1/breeds?limit=10&page=0`;
                const response = await axios.get(url, requestOptions);
                const catsData = response.data;
                const catsWithImages = await Promise.all(catsData.map(async (cat) => {
                    // get cat image based on breed id of each cat
                    const imgResponse = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_id=${cat.id}`, requestOptions);
                    cat.imgUrl = imgResponse.data[0].url;
                    return cat;
                }));
                setCats(catsWithImages);
            } catch (error) {
                console.log('error', error);
            }
        };

        getCats();
    }, [context]);

    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        if (scrollTop + clientHeight === scrollHeight) {
            // get more cats you reach the end of the page
            setCurrentPage((prevPage) => prevPage + 1);
            loadMoreCats();
        }
    };

    const loadMoreCats = async () => {
        const nextPage = currentPage + 1;
        // get next page of cat breeds
        const response = await axios.get(`https://api.thecatapi.com/v1/breeds?limit=10&page=${nextPage}`, requestOptions);
        const newCats = response.data.map(async (cat) => {
            const imgResponse = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_id=${cat.id}`, requestOptions);
            cat.imgUrl = imgResponse.data[0].url;
            return cat;
        });
        const resolvedCats = await Promise.all(newCats);
        setCats(cats => [...cats, ...resolvedCats]);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    return (
        <Container sx={{ p: 2 }} maxWidth="lg">
            <Filter />
            <Grid container spacing={3}>
                {/* if cats.length > 0 show a grid of cats, otherwise show text saying no cats */}
                {cats.length > 0 ? (
                    cats.map((cat, i) => {
                        return <CatCard key={i} cat={cat} />;
                    })
                ) : (
                    <Grid item xs={12}>
                        <Typography variant="body1">No cats found.</Typography>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
}

export default CatsGrid;
