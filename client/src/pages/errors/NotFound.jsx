import { Button, Container, Card, CardContent, CardActions, Stack, Typography, TextField } from "@mui/material"
import CardTitle from "../../components/CardTitle";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

function NotFound() {
    return (
        <Container maxWidth="xl" sx={{marginTop: "1rem"}}>
            <Card sx={{ maxWidth: 500, margin: "auto" }}>
                <CardContent>
                    <CardTitle icon={<QuestionMarkIcon />} title="Page Not Found" />
                    <p>The page you are trying to look for is missing or has been moved.</p>
                </CardContent>
                <CardActions>
                    <Button LinkComponent={Link} size="small" variant="text" color="primary" to="/" startIcon={<HomeIcon/>}> Return Home</Button>
                </CardActions>
            </Card>

        </Container>
    )
}

export default NotFound