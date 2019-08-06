import { makeStyles } from '@material-ui/core/styles';
import { ThemeType } from 'themes';

const PrimaryColor = '#f50057';
const HeadingColor = '#fff';

const DarkTheme = makeStyles<ThemeType>(theme => ({
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
  secondaryBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
  },
  button: {
    backgroundColor: '#3f51b5',
  },
  disabled: {
    color: 'rgba(197, 197, 197, 0.52) !important',
    backgroundColor: 'rgba(0,0,0,0.2) !important',
  },
  primaryColor: {
    color: `${PrimaryColor} !important`,
  },
  MainAppBar: {
    backgroundColor: `${PrimaryColor}`,
  },
  headingColor: {
    color: HeadingColor,
  },
}));
export default DarkTheme;
