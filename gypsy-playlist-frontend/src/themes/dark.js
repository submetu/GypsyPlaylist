import { makeStyles } from "@material-ui/core/styles";

const DarkTheme = makeStyles(theme => ({
  background: {
    backgroundColor: "rgba(0, 0, 0, 0.85)"
  },
  button: {
    backgroundColor: "#3f51b5"
  },
  disabled: {
    color: "rgba(197, 197, 197, 0.52) !important",
    backgroundColor: "rgba(0,0,0,0.2) !important"
  },
  primaryColor:{
    color: "#f50057 !important"
  }
}));
export default DarkTheme;
