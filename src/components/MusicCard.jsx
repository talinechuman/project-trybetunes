import React from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    favoriteList: [],
  };

  componentDidMount() {
    this.updateFavoriteList();
  }

  handleChange = async (event) => {
    const { target } = event;
    const { onAddSong, removeSong, loadingChange } = this.props;
    loadingChange(true);

    if (target.checked) {
      await onAddSong();
    } else {
      await removeSong();
    }
    await this.updateFavoriteList();
    loadingChange(false);
  };

  updateFavoriteList = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({ favoriteList: favorites });
  };

  render() {
    const { trackName,
      previewUrl,
      artworkUrl100,
      trackId,
    } = this.props;

    const { favoriteList } = this.state;

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
              checked={ favoriteList.some((music) => music.trackId === trackId) }
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
  trackId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onAddSong: PropTypes.func.isRequired,
  removeSong: PropTypes.func.isRequired,
  loadingChange: PropTypes.func.isRequired,
};

MusicCard.defaultProps = {
  trackName: '',
  previewUrl: '',
  artworkUrl100: '',
  trackId: '',
};

export default MusicCard;
