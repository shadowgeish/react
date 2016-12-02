import React from 'react';
import pubsub from 'pubsub-js';
import { Grid, Row, Col, Button, Dropdown, MenuItem } from 'react-bootstrap';

import ProfileRun from './Profile.run';
import RunAjaxRequest from '../Utils/RunAjaxRequest';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {user_infos: {}};
    }

    componentWillMount() {
        pubsub.publish('setPageTitle', 'test');
    }

    componentDidMount() {
        ProfileRun();
        var dictParams = {'token': sessionStorage.getItem('token')};
        RunAjaxRequest('http://localhost:8888/get_user_infos', dictParams,(data) => {
            if(data){
                this.setState({user_infos:data
                });
            }
        });
    }

    render() {
        return (
            <section>
                <div className="container-overlap-profile bg-blue-500">
                    {/* <div className="media m0 pv">
                        <div className="media-left"><a href="#"><img src="img/user/03.jpg" alt="User" className="media-object img-circle thumb64"/></a></div>
                         <div className="media-body media-middle">
                            <h4 className="media-heading">Christine Matthews</h4><span className="text-muted">Welcomexx {this.state.first_name}.</span>
                        </div>
                    </div>
                    */}
                </div>

                <Grid fluid>
                    <Row>
                        {/* Left column */}
                        <Col md={7} lg={8}>
                            <form editable-form="" name="user.profileForm" className="card">
                                <h5 className="card-heading pb0">
                                    {/* START dropdown */}
                                    <div className="pull-right">
                                        <button id="edit-enable" type="button" className="btn-raised btn btn-warning btn-circle btn-lg"><em className="ion-edit"></em></button>
                                        <button id="edit-disable" type="submit" className="btn-raised btn btn-success btn-circle btn-lg hidden"><em className="ion-checkmark-round"></em></button>
                                        <Dropdown pullRight >
                                            <Dropdown.Toggle bsStyle="" noCaret className="btn-flat btn-flat-icon">
                                              <em className="ion-android-more-vertical"></em>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="md-dropdown-menu" >
                                                <MenuItem eventKey="1">Delete my account</MenuItem>
                                                <MenuItem eventKey="1">Request my data</MenuItem>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    {/* END dropdown */}
                                </h5>
                                <h5 className="card-heading pb0">Contact Information</h5>
                                <div className="card-body">
                                    <table className="table table-striped">
                                        <tbody>

                                            <tr>
                                                <td><em className="ion-email icon-fw mr"></em>Email</td>
                                                <td><span className="is-editable text-inherit"><a href="#">{this.state.user_infos.email}</a></span></td>
                                            </tr>

                                            <tr>
                                                <td><em className="ion-document-text icon-fw mr"></em>First & last name</td>
                                                <td>
                                                    <span className="is-editable text-inherit"><a href="#">{this.state.user_infos.first_name}</a></span>
                                                    <span className="is-editable text-inherit"><a href="#">{this.state.user_infos.last_name}</a></span>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td><em className="ion-egg icon-fw mr"></em>Birthday</td>
                                                <td><span data-type="date" data-mode="popup" data-placement="bottom" className="is-editable text-inherit">{this.state.user_infos.date_of_birth}</span></td>
                                            </tr>

                                            <tr>
                                                <td><em className="ion-ios-body icon-fw mr"></em>Member since</td>
                                                <td>{this.state.user_infos.date_creation}</td>
                                            </tr>

                                            <tr>
                                                <td><em className="ion-man icon-fw mr"></em>Gender</td>
                                                <td><a id="gender" href="#" data-type="select" data-pk="1" data-value="2" data-title="Select sex" className="text-inherit"></a></td>
                                            </tr>

                                                <tr>
                                                <td><em className="ion-android-home icon-fw mr"></em>Address</td>
                                                <td>
                                                    <span className="is-editable text-inherit">{this.state.user_infos.address_number}</span>
                                                    <span className="is-editable text-inherit">{this.state.user_infos.address_street_name}</span>
                                                    <span className="is-editable text-inherit">{this.state.user_infos.contact_home_phone}</span>
                                                    <span className="is-editable text-inherit">{this.state.user_infos.address_post_code}</span>
                                                    <span className="is-editable text-inherit">{this.state.user_infos.address_country}</span>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td><em className="ion-ios-telephone icon-fw mr"></em>Home phone</td>
                                                <td><span className="is-editable text-inherit">{this.state.user_infos.contact_home_phone}</span></td>
                                            </tr>

                                            <tr>
                                                <td><em className="ion-ios-telephone icon-fw mr"></em>Mobile phone</td>
                                                <td><span className="is-editable text-inherit">{this.state.user_infos.contact_mobile_phone}</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </form>
                        </Col>
                        {/* Right column */}
                        <Col md={5} lg={4}>

                            <div className="card bg-success">
                                <div className="card-body pv">
                                    <div className="clearfix">
                                        <div className="pull-left">
                                            <h4 className="m0 text-thin">780</h4><small className="m0 text-muted"><em className="mr-sm ion-arrow-up-b"></em>Credit Score</small>
                                        </div>
                                        <div className="pull-right mt-lg">
                                            <div id="sparkline4" data-line-color="#e91e63" className="sparkline"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <h5 className="card-heading">
                                    {/* START dropdown */}
                                    <div className="pull-right">
                                        <Dropdown pullRight >
                                            <Dropdown.Toggle bsStyle="" noCaret className="btn-flat btn-flat-icon">
                                              <em className="ion-android-more-vertical"></em>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="md-dropdown-menu" >
                                                <MenuItem eventKey="1">Action 1</MenuItem>
                                                <MenuItem eventKey="2">Action 2</MenuItem>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    {/* END dropdown */}
                                </h5>
                                <h5 className="card-heading">Activity</h5>
                                <div className="card-body pb0">
                                    <p className="pull-left mr"><em className="ion-record text-info"></em></p>
                                    <div className="oh">
                                        <p><strong className="mr-sm">Added</strong><span className="mr-sm">a new issue</span><a href="#">#5478</a></p>
                                        <div className="clearfix">
                                            <div className="pull-left text-muted"><em className="ion-android-time mr-sm"></em><span>an hour ago</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body pb0">
                                    <p className="pull-left mr"><em className="ion-record text-danger"></em></p>
                                    <div className="oh">
                                        <p><strong className="mr-sm">Commented</strong><span className="mr-sm"> on the project</span><a href="#">Material</a></p>
                                        <p className="bl pl"><i>That's awesome!</i></p>
                                        <div className="clearfix">
                                            <div className="pull-left text-muted"><em className="ion-android-time mr-sm"></em><span>2 hours ago</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body pb0">
                                    <p className="pull-left mr"><em className="ion-record text-success"></em></p>
                                    <div className="oh">
                                        <p><strong className="mr-sm">Completed</strong><span> all tasks asigned this week</span></p>
                                        <div className="clearfix">
                                            <div className="pull-left text-muted"><em className="ion-android-time mr-sm"></em><span>3 hours ago</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body pb0">
                                    <p className="pull-left mr"><em className="ion-record text-info"></em></p>
                                    <div className="oh">
                                        <p><strong className="mr-sm">Published</strong><span className="mr-sm"> new photos on the album</span><a href="#">WorldTrip</a></p>
                                        <p><a href="#"><img src="img/pic4.jpg" alt="Pic" className="mr-sm thumb48"/></a><a href="#"><img src="img/pic5.jpg" alt="Pic" className="mr-sm thumb48"/></a><a href="#"><img src="img/pic6.jpg" alt="Pic" className="mr-sm thumb48"/></a></p>
                                        <div className="clearfix">
                                            <div className="pull-left text-muted"><em className="ion-android-time mr-sm"></em><span>4 hours ago</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="clearfix">
                                        <p className="pull-left mr"><em className="ion-record text-primary"></em></p>
                                        <div className="oh">
                                            <p><strong className="mr-sm">Following</strong><span className="mr-sm">Jane Kuhn</span></p>
                                            <p><span className="image-list"><a href="#"><img src="img/user/03.jpg" alt="User" className="img-circle thumb32"/></a><a href="#"><img src="img/user/04.jpg" alt="User" className="img-circle thumb32"/></a><a href="#"><img src="img/user/05.jpg" alt="User" className="img-circle thumb32"/></a><a href="#"><img src="img/user/06.jpg" alt="User" className="img-circle thumb32"/></a><a href="#"><img src="img/user/07.jpg" alt="User" className="img-circle thumb32"/></a><strong><a href="#" className="ml-sm link-unstyled">+200</a></strong></span></p>
                                            <div className="clearfix">
                                                <div className="pull-left text-muted"><em className="ion-android-time mr-sm"></em><span>yesterday</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </section>
        );
    }
}

export default Profile;
