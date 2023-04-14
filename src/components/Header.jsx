import React from 'react';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    loading: true,
    userName: '',
  };

  async componentDidMount() {
    try {
      const user = await getUser();
      this.setState({
        loading: false,
        userName: user.name,
      });
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  render() {
    const { loading, userName } = this.state;

    if (loading === true) {
      return (
        <header data-testid="header-component">
          <span data-testid="header-user-loading">Carregando...</span>
        </header>
      );
    }
    return (
      <header data-testid="header-component">
        <span data-testid="header-user-name">{userName}</span>
      </header>
    );
  }
}

export default Header;
