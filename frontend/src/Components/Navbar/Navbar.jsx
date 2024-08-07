import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/auth.actions';
import logo from '../../assets/argentBankLogo-min.webp';

function Navbar() {
  const isConnected = useSelector((state) => state.auth.token);
  const userData = useSelector((state) => state.user.userData);
  const username = userData?.username || 'User';

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    sessionStorage.clear();
    localStorage.clear();
    navigate('/');
  }

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      {isConnected ? (
        <div className='connected'>
          <Link to='/user'>
            <i className='fa-solid fa-circle-user' />
            <p>{username},</p>
          </Link>
          <Link to='/' onClick={logoutHandler}>
            <p>Sign out <i className='fa-solid fa-arrow-right-from-bracket' /></p>
          </Link>
        </div>
      ) : (
        <div className='not-connected'>
          <Link to='/login' >
            <p className='main-nav-item'><i className="fa-solid fa-circle-user"></i> Sign In</p>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
