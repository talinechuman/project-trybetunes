import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  state = {
    name: '',
    loading: false,
  };

  validateButton = () => {
    const { name } = this.state;
    const numMin = 3;
    return name.length < numMin;
  };

  handleCreateUser = async () => {
    const { name } = this.state;
    this.setState({ loading: true });
    try {
      await createUser({ name });
      const { history } = this.props;
      history.push('/search'); // redireciona para a rota /search após a criação do usuário
    } catch (error) {
      console.log(error); // trata possíveis erros na requisição à API
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { name, loading } = this.state;
    return (
      <div data-testid="page-login">
        <p>Login</p>
        <input
          data-testid="login-name-input"
          type="text"
          value={ name }
          name="name"
          onChange={ (event) => this.setState({ name: event.target.value }) }
        />
        <button
          data-testid="login-submit-button"
          type="button"
          disabled={ this.validateButton() }
          onClick={ this.handleCreateUser }
        >
          Entrar
        </button>
        { loading && <Loading /> }
        {/* // Exibe o componente "Loading" enquanto "loading" for verdadeiro */}

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
