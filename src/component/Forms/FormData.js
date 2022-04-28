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
import { Link, useNavigate } from "react-router-dom";
export default function FormData(props) {
  const classes = useStyles();
  //input
  const [myName, setMyname] = useState("");
  const [ktp, setKtp] = useState("");
  const [emails, setEmails] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  // Provinsi
  const [prov, getProv] = useState("");
  const [selectProvince, getSelectedProvince] = useState("");
  const [province, setProvince] = useState([]);
  //Kota
  const [kota, getKota] = useState("");
  const [selectCity, getSelectedCity] = useState("");
  const [city, setCity] = useState([]);
  //Kecamatan
  const [kec, getKec] = useState("");
  const [selectkecamatan, getSelectedkecamatan] = useState("");
  const [camat, setCamat] = useState([]);
  //kelurahan
  const [kel, getKel] = useState("");
  const [selectkelurahan, getSelectedkelurahan] = useState("");
  const [lurah, setlurah] = useState([]);
  //PostCode
  const [postalcode, setPostalCode] = useState([]);
  const [gender, setGender] = useState([]);
  const [birthdate, setBirthDate] = useState(new Date());
  const MyGender = [
    { id: 1, title: "Pria", value: "Pria" },
    { id: 2, title: "Wanita", value: "wanita" },
  ];
  const sendname = (event) => {
    setMyname(event.target.value);
  };
  const sendEmail = (event) => {
    setEmails(event.target.value);
  };
  const sendAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleSelect = (event) => {
    getSelectedProvince(event.target.value);
    getProv(event.currentTarget.getAttribute("a-key"));
  };
  const citySelect = (event) => {
    getSelectedCity(event.target.value);
    getKota(event.currentTarget.getAttribute("a-key"));
  };
  const camatSelect = (event) => {
    getSelectedkecamatan(event.target.value);
    getKec(event.currentTarget.getAttribute("a-key"));
  };
  const lurahSelect = (event) => {
    getSelectedkelurahan(event.target.value);
    getKel(event.currentTarget.getAttribute("a-key"));
  };
  const handleKtp = (event, value) => {
    if (event.target.value.length >= 17) {
      Swal.fire({
        icon: "error",
        title: "Max Length 16 Character",
      });
    } else {
      setKtp(event.target.value);
    }
    console.log("ktp", ktp);
  };
  const phoneMaxLength = (event, value) => {
    if (event.target.value.length >= 14) {
      Swal.fire({
        icon: "error",
        title: "Max Length 13 Character",
        text: "Check The Length Of Your Phone number Again",
      });
    } else {
      setPhone(event.target.value);
    }
  };
  const HandleProvince = () => {
    axios.get(`${APIDATA}/province`).then((res) => setProvince(res.data.data));
  };
  const navigate = useNavigate();
  const OnSubmitData = () => {
    navigate("/summary", {
      state: {
        id: 1,
        name: myName,
        ktp: ktp,
        birth: birthdate,
        gender: gender,
        email: emails,
        phone: phone,
        address: address,
        province: prov,
        city: kota,
        kecamatan: kec,
        kelurahan: kel,
      },
    });
  };

  useEffect(() => {
    HandleProvince();
    const HandleCity = () => {
      try {
        axios
          .get(`${APIDATA}/city/?province_id=${selectProvince}`)
          .then((res) => setCity(res.data.data));
      } catch (e) {
        console.log("error", e);
      }
    };
    const HandleKecamatan = () => {
      axios
        .get(`${APIDATA}/kecamatan/?city_id=${selectCity}`)
        .then((res) => setCamat(res.data.data));
    };
    const HandleKelurahan = () => {
      axios
        .get(`${APIDATA}/kelurahan/?kecamatan_id=${selectkecamatan}`)
        .then((res) => setlurah(res.data.data));
    };
    HandleCity();
    HandleKecamatan();
    HandleKelurahan();
  }, [selectProvince, selectCity, selectkecamatan]);

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
            onChange={sendname}
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
                <MenuItem key={item.id} value={item.value}>
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
            className={classes.textField}
            helperText="e.g. name@gmail.com"
            onChange={sendEmail}
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
            onChange={sendAddress}
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
                <MenuItem key={item.id} value={item.id} a-key={item.name}>
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
                  <MenuItem key={item.id} value={item.id} a-key={item.name}>
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
                  <MenuItem key={item.id} value={item.id} a-key={item.name}>
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
                  <MenuItem key={item.id} value={item.id} a-key={item.name}>
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
