import React from 'react';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import {withStyles} from 'material-ui/styles';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import agent from '../../agent';
import _ from 'lodash';

const styles = theme => ({
    card: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
        height: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
});

class Victim extends React.Component{
    constructor(props, context){
        super(props, context);

        this.state = {
            account : null
        }
    }

    componentDidMount(){
        agent.IG.account(this.props.account).then(account => this.setState({account}))
    }

    render(){
        const { classes, theme } = this.props;
        const {account} = this.state;

        let details = 'Loading',
            pic = "https://techreport.com/forums/styles/canvas/theme/images/no_avatar.jpg";
        if(!_.isNull(account)){
            details = (
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography type="headline">{account.username}</Typography>
                        <Typography type="subheading" color="secondary">
                            {account.fullName}
                        </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                        <IconButton aria-label="Play/pause">
                            <PlayArrowIcon className={classes.playIcon} />
                        </IconButton>
                    </div>
                </div>
            );
            pic = account.picture;
        }

        return (
            <div>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cover}
                        image={pic}
                        title="Live from space album cover"
                    />
                    {details}
                </Card>
            </div>
        );
    }
}
export default withStyles(styles)(Victim);