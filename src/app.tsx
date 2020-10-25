import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './homePage/homePage';
import './app.css';
import { LibraryPage } from './LibraryPage/LibraryPage';

export default function App() {

  return <>
      <Switch>
        <Route path="/:kopuk" render={({match}) => (
          <LibraryPage kopuk={match.params.kopuk}/>
        )}
        />
        <Route path="/">
          <HomePage  />
        </Route>
      </Switch>
  </>
}
