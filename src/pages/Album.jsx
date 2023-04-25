import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    name: '',
    album: '',
    musics: [],
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
      // Exclui o primeiro item da lista de músicas, já que ele contém as informações do álbum,
    });
  };

  render() {
    const { name, album, musics } = this.state;
    return (
      <>
        <div data-testid="page-album" />
        <div>
          <p data-testid="artist-name">{name}</p>
          <p data-testid="album-name">{album}</p>
          {musics.map((music, index) => (
            <MusicCard
              key={ index }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              artworkUrl100={ music.artworkUrl100 }
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
