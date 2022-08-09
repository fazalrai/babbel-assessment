import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../App.css";
import Form from "./Form";

const EmailGuesser = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ boxShadow: 5 }} className="radius">
        <br />
        <Typography variant="h4">
          <b>Babbel</b>
        </Typography>
        <Typography variant="h6" gutterBottom="true">
          <b>Email Guesser</b>
        </Typography>
        <br />
        <Form />
      </Box>
    </Container>
  );
};
export default EmailGuesser;
