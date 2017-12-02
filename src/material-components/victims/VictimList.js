import React from 'react'
import Grid from 'material-ui/Grid';
import {withStyles} from 'material-ui/styles';
import Victim from './Victim'
import _ from 'lodash'

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    },
    paper: {
        padding: 16,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class VictimList extends React.Component {
    constructor(props, context){
        super(props, context);
        this.state = {};
    }

    renderVictim(account) {
        return (
            <Grid item xs={12}>
                <Victim account={account}/>
            </Grid>
        )
    }

    render (){
        const {classes, theme} = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    {_.map(['lopatiy_'], this.renderVictim.bind(this))}
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(VictimList);