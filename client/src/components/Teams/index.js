import React from 'react'
import './index.css';
import Footer from '../Footer';
import { Navbar } from 'react-bootstrap';
const Teams = () => {
  return (
    <>
    <Navbar/>
    <div class="teams-container">
        <h2>Our Team</h2>
  <div class="row-teams">
      <div class="our-team">
        <div class="picture">
          <img class="img-fluid" src="https://picsum.photos/130/130?image=1027"/>
        </div>
        <div class="team-content">
            <h3 class="name">Umadevi</h3>
          <h4 class="title">CEO</h4>
          
        </div>
      </div>
      <div class="our-team">
        <div class="picture">
          <img class="img-fluid" src="https://picsum.photos/130/130?image=839"/>
        </div>
        <div class="team-content">
          <h3 class="name">Mahesh S Reddy</h3>
          <h4 class="title">Founder and CEO</h4>
        </div>
    </div>
  </div>
</div>
<Footer/>
    </>
  )
}

export default Teams
