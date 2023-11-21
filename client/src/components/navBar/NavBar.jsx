import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
    
  <nav className="navbar navbar-expand-md navbar-dark navbar-custom fixed-top">


  <div className="collapse navbar-collapse" id="navbarsExampleDefault">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link  className="nav-link page-scroll" to="/">
          HOME 
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link page-scroll" to="/trips">
          MY TRIPS
        </Link>
      </li>
     

        
      <li className="nav-item">
        <Link className="nav-link page-scroll" to="/about">
         ABOUT
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link page-scroll" to="/login">
          LOG IN
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link page-scroll" to="/register">
          REGISTER
        </Link>
      </li>
    </ul>
    
  </div>
</nav>

    )
}