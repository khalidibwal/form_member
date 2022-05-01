import React,{useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, Avatar } from "@mui/material";
export default function Summary() {
  const location = useLocation();
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar aria-label="recipe">S</Avatar>}
        title="Report Summary"
        subheader={location.state.name}
      />
      <CardContent className={classes.textField}>Nama : {location.state.name}</CardContent>
      <CardContent className={classes.textField}>KTP : {location.state.ktp}</CardContent>
      <CardContent className={classes.textField}>Tanggal lahir : {location.state.birth.toDateString()}</CardContent>
      <CardContent className={classes.textField}>Jenis Kelamin : {location.state.gender}</CardContent>
      <CardContent className={classes.textField}>Email : {location.state.email}</CardContent>
      <CardContent className={classes.textField}>No Telepon : {location.state.phone}</CardContent>
      <CardContent className={classes.textField}>Alamat Lengkap : {location.state.address}</CardContent>
      <CardContent className={classes.textField}>Provinsi : {location.state.province}</CardContent>
      <CardContent className={classes.textField}>Kota : {location.state.city}</CardContent>
      <CardContent className={classes.textField}>Kecamatan : {location.state.kecamatan}</CardContent>
      <CardContent className={classes.textField}>Kelurahan : {location.state.kelurahan}</CardContent>
      <CardContent className={classes.textField}>Postalcode : {location.state.postal}</CardContent>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(3, 3),
      margin: "auto",
      width: "100%",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      flex: "50%",
      width: "50%",
    },
  }));