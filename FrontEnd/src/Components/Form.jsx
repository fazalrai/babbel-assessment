import * as React from "react";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Skeleton from "@mui/material/Skeleton";

import "../App.css";

import { searchEmail } from "../api/FindEmail";

const Form = ({ changeScreen }) => {
  const [check, setCheck] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [companyName, setCompnyName] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [loader, setLoader] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    setOpen(true);
    e.preventDefault();
    setLoader(true);
    let requestBody = {
      full_name: fullName,
      domain: companyName,
    };
    searchEmail(requestBody)
      .then((result) => {
        setLoader(false);
        setMessage(result.data);
      })
      .catch((error) => {
        setLoader(false);
        setMessage(error.response.data);
      });
  };

  const checkAndSetName = (e) => {
    setFullName(e.target.value);
    if (e.target.value.match(/\d+/g)) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  const submitButton = {
    backgroundColor: "#ffcc81",
    borderRadius: "5px",
    padding: "10px",
    color: "black",
    marginTop: "20px",
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom="true" className="padding-form">
        Hi, enter the employee's required details to get his company email.
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="companyName"
          fullWidth
          id="outlined-basic"
          label="Company Name"
          onChange={(e) => {
            setCompnyName(e.target.value);
          }}
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          name="fullName"
          fullWidth
          id="outlined-basic"
          label="Full Name"
          variant="outlined"
          margin="normal"
          onChange={checkAndSetName}
          required
          error={check}
          helperText={`${check ? "Name cannot contain numbers" : ""}`}
        />
        <Button
          style={submitButton}
          size="large"
          variant="contained"
          endIcon={<SendIcon />}
          margin="normal"
          fullWidth
          type="submit"
        >
          <b>Submit</b>
        </Button>
      </form>

      <Dialog open={open} onClose={handleClose} fullWidth="md">
        <DialogTitle>Guessed Email</DialogTitle>

        {loader && (
          <div style={{ padding: "10px" }}>
            <Skeleton />
            <Skeleton animation="wave" />
          </div>
        )}
        {!loader && (
          <DialogContent>
            <DialogContentText>
              <Typography variant="h6"> {message}</Typography>
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default Form;
