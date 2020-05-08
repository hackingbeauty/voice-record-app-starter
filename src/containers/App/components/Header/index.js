import React, { Component }    from 'react'
import AppBar                  from 'components/AppBar'
import Toolbar                 from '@material-ui/core/Toolbar'
import Typography              from '@material-ui/core/Typography'
import Navigation              from './components/Navigation'
import { styles }              from './styles.scss'

class Header extends Component {
  render() {
    return (
      <div className={styles}>
        <AppBar>
          <Toolbar>
            <Typography variant="title" color="inherit">
              <span>(Demo for <a href="https://react-mic-plus.professionalreactapp.com/sales-page23901658">React-Mic-Plus</a>)</span>
            </Typography>
          </Toolbar>
        </AppBar>
        <Navigation />
      </div>
    )
  }
}

export default Header
