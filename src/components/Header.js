import React, {useState, useRef} from 'react'
import {NavLink} from 'react-router-dom'
import {CSSTransition} from 'react-transition-group'; 


function Header() {

  const [closedB, setClosedB] = useState("")
  const [closedX, setClosedX] = useState("hide-icon")
  const [slide, setSlide] = useState("menu-hidden")
  const [inProp, setInProp] = useState(false);
  let closeMenu = () =>{
    if (closedX == 'hide-icon'){
      setClosedX("")
      setClosedB("hide-icon")
      setSlide("slide-right")
      setInProp(true)
    }
    else{
      setClosedX("hide-icon")
      setClosedB("")
      setSlide("slide-left")
      setInProp(true)
    }
  }

  let closeOnTap = () =>{
    setSlide("slide-left")
    setClosedX("hide-icon")
    setClosedB("")
  }
  let menuRef = useRef()

  return (
    <header className='menu-container'>  
      <img onClick={closeMenu} className={`burger-icon ${closedB}`} src="https://raw.githubusercontent.com/honeylemonicetea/Resources/main/icons/icons8-menu-rounded-100.png"/>
      <img onClick={closeMenu} className={`close-icon ${closedX}`} src="https://raw.githubusercontent.com/honeylemonicetea/Resources/main/icons/icons8-close-100.png" alt="" />
      <div className="nav menu-inner">
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/playlists'>Playlists</NavLink>
        <NavLink to='/under-construction'>Artists</NavLink>
        <NavLink to='/under-construction'>My Profile</NavLink>
      </div>
      <CSSTransition nodeRef={menuRef} in={inProp} timeout={200} classNames="my-node">
        <div ref={menuRef} className={`nav menu-inner-mobile ${slide}`}>
        {/* <div className={`nav menu-inner-mobile slide-left`}> */}
          <NavLink onClick={closeOnTap} to='/'>Home</NavLink>
          <NavLink onClick={closeOnTap} to='/playlists'>Playlists</NavLink>
          <NavLink onClick={closeOnTap} to='/under-construction'>Artists</NavLink>
          <NavLink onClick={closeOnTap} to='/under-construction'>My Profile</NavLink>
        </div>
      </CSSTransition>

    </header>
  );
}

export default Header