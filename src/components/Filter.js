import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Autocomplete, Box, Container, TextField } from '@mui/material';
import { BreedContext } from "../BreedContext.js";

const CatsGrid = () => {
    const [context, setContext] = useContext(BreedContext);
    const [breeds, setBreeds] = useState([]);

    const headers = new Headers({
        "Content-Type": "application/json",
        "x-api-key": process.env.CATS_API_KEY
    });
    
    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };

    const getCatBreeds = async () => {
        await axios.get("https://api.thecatapi.com/v1/breeds", requestOptions)
            .then(response => {
                setBreeds([...new Set(response.data.map(breed => ({ label: breed.name, id: breed.id })))]);
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        getCatBreeds();
    }, []);

    return (
        <Container sx={{ p: 2 }} maxWidth="lg">
            <Box 
                sx={{ p: 2 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Autocomplete
                    disablePortal
                    id="breed-select"
                    options={breeds}
                    getOptionKey={(option) => option.id}
                    sx={{ width: 250 }}
                    renderInput={(params) => <TextField {...params} label="Choose a breed" />}
                    onChange={(event, newValue) => {
                        if (newValue) {
                          setContext(newValue.id);
                        }
                    }}
                />
            </Box>
        </Container>
    );
}

export default CatsGrid;
