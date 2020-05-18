import React from 'react'
import { 
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import Home from './pages/Home'
import AddMovie from './pages/AddMovie'
import TvSeries from './pages/TvSeries'
import './App.css'

const client = new ApolloClient({
  uri : 'http://localhost:3000/entertainme',
  clientState: {
    resolvers: {
    //   Query: {
    //     localMovies: (parent, args, context, info) => {
    //       return[
    //         {_id:"sdcsfew43564", title : "Test Title", popularity: 8.5, poster_path:"http://www.impawards.com/1999/posters/american_pie_xlg.jpg", __typename:"movies"}
    //       ]
    //     }
    //   },
      // Mutation : {
      //   addLocalMovie : (root, variables, c, d) => {
      //     console.log('success')
      //   }
      // }
    },
    defaults: {
      localMovies : [
        {_id:"sdcsfew43564", title : "American Pie - Local", popularity: 8.5, poster_path:"http://www.impawards.com/1999/posters/american_pie_xlg.jpg", __typename:"movies"}
      ],
      localTvSeries : [
        {_id:"sdcsfesdsad3w43564", title : "The Witcher - Local", popularity: 8.0, poster_path:"https://i.pinimg.com/originals/94/35/29/9435293b9e6e056de584566a2d57eae8.jpg", __typename:"tvSeries"}
      ]
    }
  }
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/addmovie">
            <AddMovie />
          </Route>

          <Route exact path="/tvseries">
            <TvSeries />
          </Route>

        </Switch>
      </Router>
    </ApolloProvider>
  )
}

export default App;
