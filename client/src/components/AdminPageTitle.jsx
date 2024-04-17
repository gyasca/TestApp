import React from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function AdminPageTitle(props) {
    const navigate = useNavigate()
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            {props.backbutton && <IconButton size="large" onClick={() => navigate(-1)} sx={{ marginRight: "1rem" }}><ArrowBackIcon /></IconButton>}
            <Box sx={{ marginY: ["1rem", "1rem", "2rem"] }}>
                <Typography variant="h3" fontWeight={700}>{props.title}</Typography>
                {props.subtitle && <Typography variant="body" fontWeight={700}>{props.subtitle}</Typography>}
            </Box>

        </Box>
    )
}

export default AdminPageTitle