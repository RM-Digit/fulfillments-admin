import React from "react";
import { Link } from "react-router-dom";
export default function bulkEditor({ setShowBar }) {
  return (
    <div className="Polaris-Page-Header__Row">
      <div className="Polaris-Page-Header__BreadcrumbWrapper">
        <nav role="navigation">
          <Link
            className="Polaris-Breadcrumbs__Breadcrumb"
            to={setShowBar ? "/bulkeditor" : "/"}
            data-polaris-unstyled="true"
          >
            <span className="Polaris-Breadcrumbs__ContentWrapper">
              <span className="Polaris-Breadcrumbs__Icon">
                <span className="Polaris-Icon">
                  <svg
                    viewBox="0 0 20 20"
                    className="Polaris-Icon__Svg"
                    focusable="false"
                    aria-hidden="true"
                  >
                    <path d="M17 9H5.414l3.293-3.293a.999.999 0 1 0-1.414-1.414l-5 5a.999.999 0 0 0 0 1.414l5 5a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L5.414 11H17a1 1 0 1 0 0-2z"></path>
                  </svg>
                </span>
              </span>
              <span className="Polaris-VisuallyHidden">Products</span>
            </span>
          </Link>
        </nav>
      </div>
      <div className="Polaris-Page-Header__TitleWrapper">
        <div>
          <div className="Polaris-Header-Title__TitleAndSubtitleWrapper">
            Bulk Editor
          </div>
        </div>
      </div>
      <div className="Polaris-Page-Header__RightAlign"></div>
    </div>
  );
}
