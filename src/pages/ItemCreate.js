import React, { Component } from 'react';
import cuid from 'cuid';
import _ from 'lodash';
import { Redirect } from 'react-router';
import moment from 'moment';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

import * as firebase from 'firebase';

class ItemCreate extends Component {

  state = {
    title: '',
    description: '',
    file: '',
    imageUrl: '',
    disableSubmit: false, 
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { title, description, file } = this.state 
    const itemId = cuid();
    const imageId = 'image_'+itemId;
    const createAt = moment().format();

    if( _.isEmpty(title) || _.isEmpty(description) || _.isEqual(file,'') ){

    }else{
      this.setState({
        disableSubmit: true,
      })
      firebase.storage().ref('items')
      .child(imageId)
      .put(file)
      .then((snapshot) => {
        console.log('uploaded')
        firebase.storage().ref('items')
        .child(imageId)
        .getDownloadURL()
        .then((imageUrl) => {

          firebase.database().ref('items')
          .child(itemId)
          .set({
            title,
            description,
            imageUrl,
            createAt,
          }).then(() => {
            this.props.history.push('/')
          })

        });

      })
    }

  }

  handleChange = (info) => {


  }

  render() {
    
    const { disableSubmit } = this.state;
    const imageUrl = this.state.imageUrl;

    return (
      <div id="ItemCerate">
        <Grid container gutter={0} justify={'center'}>
          <Grid item xs={10} sm={6} md={4} >
            <h1>Create Item</h1>
            <form onSubmit={this.handleSubmit}>
              <TextField
                id="title"
                label="Title"
                onChange={e => this.setState({ title: e.target.value })}
                fullWidth
                marginForm
              />
              <TextField
                id="description"
                label="Description"
                onChange={e => this.setState({ description: e.target.value })}
                fullWidth
                marginForm
              />
              <input accept="jpg,jpeg,JPG,JPEG" id="file" multiple type="file" 
                style={{display: 'none'}}
                onChange={e => this.setState({ file: e.target.files[0] })}
              />
              <label htmlFor="file">
                <Button raised component="span">
                  Upload
                </Button>
              </label>
              <button onSubmit={this.handleSubmit} style={{width: '100%'}}>
                <Button raised color="accent" style={{width: '100%'}} disabled={disableSubmit}>
                  POST
                </Button>
              </button>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ItemCreate;
