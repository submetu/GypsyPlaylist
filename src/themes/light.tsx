import { makeStyles } from '@material-ui/core/styles';
import { ThemeType } from 'themes';

export const LightTheme = makeStyles<ThemeType>(theme => ({
  primaryColor: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
}));
export default LightTheme;
