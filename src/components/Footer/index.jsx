import React from 'react'
import useFooter from './useFooter';
import { Link } from 'react-router-dom';
import PATHS from '../../constants/paths';

const Footer = () => {
  const { footerProps } = useFooter();
  const {
    info,
    hotline,
    customerServiceTitle,
    customerServices,
    usefulLinks,
    usefulLinkTitle,
    myAccountTitle,
    myAccounts,
  } = footerProps || {};
  return (
    <footer className="footer">
    <div className="footer-middle">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-lg-5">
            <div className="widget widget-about">
              <Link to={PATHS.HOME}>
                <img
                  src="/assets/images/logo.svg"
                  className="footer-logo"
                  alt="CFD Shop Logo"
                  width={120}
                />
              </Link>
              <p>{info || ""}</p>
              <div className="widget-call">
                <i className="icon-phone" /> Got Question? Call us 24/7
                <a href="tel:#">{hotline || ""}</a>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-2 offset-lg-1">
            <div className="widget">
              <h4 className="widget-title">{usefulLinkTitle || ""}</h4>
              <ul className="widget-list">
                {usefulLinks?.map((item, index) => (
                  <li key={index}>
                    <Link to={item.path}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-sm-6 col-lg-2">
            <div className="widget">
              <h4 className="widget-title">{customerServiceTitle || ""}</h4>
              <ul className="widget-list">
                {customerServices?.map((item, index) => (
                  <li key={index}>
                    <Link to={item.path}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-sm-6 col-lg-2">
            <div className="widget">
              <h4 className="widget-title">{myAccountTitle || ""}</h4>
              <ul className="widget-list">
                {myAccounts?.map((item, index) => (
                  <li key={index}>
                    <Link to={item.path}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="container">
        <p className="footer-copyright">
          Copyright © 2023{" "}
          <a href="https://cfdcircle.vn/" target="_blank">
            <strong>CFD Circle</strong>
          </a>
          . All Rights Reserved.
        </p>
        <figure className="footer-payments">
          <img
            src="/assets/images/payments.png"
            alt="Payment methods"
            width={272}
            height={20}
          />
        </figure>
      </div>
    </div>
  </footer>

  )
}

export default Footer