import React from 'react';

class ProfileEdit extends React.Component {
  render() {
    return (
      <>
        <div data-testid="page-profile-edit">ProfileEdit</div>
        <form>
          <label htmlFor="name">
            Digite seu nome:
            <input
              data-testid="edit-input-name"
              type="text"
            />
          </label>

        </form>

      </>
    );
  }
}

export default ProfileEdit;
