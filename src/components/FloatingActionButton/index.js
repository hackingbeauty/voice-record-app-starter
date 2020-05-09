import React      from 'react'
import Fab        from '@material-ui/core/Fab'
import PropTypes  from 'prop-types'
import { styles } from './styles.scss'

const FloatingActionButton = (props) => {
  const {
    children,
    ...other
  } = props

  return (
    <div className={styles}>

      <Fab
        {...other}
      >
        {children}
      </Fab>
    </div>
  )
}

FloatingActionButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

FloatingActionButton.defaultProps = {
  className: 'btn',
  color: 'default',
  disabled: false,
  onClick: null
}

export default FloatingActionButton
