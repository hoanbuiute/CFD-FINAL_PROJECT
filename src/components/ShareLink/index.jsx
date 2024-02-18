import React, { Children } from "react";
import {
  FacebookShareButton,
  InstapaperShareButton,
  PinterestShareButton,
  TwitterShareButton,
} from "react-share";


const ShareLink = ({ path, title, type, children }) => {
  switch (type) {
    case "facebook":
      return (
        <FacebookShareButton url={path}>
          <a href="#" className="social-icon" title={title} target="_blank">
            {children}
          </a>
        </FacebookShareButton>
      );
    case "instagram":
      return (
        <InstapaperShareButton url={path}>
          <a href="#" className="social-icon" title={title} target="_blank">
            {children}
          </a>
        </InstapaperShareButton>
      );
    case "twitter":
      return (
        <TwitterShareButton url={path}>
          <a href="#" className="social-icon" title={title} target="_blank">
            {children}
          </a>
        </TwitterShareButton>
      );

    case "pinterest":
      return (
        <PinterestShareButton url={path}>
          <a href="#" className="social-icon" title={title} target="_blank">
            {children}
          </a>
        </PinterestShareButton>
      );
  }
};

export default ShareLink;
