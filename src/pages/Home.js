import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import * as firebase from 'firebase';

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';


class Home extends Component {

  state = {
    items: {},
  }

  componentDidMount(){
    firebase.database().ref('items').on('value',snapshot => {
      this.setState({
        items: snapshot.val()
      });
    });
  }

  handleDeleteItem = (itemId) => {

    firebase.database().ref('items').child(itemId).remove();

    firebase.storage().ref('items').child('image_'+itemId).delete();

  }

  render() {

    const { items } = this.state

    return (
      <div id="Home">
          <div className="button-create-item">
            <Link to="/item/create">
              <Button fab color="primary">
                <AddIcon />
              </Button>
            </Link>
          </div>


        <Grid container gutter={8} style={{width: '100%', margin: 0,}}>
          <Grid item xs={12}>
            <Grid container justify="flex-start" gutter={8}>
              {_.map(items, (data, key) =>{
                return (
                  <Grid key={key} item  xs={12} sm={6} md={4}>
                    <Card>
                      <CardMedia>
                        <img src={data.imageUrl} alt="Contemplative Reptile" style={{width: '100%'}} />
                      </CardMedia>
                      <CardContent>
                        <Typography type="headline" component="h2">
                          {data.title}
                        </Typography>
                        <Typography component="p">
                          {data.title}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button dense color="primary">
                          Share
                        </Button>
                        <Button dense color="primary" onClick={() => this.handleDeleteItem(key)}>
                          DELETE
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Home;
