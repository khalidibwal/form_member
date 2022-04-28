import React,{useEffect} from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, Avatar } from "@mui/material";
export default function Summary() {
  const location = useLocation();
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader
        avatar={<Avatar aria-label="recipe">S</Avatar>}
        title="Report Summary"
        subheader={location.state.name}
      />
      <CardContent>Nama : {location.state.name}</CardContent>
      <CardContent>KTP : {location.state.ktp}</CardContent>
      <CardContent>Tanggal lahir : {location.state.birth.toDateString()}</CardContent>
      <CardContent>Jenis Kelamin : {location.state.gender}</CardContent>
      <CardContent>Email : {location.state.email}</CardContent>
      <CardContent>No Telepon : {location.state.phone}</CardContent>
      <CardContent>Alamat Lengkap : {location.state.address}</CardContent>
      <CardContent>Provinsi : {location.state.province}</CardContent>
      <CardContent>Kota : {location.state.city}</CardContent>
      <CardContent>Kecamatan : {location.state.kecamatan}</CardContent>
      <CardContent>Kelurahan : {location.state.kelurahan}</CardContent>
      <CardContent>Postalcode : {location.state.name}</CardContent>
    </Card>
  );
}
