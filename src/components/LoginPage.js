import React from "react";
import PreloadStart from "./child/PreloadStart.js";

const LoginPage = () => {
  return (
    <div>
      {/* Pre-loader start */}
      <div className="theme-loader">
        <PreloadStart />
      </div>

      {/* Pre-loader end */}
      <section className="login-block">
        {/* Container-fluid starts */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <form className="md-float-material form-material">
                <div className="text-center">
                  <img src="assets/images/logo.png" alt="logo.png" />
                </div>
                <div className="auth-box card">
                  <div className="card-block">
                    <div className="row m-b-20">
                      <div className="col-md-12">
                        <h3 className="text-center txt-primary">Login</h3>
                      </div>
                    </div>
                    <div className="form-group form-primary">
                      <input
                        type="text"
                        name="user-name"
                        className="form-control"
                        required
                      />
                      <span className="form-bar" />
                      <label className="float-label">Choose Username</label>
                    </div>
                    <div className="form-group form-primary">
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        required
                      />
                      <span className="form-bar" />
                      <label className="float-label">Your Email Address</label>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form-group form-primary">
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            required
                          />
                          <span className="form-bar" />
                          <label className="float-label">Password</label>
                        </div>
                      </div>
                    </div>
                    <div className="row m-t-30">
                      <div className="col-md-12">
                        <button
                          type="button"
                          className="btn btn-primary btn-md btn-block waves-effect text-center m-b-20"
                        >
                          Login
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-10">
                        <p className="text-inverse text-left">
                          <a href="index.html">
                            <b>Sign Up Here</b>
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            {/* end of col-sm-12 */}
          </div>
          {/* end of row */}
        </div>
        {/* end of container-fluid */}
      </section>
    </div>
  );
};

export default LoginPage;
