import React, { Component } from 'react';
//import cuid from 'cuid';
import _ from 'lodash';
//import { Redirect } from 'react-router';
import moment from 'moment';
import queryString from 'query-string';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

import { db, storage } from '../../api/firebase';

class ItemCreate extends Component {

  state = {
    title: '',
    description: '',
    file: '',
    image64: '',
    itemId: '',
    disableSubmit: false, 
  }

  componentWillMount() {

    const { search } = this.props.location;

    const param = queryString.parse(search);
    const itemId = param.itemId

    db.ref('items').orderByChild('itemId').equalTo(itemId).on('value',snapshot => {
      snapshot.forEach(snap => {
        this.setState({
          title: snap.val().title,
          description: snap.val().description,
          image64: snap.val().imageUrl,
          itemId: snap.val().itemId,
        })
      })
    })
  }

  handleChangeImage = (e) => {
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

  handleSubmit = (e) => {
    e.preventDefault();

    const { title, description, file, itemId } = this.state
    const imageId = 'image_'+itemId;
    const updateAt = moment().format();

    this.setState({
        disableSubmit: true,
      })

    if(  _.isEqual(file,'') ){
      db.ref('items').orderByChild('itemId').equalTo(itemId).once('child_added',snapshot => {
        snapshot.ref.update({
          title,
          description,
          updateAt,
        }).then(() => {
          this.props.history.push('/')
        })
      })
      
    }else{
      
      storage.ref('items').child('image_'+itemId).delete();

      storage.ref('items').child(imageId).put(file)
      .then((snapshot) => {

        console.log('uploaded')
        storage.ref('items').child(imageId).getDownloadURL()
        .then((imageUrl) => {
          db.ref('items').orderByChild('itemId').equalTo(itemId).on('child_added',snapshot => {
            snapshot.ref.update({
              title,
              description,
              imageUrl,
              updateAt,
            }).then(() => {
              this.props.history.push('/')
            })
          })

        });

      })
    }

  }

  handleChange = (info) => {


  }

  render() {
    
    const { disableSubmit, title, description, image64 } = this.state;
    console.log('State',this.state)

    return (
      <div id="ItemCerate">
        <Grid container justify={'center'} id="wrapper">
          <Grid item xs={12} sm={6} md={4} >
            <h1>Edit Item</h1>
            <form onSubmit={this.handleSubmit}>
              <TextField
                id="title"
                label="Title"
                onChange={e => this.setState({ title: e.target.value })}
                value={title}
                fullWidth
                marginForm
              />
              <TextField
                id="description"
                label="Description"
                onChange={e => this.setState({ description: e.target.value })}
                value={description}
                fullWidth
                marginForm
              />
              <input accept="jpg,jpeg,JPG,JPEG" id="file" multiple type="file" 
                style={{display: 'none'}}
                onChange={this.handleChangeImage}
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
