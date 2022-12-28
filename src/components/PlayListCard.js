import React from 'react'
import {NavLink} from 'react-router-dom'


function PlayListCard(props) {
  return (
    <NavLink to={`/play/${props.slug_field}`} style={{backgroundImage:`url(${props.cover_image})`}} className='playlist-card'>
      <p className="pl-name">
        {props.title}
      </p>
    </NavLink>
  )
}


export default PlayListCard
