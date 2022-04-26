import { Button, TextField, Paper, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function FormData() {
  const classes = useStyles();
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
            name="email"
            //   defaultValue={formInput.name}
            className={classes.textField}
            helperText="e.g. name@gmail.com"
            //   onChange={handleInput}
          />
          <TextField
            label="Tanggal Lahir"
            id="margin-normal"
            name="email"
            //   defaultValue={formInput.name}
            className={classes.textField}
            helperText="e.g. name@gmail.com"
            //   onChange={handleInput}
          />
          <TextField
            label="Jenis Kelamin"
            id="margin-normal"
            name="email"
            //   defaultValue={formInput.name}
            className={classes.textField}
            helperText="e.g. name@gmail.com"
            //   onChange={handleInput}
          />
          <TextField
            label="Email"
            id="margin-normal"
            name="email"
            //   defaultValue={formInput.name}
            className={classes.textField}
            helperText="e.g. name@gmail.com"
            //   onChange={handleInput}
          />
          <TextField
            label="No Telp"
            id="margin-normal"
            name="email"
            //   defaultValue={formInput.name}
            className={classes.textField}
            helperText="e.g. name@gmail.com"
            //   onChange={handleInput}
          />
          <TextField
            label="Alamat Lengkap"
            id="margin-normal"
            name="email"
            //   defaultValue={formInput.name}
            className={classes.textField}
            helperText="e.g. name@gmail.com"
            //   onChange={handleInput}
          />

          <Select
            className={classes.textField}
            labelId="demo-simple-select-error-label"
            id="demo-simple-select-error"
            value="Kecamatan"
            placeholder="kecamatan"
            label="Age"
            //   onChange={handleChange}
            renderValue={(value) => `Provinsi - ${value}`}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
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
    margin: theme.spacing(1),
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
    padding: theme.spacing(5, 5),
    display: "flex",
    justifyContent: "center",
    margin: "auto",
    width: "70%",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
  },
}));
