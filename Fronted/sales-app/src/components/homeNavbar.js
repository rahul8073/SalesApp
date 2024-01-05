import React from 'react'
import { NavLink } from 'react-router-dom'

const HomeNavbar = () => {
  return (
    <div>

    {/* navbar created */}
     <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="container-fluid">
  {/* navlink use to redirect api  */}
    <NavLink className="navbar-brand text-uppercase" to='/'>Sales app</NavLink>
  </div>
</nav>
    </div>
  )
}

export default HomeNavbar