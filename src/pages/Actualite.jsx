import React, { Component } from 'react';
import ProfilButton from '../components/ProfilButton';
import BurgerButton from '../components/BurgerButton';

class Actualite extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>
          <BurgerButton />
          <ProfilButton />
        </div>
        <div>
          Actualités
        </div>
      </div>
    );
  }
}

export default Actualite;
