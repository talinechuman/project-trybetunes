import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, artworkUrl100 } = this.props;
    return (
      <>
        <div>
          <p>{trackName}</p>
          <img src={ artworkUrl100 } alt={ trackName } />
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
};

MusicCard.defaultProps = {
  trackName: '',
  previewUrl: '',
  artworkUrl100: '',
};

export default MusicCard;
