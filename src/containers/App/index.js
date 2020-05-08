import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import {
  HashRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import RecordView from 'containers/RecordView'
import theme      from 'configs/config-theme'
import Header     from './components/Header'

// global styles for entire app
import './styles.scss'

class App extends Component {
  render() {
    return (
      <React.StrictMode>
        <MuiThemeProvider theme={theme}>
          <HashRouter>
            <div>
              <Header />
              <div className="app-shell">
                <Switch>
                  <Route path="/record" component={RecordView} />
                  <Redirect from="/" to="/record" />
                </Switch>
              </div>
            </div>
          </HashRouter>
        </MuiThemeProvider>
      </React.StrictMode>
    )
  }
}

export default App
