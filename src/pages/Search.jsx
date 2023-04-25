import React from 'react';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Album from './AlbumArtist';

class Search extends React.Component {
  state = {
    search: '',
    albunsSearch: [],
    loadingSearch: false,
    invalidRequest: false,
    searchInput: '',
  };

  validateButtonSearch = () => {
    const { search } = this.state;
    const numMin = 2;
    return search.length < numMin;
  };

  getAlbuns = async () => {
    const { search } = this.state;
    const searchInput = search;

    this.setState({ search: '' });

    const albunsSearch = await searchAlbumsAPI(search);
    if (albunsSearch.length === 0) {
      this.setState({
        searchInput,
        invalidRequest: true,
        albunsSearch: [],
      });
    } else {
      this.setState({
        searchInput,
        albunsSearch,
        invalidRequest: false,
      });
    }
  };

  renderAlbums = () => {
    const { albunsSearch, invalidRequest, searchInput } = this.state;
    if (!invalidRequest) {
      return (
        <section>
          {
            albunsSearch.length > 0 && (
              <p>{`Resultado de álbuns de: ${searchInput}`}</p>
            )
          }
          {albunsSearch.map((album) => (
            <Album key={ album.collectionId } info={ album } />
          ))}
        </section>
      );
    }
    return <p data-testid="no-albums-found">Nenhum álbum foi encontrado</p>;
  };

  onInputChange = ({ target }) => {
    this.setState({ search: target.value });
  };

  render() {
    const { loadingSearch, search } = this.state;
    return (
      <div data-testid="page-search">
        <p>Search</p>
        <input
          data-testid="search-artist-input"
          type="text"
          name="search"
          value={ search }
          onChange={ this.onInputChange }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ this.validateButtonSearch() }
          onClick={ this.getAlbuns }
        >
          Pesquisar
        </button>
        {loadingSearch && <Loading />}
        <section>
          {this.renderAlbums()}
        </section>
      </div>
    );
  }
}

export default Search;
