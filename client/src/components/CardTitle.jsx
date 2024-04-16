import React from 'react'
import { Typography, Stack, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function CardTitle(props) {
    const navigate = useNavigate()
    return (
        <Stack direction="row" alignItems={"center"} spacing={2}>
            {props.back && <>
                <IconButton onClick={() => {navigate(props.back)}}><ArrowBackIcon color='primary'/></IconButton>
            </>}
            {props.icon}
            <Typography sx={{ fontSize: 18, fontWeight: 700 }} color="text.secondary" gutterBottom>
                {props.title}
            </Typography>
        </Stack>
    )
}

export default CardTitle