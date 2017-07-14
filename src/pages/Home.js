import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';

//import * as firebase from 'firebase';
import { db, storage, delteOnValue } from '../api/firebase';

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
//import ModeEditIcon from 'material-ui-icons/ModeEdit';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';


class Home extends Component {

  state = {
    items: {
      
    },
    dialogDelete: false,
  }

  componentDidMount(){

    db.ref('items')
    .on('value', snapshot => {
      let items = snapshot.val()
      this.setState({
        items,
      })
    });
  }

  handleDeleteItem = (itemId) => {

    delteOnValue('items','itemId',itemId); //(ref,key,value)
    storage.ref('items').child('image_'+itemId).delete();

  }

  render() {

    let { items, dialogDelete } = this.state

    items = _.orderBy(items, 'createAt', 'desc')
    items = _.take(items, 3)

    return (
      <div id="Home">
        <div className="button-create-item">
          <Link to="/item/create">
            <Button fab color="primary">
              <AddIcon />
            </Button>
          </Link>
        </div>

        <Grid container style={{width: '100%', margin: 0,}}>
          <Grid item xs={12}>
            <Grid container justify="flex-start" >
              {_.isEmpty(items) &&
                <Grid item xs={12} style={{textAlign: 'center'}}>
                  <CircularProgress/>
                </Grid>
              }
              {_.map(items, (data, key) =>{
                return (
                  <Grid key={key} item  xs={12} sm={6} md={4}>
                    <Card>
                      <CardMedia>
                        <img src={data.imageUrl} alt="Contemplative Reptile" style={{width: '100%'}} />
                      </CardMedia>
                      <CardContent>
                        <Typography type="headline" gutterBottom >
                          {data.title}
                        </Typography>
                        <Typography type="body1" gutterBottom >
                          {data.description}
                        </Typography>
                        <Typography type="caption">
                          {moment(data.createAt).fromNow()}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Link to={'/item/edit/?itemId='+data.itemId}>
                        <Button dense color="primary">
                          EDIT
                        </Button>
                        </Link>
                        <Button dense color="primary" onClick={() => this.setState({dialogDelete: data.itemId})}>
                          DELETE
                        </Button>
                        <Dialog open={dialogDelete===data.itemId} onRequestClose={() => this.setState({dialogDelete: false})}>
                          <DialogTitle>
                            {'DELETE '+data.title}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              DELETE ?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={() => this.setState({dialogDelete: false})} color="primary">
                              NO
                            </Button>
                            <Button onClick={() => this.handleDeleteItem(data.itemId)} color="primary">
                              DELETE
                            </Button>
                          </DialogActions>
                        </Dialog>
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
