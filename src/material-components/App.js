import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import Accounts from 'material-ui-icons/People';
import MenuIcon from 'material-ui-icons/Menu';
import AddToQueue from 'material-ui-icons/AddToQueue';
import {Switch, Route} from 'react-router-dom';
import {withRouter} from 'react-router';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        height: '100vh',
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        zIndex: theme.zIndex.navDrawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        height: '100%',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        width: 60,
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    drawerInner: {
        // Make the items inside not wrap when transitioning:
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: 24,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    },
});

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
};

const PropsRoute = ({component, ...rest}) => {
    return (
        <Route {...rest} render={routeProps => {
            return renderMergedProps(component, routeProps, rest);
        }}/>
    );
};

class App extends React.Component {
    state = {
        open: false,
    };

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    drawer() {
        const {classes, theme} = this.props;

        return (
            <Drawer type="permanent"
                    classes={{paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose)}}
                    open={this.state.open}>
                <div className={classes.drawerInner}>
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>
                        <ListItem button onClick={()=>this.props.history.push('/victims')}>
                            <ListItemIcon>
                                <Accounts/>
                            </ListItemIcon>
                            <ListItemText primary="Victims" />
                        </ListItem>
                        <ListItem button onClick={()=>this.props.history.push('/videos')}>
                            <ListItemIcon>
                                <AddToQueue/>
                            </ListItemIcon>
                            <ListItemText primary="Videos"/>
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        )
    }

    content() {
        return (
            <Switch>
                <div className="home-page">
                    <div className="container page">
                        <div className="row">
                            <Route path="/" exact key="feed" component={null} place=""/>
                            <PropsRoute path="/uploaded" exact key="uploaded" component={null} place="uploaded"/>
                            <Route path="/login" key="login" component={null}/>
                        </div>
                    </div>
                </div>
            </Switch>
        )
    }

    render() {
        const {classes, theme} = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
                        <Toolbar disableGutters={!this.state.open}>
                            <IconButton
                                color="contrast"
                                aria-label="open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(classes.menuButton, this.state.open && classes.hide)}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography type="title" color="inherit" noWrap>
                                Lighthouse
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    {this.drawer()}
                    <main className={classes.content}>
                        {this.content()}
                    </main>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const stylesApp = withStyles(styles, {withTheme: true})(App);
const mapStateToProps = (state) => ({routing: state.routing});
export default withRouter(connect(mapStateToProps, () => ({}))(stylesApp))