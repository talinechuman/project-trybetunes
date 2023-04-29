import React from 'react';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Favorites extends React.Component {
  state = {
    favoriteList: [],
    loading: false,
  };

  async componentDidMount() {
    const favorites = await getFavoriteSongs();
    this.setState({ favoriteList: favorites });
  }

  loadingChange = (bool) => {
    this.setState({ loading: bool });
  };

  handleRemoveSong = async (music) => {
    const { favoriteList } = this.state;
    await removeSong(music);
    this.setState({
      favoriteList: favoriteList
        .filter((favorite) => favorite.trackId !== music.trackId),
    });
  };

  render() {
    const { favoriteList, loading } = this.state;
    return (
      <div>
        <div data-testid="page-favorites">Favorites</div>
        {loading && <Loading />}
        {favoriteList.map((music) => (
          <MusicCard
            key={ music.trackId }
            trackId={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            artworkUrl100={ music.artworkUrl100 }
            removeSong={ () => this.handleRemoveSong(music) }
            isFavorites={ favoriteList }
            checked={ favoriteList }
            loadingChange={ this.loadingChange }
          />
        ))}
      </div>
    );
  }
}

export default Favorites;
