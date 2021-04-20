// app/index.js

import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Categories from './Menu/Categories/Categories';
import Recognition from './Menu/Recognition/Recognition';
import Medic from './Menu/Medic/Medic';
import Getter from './Utils/Getter';
import Menu from './Menu/Menu';
import Card from './Utils/Card';
import Subcategories from './Menu/Categories/Subcategories';
import Assistance from './Menu/Medic/Assistance';

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