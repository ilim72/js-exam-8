import {NavLink} from 'react-router-dom';

const Toolbar = () => {
  return (
    <div>
      <div className={'d-flex align-items-center'}>
        <NavLink to={'/'} className={'text-black text-decoration-none fs-2 '}><b>Quotes Central</b></NavLink>
        <nav className={'d ms-auto'}>
          <NavLink to={'/'} className={' fs-5  custom-link'}>Quotes</NavLink>
          <NavLink to={'/add-quote'} className={' fs-5  border-danger border-start border-3 custom-link'}>Submit new
            quote</NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Toolbar;