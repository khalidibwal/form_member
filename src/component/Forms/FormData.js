import {
  Button,
  TextField,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import APIDATA from "../API/DataSource";
import axios from "axios";
import Swal from "sweetalert2";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {Link, useNavigate} from 'react-router-dom';
export default function FormData(props) {
  const classes = useStyles();
  const [ktp, setKtp] = useState("");
  // Provinsi
  const [selectProvince, getSelectedProvince] = useState("");
  const [province, setProvince] = useState([]);
  //Kota
  const [selectCity, getSelectedCity] = useState("");
  const [city, setCity] = useState([]);
  //Kecamatan
  const [selectkecamatan, getSelectedkecamatan] = useState("");
  const [camat, setCamat] = useState([]);
  //kelurahan
  const [selectkelurahan, getSelectedkelurahan] = useState("");
  const [lurah, setlurah] = useState([]);
  //PostCode
  const [postalcode, setPostalCode] = useState([])


  const [gender, setGender] = useState([]);
  const [birthdate, setBirthDate] = useState(new Date());
  const MyGender = [
    { id: 1, title: "Pria" },
    { id: 2, title: "Wanita" },
  ];
  const handleSelect = (event) => {
    getSelectedProvince(event.target.value);
  };
  const citySelect = (event) => {
    getSelectedCity(event.target.value);
  };
  const camatSelect = (event) =>{
    getSelectedkecamatan(event.target.value)
  }
  const lurahSelect = (event) =>{
    getSelectedkelurahan(event.target.value)
  }
  const handleKtp = (event, value) => {
    if (event.target.value.length >= 17) {
      Swal.fire({
        icon: "error",
        title: "Max Length 16 Character",
      });
    }
    else{
      setKtp(event.target.value)
    }
    console.log("ktp",ktp)
  };
  const phoneMaxLength = (event, value) => {
    if (event.target.value.length >= 14) {
      Swal.fire({
        icon: "error",
        title: "Max Length 13 Character",
        text: "Check The Length Of Your Phone number Again",
      });
    }
  };
  const HandleProvince = () => {
    axios.get(`${APIDATA}/province`).then((res) => setProvince(res.data.data));
  };
  const navigate = useNavigate();
  const OnSubmitData = () =>{
    navigate('/summary',{state:{id:1,name:'sabaoon'}});
  }

  useEffect(() => {
    HandleProvince();
    const HandleCity = () => {
      axios
        .get(`${APIDATA}/city/?province_id=${selectProvince}`)
        .then((res) => setCity(res.data.data));
    };
    const HandleKecamatan = () => {
      axios
        .get(`${APIDATA}/kecamatan/?city_id=${selectCity}`)
        .then((res) => setCamat(res.data.data));
    };
    const HandleKelurahan = () =>{
      axios
        .get(`${APIDATA}/kelurahan/?kecamatan_id=${selectkecamatan}`)
        .then((res) => setlurah(res.data.data));
    }
    HandleCity();
    HandleKecamatan();
    HandleKelurahan();
  }, [selectProvince, selectCity,selectkecamatan]);

  return (
    <div>
      <Paper className={classes.root}>
        <form>
          <TextField
            label="Nama lengkap"
            id="margin-normal"
            name="name"
            className={classes.textField}
            helperText="Enter your full name"
            //   onChange={handleInput}
          />
          <TextField
            label="No KTP"
            id="margin-normal"
            name="ktp"
            className={classes.textField}
            helperText="Max. Character 16"
            onChange={(e, v) => handleKtp(e, v)}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              disableFuture
              label="Tanggal Lahir"
              openTo="year"
              views={["year", "month", "day"]}
              value={birthdate}
              onChange={(newValue) => {
                setBirthDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Jenis kelamin</InputLabel>
            <Select
              className={classes.textField}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(e) => setGender(e.target.value)}
              value={gender}
              label="gender"
              name="gender"
            >
              {MyGender.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Email"
            id="margin-normal"
            name="email"
            type="email"
            //   defaultValue={formInput.name}
            className={classes.textField}
            helperText="e.g. name@gmail.com"
            //   onChange={handleInput}
          />
          <TextField
            label="No Telp"
            id="margin-normal"
            name="phone"
            type="number"
            className={classes.textField}
            helperText="Max. 13 Character"
            onChange={(e, v) => phoneMaxLength(e, v)}
          />
          <TextField
            label="Alamat Lengkap"
            id="margin-normal"
            name="address"
            helperText="e.g. name@gmail.com"
            //   onChange={handleInput}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Provinsi</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleSelect}
              value={selectProvince}
              label="Age"
              name="province"
            >
              {province.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectProvince ? (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Kota</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={citySelect}
                value={selectCity}
                label="city"
                name="city"
              >
                {city.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <p></p>
          )}

          {selectCity ? (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Kecamatan</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={camatSelect}
                value={selectkecamatan}
                label="kecamatan"
                name="kecamatan"
              >
                {camat.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <p></p>
          )}
          {selectkecamatan ? (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">kelurahan</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={lurahSelect}
                value={selectkelurahan}
                label="Kelurahan"
                name="kelurahan"
              >
                {lurah.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <p></p>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={OnSubmitData}
          >
            Submit Form membership
          </Button>
        </form>
      </Paper>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: 20,
    width: "100%",
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
  root: {
    padding: theme.spacing(3, 3),
    display: "flex",
    justifyContent: "center",
    margin: "auto",
    width: "70%",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    flex: "50%",
    width: "50%",
  },
}));
