import * as React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'

export function Item (props) {
  const { sx, ...other } = props

  return (
      <Box
        sx={{
          px: 2,
          mx: 2,
          py: 0,
          mt: 0,
          mb: '-2px',
          color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
          height: 30,
          fontSize: '0.875rem',
          fontWeight: '700',
          boxSizing: 'border-box',
          borderBottom: (props.selected ) ? '#000 3px solid' : '',
          ...sx
        }}
        {...other}
      />
  )
}

Item.propTypes = {
  /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object
  ])
}
