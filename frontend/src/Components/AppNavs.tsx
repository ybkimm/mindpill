import React from 'react';
import { makeStyles, Theme, withStyles, createStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Box, Paper } from '@material-ui/core';
import { Link, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
    },
    tab: {
        '&$selected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
            backgroundColor: 'red',
        },
    },
    page: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
    }
}));

interface NavTabProps {
    label: string;
    component: any;
    to: any;
}

const NavTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover': {
        opacity: 1,
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.light,
      },
      '&$selected': {
        color: theme.palette.primary.contrastText,
        fontWeight: theme.typography.fontWeightBold,
        backgroundColor: theme.palette.primary.main,
      },
      '&:focus': {
          
      },
    },
    selected: {},
  }),
)((props: NavTabProps) => <Tab {...props} />);

interface AppNavsProps {
    children?: React.ReactNode;
}

export default function AppNavs(props: AppNavsProps) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const { children } = props;

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Paper square elevation={3}>
                <Tabs
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                    aria-label="App Navs"
                    centered
                >
                    <NavTab label="홈" component={Link} to="/" />
                    <NavTab label="로그인" component={Link} to="/login" />
                    <NavTab label="회원가입" component={Link} to="/join" />
                    <NavTab label="상담하기" component={Link} to="/chat" />
                    <NavTab label="내정보" component={Link} to="/mypage" />
                </Tabs>
            </Paper>
            <Box className={classes.page}>
                {children}
            </Box>
                
            
            
        </div>
    );
}