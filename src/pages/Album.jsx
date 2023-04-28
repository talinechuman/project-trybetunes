import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    name: '',
    album: '',
    musics: [],
    loading: true,
    favorite: false,
  };

  componentDidMount() {
    this.getApiMusics();
    // this.isFavorites();
  }

  getApiMusics = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const listMusics = await getMusics(id);
    const { artistName, collectionName } = listMusics[0];

    this.setState({
      name: artistName,
      album: collectionName,
      musics: listMusics.slice(1),
      loading: false,
    });
  };

  loadingChange = (bool) => {
    this.setState({ loading: bool });
  };

  handleAddSong = async (music) => {
    // await this.isFavorites(music.trackId);
    await addSong(music);
  };

  handleRemoveSong = async (music) => {
    // await this.isFavorites(music.trackId);
    await removeSong(music);
  };

  // isFavorites = async (trackId) => {
  //   this.setState({ loading: true });
  //   const musicsFavorites = await getFavoriteSongs();
  //   this.setState({
  //     favorite: musicsFavorites.some((music) => music.trackId === trackId),
  //     loading: false,
  //   });
  // };

  render() {
    const { name, album, musics, loading, favorite } = this.state;
    return (
      <>
        <div data-testid="page-album" />
        <div>
          <p data-testid="artist-name">{name}</p>
          <p data-testid="album-name">{album}</p>
          {loading && <Loading />}
          {musics.map((music) => (
            <MusicCard
              key={ music.trackId }
              trackId={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              artworkUrl100={ music.artworkUrl100 }
              onAddSong={ () => this.handleAddSong(music) }
              removeSong={ () => this.handleRemoveSong(music) }
              isFavorites={ favorite }
              checked={ favorite }
              loadingChange={ this.loadingChange }
            />
          ))}
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  // trackId: PropTypes.string,
  // isFavorites: PropTypes.func.isRequired,
};

Album.defaultProps = {
  // trackId: '',
};

export default Album;
