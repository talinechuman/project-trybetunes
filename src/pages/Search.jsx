import React from 'react';
import Loading from '../components/Loading';

class Search extends React.Component {
  state = {
    searchInput: '',
    loadingSearch: false,
  };

  validateButtonSearch = () => {
    const { searchInput } = this.state;
    const numMin = 2;
    return searchInput.length < numMin;
  };

  render() {
    const { searchInput, loadingSearch } = this.state;
    return (
      <div data-testid="page-search">
        <p>Search</p>
        <input
          data-testid="search-artist-input"
          type="text"
          value={ searchInput }
          name="nameSearch"
          onChange={ (event) => this.setState({ searchInput: event.target.value }) }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ this.validateButtonSearch() }
          // onClick={ this.handleCreateUser }
        >
          Pesquisar
        </button>
        {loadingSearch && <Loading />}
        {/* // Exibe o componente "Loading" enquanto "loading" for verdadeiro */}
      </div>
    );
  }
}

export default Search;
