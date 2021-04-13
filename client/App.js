// app/index.js

import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Categories from './Categories';
import Recognition from './Recognition';
import Medic from './Medic';
import Getter from './Getter';
import Menu from './Menu';
import Card from './Card';
import Subcategories from './Subcategories';
import Assistance from './Assistance';

const App = () => {

  // TODO: verify data fetch
  // if partial data is fetched, then return the rounter, else wait for first initialization.

  return (
    <Router>
      <Scene key="root">
        <Scene key="menu"
          component={Menu} 
          initial
        />
        <Scene
          key="categories"
          component={Categories}
        />
        <Scene
          key="recognition"
          component={Recognition}
        />
        <Scene
          key="medic"
          component={Medic}
        />
        <Scene
          key="subcategories"
          component={Subcategories}
        />
        <Scene
          key="card"
          component={Card}
        />
        <Scene
          key="assistance"
          component={Assistance}
        />
      </Scene>
    </Router>
  );
}

export default App;