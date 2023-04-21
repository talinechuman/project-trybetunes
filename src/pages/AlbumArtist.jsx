import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumArtist extends React.Component {
  render() {
    const {
      info: {
        artistName,
        collectionName,
        artworkUrl100,
        collectionId, // Adicione collectionId como propriedade
      },
    } = this.props;

    // Renderizar os dados do álbum, incluindo o Link para a página do álbum
    return (
      <div>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <h3>{collectionName}</h3>
        <span>{artistName}</span>
        {/* Adicione o Link com o atributo data-testid e a rota correta */}
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Ver detalhes

        </Link>

      </div>
    );
  }
}

// Definir os tipos de propriedades esperados
AlbumArtist.propTypes = {
  info: PropTypes.shape({
    artistId: PropTypes.number,
    artistName: PropTypes.string,
    search: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    collectionPrice: PropTypes.number,
    artworkUrl100: PropTypes.string,
    releaseDate: PropTypes.string,
    trackCount: PropTypes.number,
  }).isRequired,
};

export default AlbumArtist;
