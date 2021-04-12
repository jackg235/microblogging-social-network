import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

const styles = {
    card: {
        // backgroundColor: 'red'
    }
};

class User extends React.Component {
    render() {
        const {
            classes,
            user: {
                userImg,
                username,
                firstName,
                lastName,
                regDate,
                followers,
                following,
                blocking,
                hidden,
            }
        } = this.props;

        return (
                <Grid item>
                    <Card variant='outlined' className={classes}>
                        <CardHeader
                            style={styles.card}
                            avatar={<Avatar variant="rounded" src={userImg} alt={username}/>}
                            title={
                                <Typography
                                    component={Link}
                                    to={`/users/${username}`}>
                                    {username}
                                </Typography>}
                            
                        />
                        
                    </Card>
                </Grid>
        )
    }
}

export default User;