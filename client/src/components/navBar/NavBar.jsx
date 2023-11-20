import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
    
  <nav className="navbar navbar-expand-md navbar-dark navbar-custom fixed-top">

  <a className="navbar-brand logo-image" to="index.html"> 
    <img src="images/logo.svg" alt="alternative" />
  </a>

  <div className="collapse navbar-collapse" id="navbarsExampleDefault">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link  className="nav-link page-scroll" to="/">
          HOME <span className="sr-only">(current)</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link page-scroll" to="/trips">
          MY TRIPS
        </Link>
      </li>
      {/* Dropdown Menu */}
      <li className="nav-item dropdown">
        <Link
          className="nav-link dropdown-toggle page-scroll"
          to="/about"
          id="navbarDropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          ABOUT
        </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to="/">
            <span className="item-text">TERMS CONDITIONS</span>
          </Link>
          <div className="dropdown-items-divide-hr" />
          <Link className="dropdown-item" to="/">
            <span className="item-text">PRIVACY POLICY</span>
          </Link>
        </div>
      </li>
      {/* end of dropdown menu */}
      <li className="nav-item">
        <Link className="nav-link page-scroll" to="/contact">
          CONTACT
        </Link>
      </li>
    </ul>
    
  </div>
</nav>

    )
}