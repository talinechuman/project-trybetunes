import React from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    isFavorites: false,
  };

  // componentDidMount() {
  //   const { trackId } = this.props;
  //   const musicsFavorites = JSON.parse(localStorage.getItem('favorite_songs'));
  //   console.log(getFavoriteSongs);
  //   this.setState({
  //     isFavorites: musicsFavorites.some((music) => music.trackId === trackId) });
  // }

  async componentDidMount() {
    const { trackId } = this.props;
    const musicsFavorites = await getFavoriteSongs();
    this.setState({
      isFavorites: musicsFavorites.some((music) => music.trackId === trackId),
    });
  }

  handleChange = (event) => {
    const { target } = event;
    const { onAddSong } = this.props;
    console.log(target.checked);
    this.setState({ isFavorites: target.checked });
    if (target.checked) {
      onAddSong();
    }
  };

  render() {
    const { trackName,
      previewUrl,
      artworkUrl100,
      trackId,
    } = this.props;

    const { isFavorites } = this.state;

    return (
      <>
        <div>
          <p>{trackName}</p>
          <img src={ artworkUrl100 } alt={ trackName } />
          <label>
            Favorita
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.handleChange }
              checked={ isFavorites }
            />
          </label>
        </div>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
      </>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  artworkUrl100: PropTypes.string,
  trackId: PropTypes.number,
  onAddSong: PropTypes.func.isRequired,
};

MusicCard.defaultProps = {
  trackName: '',
  previewUrl: '',
  artworkUrl100: '',
  trackId: '',
};

export default MusicCard;
