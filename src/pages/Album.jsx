import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { addSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    name: '',
    album: '',
    musics: [],
    loading: true,
  };

  componentDidMount() {
    this.getApiMusics();
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

  handleAddSong = async (music) => {
    this.setState({ loading: true });
    await addSong(music);
    this.setState({ loading: false });
  };

  // isFavorites = async () => {
  //   this.setState({ loading: true });
  //   const favorite = await getFavoriteSongs();
  //   this.setState({ favorite, loading: false });
  // };

  render() {
    const { name, album, musics, loading } = this.state;
    return (
      <>
        <div data-testid="page-album" />
        <div>
          <p data-testid="artist-name">{name}</p>
          <p data-testid="album-name">{album}</p>
          {loading === true && <Loading />}
          {!loading && musics.map((music) => (
            <MusicCard
              key={ music.trackId }
              trackId={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              artworkUrl100={ music.artworkUrl100 }
              onAddSong={ () => this.handleAddSong(music) }
              // isFavorites={ this.isFavorites }
              // checked={
              //   favorite.some(({ trackId }) => trackId === music.trackId)
              // }
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
};

export default Album;
