import React from 'react';
import { Link } from 'react-router'
import SignupRun from './Signup.run';

class Signup extends React.Component {

    componentDidMount() {
        SignupRun();
    }

    render() {
        return (



            <div className="container-full">
              <div className="container container-xs"><img src="img/logo.png" className="mv-lg block-center img-responsive thumb64" />

                <form id="email-validation" name="createForm" noValidate className="card b0 form-validate hidden">
                  <div className="card-heading">
                    <div className="card-title text-center">Validate email</div>
                  </div>
                  <div className="text-danger text-center hidden" id ="email-validation-text">Sorry, the code is incorrect !</div>
                  <div className="card-body">
                    <div className="mda-form-group float-label mda-input-group">
                      <div className="mda-form-control">
                        <input type="text" id ="emailvalidationcode" name="emailvalidationcode" required="" className="form-control" />
                        <div className="mda-form-control-line"></div>
                        <label>Email address</label>
                      </div><span className="mda-input-group-addon"><em className="ion-ios-email-outline icon-lg"></em></span>
                    </div>
                  </div>
                  <button   id="email-validate-but" className="btn btn-primary btn-flat">Validate</button>
                  <button id="email-validate-cancel" className="btn btn-primary btn-flat">Check the email adrress </button>
                </form>

                <form id="user-signup" action="" name="createForm" noValidate className="card b0 form-validate">
                  <div className="card-offset pb0">
                    <div className="card-offset-item text-right">
                      <div id="form-ok" className="btn btn-success btn-circle btn-lg hidden"><em className="ion-checkmark-round"></em></div>
                    </div>
                  </div>
                  <div className="card-heading">
                    <div className="card-title text-center">Create account</div>
                  </div>
                  <div className="text-danger text-center hidden" id ="user-signup-taken-email-text">Sorry, this email is already taken !</div>
                  <div className="card-body">
                    <div className="mda-form-group float-label mda-input-group">
                      <div className="mda-form-control">
                        <input type="email" id="emailaddress" name="emailaddress" required="" className="form-control" />
                        <div className="mda-form-control-line"></div>
                        <label>Email address</label>
                      </div><span className="mda-input-group-addon"><em className="ion-ios-email-outline icon-lg"></em></span>
                    </div>
                    <div className="mda-form-group float-label mda-input-group">
                      <div className="mda-form-control">
                        <input id="account-password" type="password" name="accountPassword" required="" className="form-control" />
                        <div className="mda-form-control-line"></div>
                        <label>Password</label>
                      </div><span className="mda-input-group-addon"><em className="ion-ios-locked-outline icon-lg"></em></span>
                    </div>
                    <div className="mda-form-group float-label mda-input-group">
                      <div className="mda-form-control">
                        <input type="password" name="accountPasswordCheck" required="" className="form-control" />
                        <div className="mda-form-control-line"></div>
                        <label>Confirm password</label>
                      </div><span className="mda-input-group-addon"><em className="ion-ios-locked-outline icon-lg"></em></span>
                    </div>
                  </div>
                  <button id="create-new-user" type="submit" className="btn btn-primary btn-flat">Create</button>
                  <div className="card-body bg-gray-lighter text-center text-sm"><span className="spr">By registering I accept the</span><a href="#" className="spr">Terms of Service</a><span className="spr">and</span><a href="#" className="spr">Privacy</a></div>
                </form>
              </div>
            </div>
        );
    }
}

export default Signup;
