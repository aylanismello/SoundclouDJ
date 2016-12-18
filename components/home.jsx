import React from 'react';
// In renderer process (web page).
import {ipcRenderer} from 'electron';

class Home extends React.Component {

  constructor(props) {
    super(props);

    ipcRenderer.on('load-playlists-reply', (event, arg) => {
      console.log(`${arg} received!`);
    });

    let data = ipcRenderer.sendSync('load-data');
    let { playlists, rootFolderPath } = data;

    // the initial state of the playlists comes
    // from json.. needs IPC from electron
    this.state = {
      playlists,
      msg: "" ,
      isFetching: false,
      rootFolderPath
    };
  }

  handleChange(idx, e) {
    let {playlists} = this.state;
    playlists[idx] = e.target.value;
    this.setState({playlists});
  }

  handleFolderChange(e) {
    this.setState({rootFolderPath: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('submitted as fuck');
    ipcRenderer.sendSync('update-data', {playlists: this.state.playlists, rootFolderPath: this.state.rootFolderPath});
  }

  handleSubmitFolder(e) {
    e.preventDefault();
    console.log('updated folder path');
    ipcRenderer.sendSync('update-data', {playlists: this.state.playlists, rootFolderPath: this.state.rootFolderPath});
  }

  addPlaylist(e) {
    let {playlists} = this.state;
    playlists = playlists.concat([""]);
    this.setState({playlists});
  }

  removePlaylist(idx, e) {
    let {playlists} = this.state;
    // what is idx is the playlist length?
    playlists = playlists.slice(0, idx).concat(playlists.slice(idx + 1, playlists.length))
    this.setState({playlists});
  }

  fetchPlaylists(e) {

    // the call back for when we receive stuff..

    ipcRenderer.on('receive-playlists', (event, arg) => {

      console.log(`received ${arg} in renderer process!`);
      this.setState({
        msg: arg,
        isFetching: false
      });
    });

    ipcRenderer.send('download-playlists');

    this.setState({
      isFetching: true,
      msg: 'Fetching Soundcloud playlists...'
    });
    // disable fetch playlists button here
  }

  render() {
    let {playlists} = this.state;

    playlists = playlists.map( (url, idx) => {
      return (
        <div className="playlist-item">
          <input type="text"
            className="playlist-input form-control"
            value={url}
            onChange={::this.handleChange(idx)}
            />
          <button onClick={::this.removePlaylist(idx)}
            className="btn btn-mini btn-negative">
            X
          </button>

        </div>
      );
    });

    return (
      <div className="window">
        <div className="app-container">

          <form onSubmit={::this.handleSubmit}>
            {playlists}
            <button type="submit">Update Playlists</button>
            <button onClick={::this.addPlaylist}>
              Add Playlist
            </button>

            <button
              onClick={::this.fetchPlaylists}
              disabled={this.state.isFetching} >
              Fetch Playlists
            </button>

            {/*This will be handled with dialog module */}

          </form>

          <div className="folder-path-container">
            <form onSubmit={::this.handleSubmitFolder)}>
              <input type="text"
                className="folder-path form-control"
                value={this.state.rootFolderPath}
                onChange={::this.handleFolderChange)}
              />
              <button type="submit">Update Folder Path</button>
            </form>
          </div>


          <h3> {this.state.msg} </h3>
        </div>
      </div>
    );
  }
}


export default Home;
