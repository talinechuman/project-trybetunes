import React from 'react';
import Loading from '../components/Loading';

class Search extends React.Component {
  state = {
    searchInput: '',
    loading: false,
  };

  validateButton = () => {
    const { searchInput } = this.state;
    const numMin = 2;
    return searchInput.length < numMin;
  };

  render() {
    const { searchInput, loading } = this.state;
    return (
      <div data-testid="page-Search">
        <p>Search</p>
        <input
          data-testid="search-artist-input"
          type="text"
          value={ searchInput }
          name="name"
          onChange={ (event) => this.setState({ searchInput: event.target.value }) }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ this.validateButton() }
          // onClick={ this.handleCreateUser }
        >
          Entrar
        </button>
        {loading && <Loading />}
        {/* // Exibe o componente "Loading" enquanto "loading" for verdadeiro */}
      </div>
    );
  }
}

export default Search;
