import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends React.Component {
  state = {
    loading: true,
    user: {},
  };

  componentDidMount() {
    this.handleUser();
  }

  handleUser = async () => {
    const user = await getUser();
    this.setState({ user, loading: false });
  };

  render() {
    const { loading, user } = this.state;
    return (
      <>
        <div data-testid="page-profile">
          <h2>Perfil</h2>

        </div>
        <div>
          {loading && <Loading />}
          <img data-testid="profile-image" src={ user.image } alt={ user.name } />
          <p><b>Nome</b></p>
          <p>{ user.name }</p>
          <p><b>Email</b></p>
          <p>{ user.email }</p>
          <p><b>Descrição</b></p>
          <p>{ user.description }</p>
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      </>
    );
  }
}

export default Profile;
