import React from 'react'
import './index.css';


import linkedin from '../../assets/linkedin.png';
const Teams = () => {
  return (
    <>
    
    <div class="teams-container">
        <h2>Our Team</h2>
  <div class="row-teams">
      <div class="our-team">
        <div class="picture">
          <a href="https://www.linkedin.com/company/nanoquesttech"><img class="img-fluid" src={linkedin}/></a>
        </div>
        <div class="team-content">
            <h3 class="name">Umadevi</h3>
          <h4 class="title">Co-Founder</h4>
          
        </div>
      </div>
      <div class="our-team">
        <div class="picture">
          <a href="https://www.linkedin.com/company/nanoquesttech"><img class="img-fluid" src={linkedin}/></a>
        </div>
        <div class="team-content">
          <h3 class="name">Maheshwara Reddy</h3>
          <h4 class="title">Founder and CEO</h4>
        </div>
    </div>
  </div>
</div>

    </>
  )
}

export default Teams
