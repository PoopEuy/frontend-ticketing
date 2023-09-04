import React from "react";

function SlaGraphChild() {
  return (
    <div>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="page-header-title">
                <h5 className="m-b-10">SLA Data Page</h5>
                <p className="m-b-0">SLA</p>
              </div>
            </div>
            <div className="col-md-4">
              <ul className="breadcrumb-title">
                <li className="breadcrumb-item">
                  <a href="index.html">
                    {" "}
                    <i className="fa fa-home" />{" "}
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#!">SLA Statistics</a>
                </li>
                {/* <li className="breadcrumb-item">
                  <a href="#!">Basic Tables</a>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <main className="pcoded-inner-content">
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-body">
              <div className="row">
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-header">
                      <h5>SLA Statistics</h5>
                      <div className="card-header-right">
                        <ul className="list-unstyled card-option">
                          <li>
                            <i
                              className="fa fa fa-wrench open-card-option"
                              title="Options"
                            />
                          </li>
                          <li>
                            <i
                              className="fa fa-window-maximize full-card"
                              title="Expand"
                            />
                          </li>
                          <li>
                            <i
                              className="fa fa-minus minimize-card"
                              title="Minimize"
                            />
                          </li>
                          <li>
                            <i
                              className="fa fa-refresh reload-card"
                              title="Refresh"
                            />
                          </li>
                          <li>
                            <i
                              className="fa fa-trash close-card"
                              title="Close"
                            />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="card-block">
                      <iframe
                        src="http://192.168.2.89:3001/public/dashboard/98a900a8-da79-488e-a2bb-78473010d404"
                        frameBorder="0"
                        width="100%"
                        height="1000px"
                        allowTransparency
                        title="SLA Dashboard"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SlaGraphChild;
