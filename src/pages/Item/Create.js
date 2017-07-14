import React, { Component } from 'react';
import cuid from 'cuid';
import _ from 'lodash';
//import { Redirect } from 'react-router';
import moment from 'moment';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
//import Card, { CardMedia } from 'material-ui/Card';

import { db, storage } from '../../api/firebase';

class ItemCreate extends Component {

  state = {
    title: '',
    description: '',
    file: '',
    image64: '',
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
      storage.ref('items').child(imageId).put(file)
      .then((snapshot) => {

        console.log('uploaded')
        storage.ref('items').child(imageId).getDownloadURL()
        .then((imageUrl) => {

          db.ref('items')
          .push({
            itemId,
            title,
            description,
            imageUrl,
            createAt,
          })
          .then(() => {
            this.props.history.push('/')
          })

        });

      })
    }

  }

  handleChange = (e) => {
    const file = e.target.files[0];
    const _this = this
    
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      _this.setState({ 
        file, 
        image64: reader.result
      })
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

    
  }

  render() {
    
    const { disableSubmit, image64 } = this.state;
    //const imageUrl = this.state.imageUrl;
    console.log('State',this.state)

    return (
      <div id="ItemCerate">
        <Grid container justify={'center'} id="wrapper">
          <Grid item xs={12} sm={6} md={4} >
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
                onChange={this.handleChange}
              />
              <label htmlFor="file">
                <Button raised component="span">
                  Upload
                </Button>
              </label>
              {image64 &&
                <img src={image64} alt="Contemplative Reptile" style={{width: '100%'}} />
              }
              <button onSubmit={this.handleSubmit} style={{width: '100%', padding: 0}}>
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
