import React from 'react'
import PropTypes from 'prop-types'

const ABFooter = (props) => {
  return (

        <div>
            This App has been done as a Full-stack Developer Evaluation Task. The required tech stack: NodeJS, Express, Postgres/MySQL, React.
            <br />
            Preferred code style: standard-js with functional approach. Default styles of Material UI or Bootrstrap can be used.
          <br />
            It is published at GitHub <a href="https://github.com/alexbbell/currencyConverter">https://github.com/alexbbell/currencyConverter</a>
        </div>
  )
}

ABFooter.propTypes = {
  data: PropTypes.object
}
export default ABFooter
