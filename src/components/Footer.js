import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer() {
  return (
    <div className='fixed bottom-0'><div className="container">
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div className="col-md-4 d-flex align-items-center">
        <span className="text-muted">© 2024 <i>ComfortFood</i>, Inc</span>
      </div>
  
      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li className="ms-3"><a className="text-muted" href="/"><svg className="bi" width="24" height="24"><use ></use></svg></a></li>
        <li className="ms-3"><InstagramIcon/></li>
        <li className="ms-3"><FacebookIcon/></li>
        <li className="ms-3"><TwitterIcon/></li>
      </ul>
    </footer>
  </div>
  </div>
  )
}
