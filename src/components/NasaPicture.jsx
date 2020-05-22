import React from 'react';
import p1 from './../p1.jpg';
import axios from 'axios';
import ReactLoading from 'react-loading';

export default class NasaPicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lon: '',
      lat: '',
      earthPic: p1,
      loading: false
    };
  }

  submitHandler = (event) => {
    event.preventDefault();
    const { lon, lat } = this.state;
    this.setState({ loading: true })
    this.getData(lon, lat);
    this.setState({ lon: '', lat: '' });
  };

  getData(lon, lat) {
    const API_KEY = 'nxKl8yTvpvsXEqRz06mTPnn29uyckFmFCYrnqEIz';

    axios
      .get(
        `https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&date=2020-05-20&api_key=${API_KEY}`
      )
      .then((response) => {
        this.setState({
          earthPic: response.config.url,
          loading: false
        });
      })
      .catch((error) => {
        console.log(error, 'failed to fetch data');
        this.setState({
          earthPic: p1,
          loading: false
        });
      });
  }

  changeInputHandler = (event) => {
    event.persist();
    this.setState((prev) => ({
      ...prev,
      ...{ [event.target.name]: event.target.value },
    }));
  };

  render() {
    const { loading, earthPic } = this.state
    const content = () => {
      switch(true) {
        case loading:
          return <ReactLoading type='balls' color='#CBBEB5'/>
        case earthPic.length >0:
          return <img src={earthPic} className="img-thumbnail" alt="p1" />
        default:
          return <img src={p1} className="img-thumbnail" alt="p1" />
      }
    }
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <div className="form-group">
            <label htmlFor="title">Longitude</label>
            <input
              type="number"
              className="form-control"
              name="lon"
              step="0.1"
              value={this.state.lon}
              onChange={this.changeInputHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Latitude</label>
            <input
              type="number"
              className="form-control"
              name="lat"
              step="0.1"
              value={this.state.lat}
              onChange={this.changeInputHandler}
            />
          </div>
          <button className="btn btn-success" type="submit">
            Start
          </button>
        </form>
        <br />
        {content()}
      </div>
    );
  }
}
