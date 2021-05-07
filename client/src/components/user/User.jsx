import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';
import DefaultProPic from '../../default_propic.jpg';

class User extends React.Component {
    render() {
        return (
                <Grid item>
                    <Card variant='outlined'>
                        <CardHeader
                            style={{backgroundColor: '#e3e3e3'}}
                            avatar={<Avatar variant="rounded" src={DefaultProPic} alt={this.props.username}/>}
                            title=
                                {<Typography
                                    component={Link}
                                    to={`/profiile/${this.props.username}`}>
                                    {this.props.username}
                                </Typography>} />
                    </Card>
                </Grid>
        )
    }
}

export default User;