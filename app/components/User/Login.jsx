import React from 'react';
import { Link }  from 'react-router'
import LoginRun from './Login.run';
import RunAjaxRequest from '../Utils/RunAjaxRequest';

class Login extends React.Component {

    constructor(props, context){
        super(props, context);
    }

    componentDidMount() {
        LoginRun();
        $('#user-login-submit').click( () => {
            if($('#user-login').valid()){
                var dictParams = {'email': this.refs.email.value, 'password':  this.refs.password.value };
                RunAjaxRequest('http://localhost:8888/log_user', dictParams,(data) => {
                    if(data){
                        if(data.login == 'yes'){
                            sessionStorage.setItem('token', data.token);
                            this.context.router.push('/dashboard');
                        }
                        else{
                            $('#user-login-text').hide().removeClass('hidden').show(500);
                        }
                    }
                });
            }
        });

    }

    render() {
        return (
            <div className="container-full">
                <div className="container container-xs"><img src="img/logo.png" className="mv-lg block-center img-responsive thumb64" />
                    <form id="user-login" action="" name="loginForm" noValidate className="card b0 form-validate">
                        <div className="card-offset pb0">
                            <div className="card-offset-item text-right">
                                <Link to="signup" className="btn-raised btn btn-info btn-circle btn-lg">
                                    <em className="ion-person-add"></em>
                                </Link>
                            </div>
                            <div className="card-offset-item text-right hidden">
                                <div className="btn btn-success btn-circle btn-lg"><em className="ion-checkmark-round"></em></div>
                            </div>
                        </div>
                        <div className="card-heading">
                            <div className="card-title text-center">Login</div>
                        </div>
                        <div className="text-danger text-center hidden" id ="user-login-text">Login or password incorrect!</div>
                        <div className="card-body">

                            <div className="mda-form-group float-label mda-input-group">
                                <div className="mda-form-control">
                                    <input type="email" ref="email" name="accountEmail" id="accountEmail" required="" className="form-control" />
                                    <div className="mda-form-control-line"></div>
                                    <label>Email address</label>
                                </div><span className="mda-input-group-addon"><em className="ion-ios-email-outline icon-lg"></em></span>
                            </div>
                            <div className="mda-form-group float-label mda-input-group">
                                <div className="mda-form-control">
                                    <input type="password" id="accountPassword" ref="password" name="accountPassword" required="" className="form-control" />
                                    <div className="mda-form-control-line"></div>
                                    <label>Password</label>
                                </div><span className="mda-input-group-addon"><em className="ion-ios-locked-outline icon-lg"></em></span>
                            </div>
                        </div>
                        <button id="user-login-submit" type="submit" className="btn btn-primary btn-flat">Authenticate</button>
                    </form>
                    <div className="text-center text-sm">
                        <Link to="recover" className="text-inherit">Forgot password?</Link>
                    </div>
                </div>
            </div>
        );
    }
}

Login.contextTypes = {
    router: React.PropTypes.object
};

export default Login;
