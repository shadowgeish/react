import React from 'react';
import pubsub from 'pubsub-js';
import { Link } from 'react-router'
import { Grid, Row, Col, Dropdown, MenuItem, Button, ButtonGroup, ButtonToolbar, DropdownButton, SplitButton } from 'react-bootstrap';

import DashboardRun from './Dashboard.run';
import RippleRun from '../Ripple/Ripple.run';

class Dashboard extends React.Component {

    componentWillMount() {
        pubsub.publish('setPageTitle', this.constructor.name);
    }

    componentDidMount() {
        DashboardRun();
        RippleRun();
    }

    render() {
        return (
            <section>
                <div className="content-heading bg-white">
                    <Row>
                        <Col sm="6">
                            <h4 className="m0 text-thin">
                            Discreet Income dashboard</h4><small>Admin dashboard</small>
                        </Col>
                    </Row>
                </div>
                <Grid fluid>
                    <Row>
                        <Col lg="9" md="12">
                            <Row>
                                <Col lg="6">
                                    <div className="card">
                                        <div className="card-heading">
                                            {/* START dropdown */}
                                            <div className="pull-right">
                                                <Dropdown pullRight >
                                                    <Dropdown.Toggle bsStyle="" noCaret className="btn btn-default btn-flat btn-flat-icon ripple">
                                                      <em className="ion-android-more-vertical"></em>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="md-dropdown-menu" >
                                                        <MenuItem eventKey="1">Last 30 days</MenuItem>
                                                        <MenuItem eventKey="2">Last week</MenuItem>
                                                        <MenuItem eventKey="3">Last year</MenuItem>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            {/* END dropdown */}
                                            <div className="card-title">Request</div><small>Nulla commodo blanffdit cursus.</small>
                                        </div>
                                        <ul className="list-group m0">
                                            <li className="list-group-item"><small className="text-thin">Serge would like to add you to his group</small> <Button bsStyle="success" className="btn-flat ripple" bsSize="small" ><small  className="text-thin">accept</small></Button> <Button bsStyle="danger" bsSize="small" className="btn-flat mr ripple"><small className="text-thin">reject</small></Button> </li>
                                            <li className="list-group-item"><small className="text-thin">Rafael would like to add you to his group</small> <Button bsStyle="success" className="btn-flat ripple" bsSize="small" ><small  className="text-thin">accept</small></Button> <Button bsStyle="danger" bsSize="small" className="btn-flat mr ripple"><small className="text-thin">reject</small></Button> </li>
                                        </ul>
                                    </div>
                                </Col>
                                <Col lg="6">
                                    <div className="card">
                                        <div className="card-heading">
                                            {/* START dropdown */}
                                            <div className="pull-right">
                                                <Dropdown pullRight >
                                                    <Dropdown.Toggle bsStyle="" noCaret className="btn btn-default btn-flat btn-flat-icon ripple">
                                                      <em className="ion-android-more-vertical"></em>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="md-dropdown-menu" >
                                                        <MenuItem eventKey="1">Last 30 days</MenuItem>
                                                        <MenuItem eventKey="2">Last week</MenuItem>
                                                        <MenuItem eventKey="3">Last year</MenuItem>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            {/* END dropdown */}
                                            <div className="card-title">Next Payment</div><small>Based on last month analytics.</small>
                                        </div>
                                        <div className="card-body">
                                            {/* START table-responsive */}
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Project</th>
                                                            <th>Completion</th>
                                                            <th className="text-right">Trend</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="va-middle"><span className="badge bg-pink-500">1</span></td>
                                                            <td>
                                                                <small className="text-thin">Nunc gposuere eleifend lobortis.</small>
                                                            </td>
                                                            <td className="va-middle">50%</td>
                                                            <td className="text-right va-middle"><em className="ion-arrow-graph-up-right text-success"></em></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="va-middle"><span className="badge bg-purple-400">2</span></td>
                                                            <td>
                                                                <small className="text-thin">Nunc posuere eleifend lobortis.</small>
                                                            </td>
                                                            <td className="va-middle">30%</td>
                                                            <td className="text-right va-middle"><em className="ion-arrow-graph-down-right text-warning"></em></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="va-middle"><span className="badge bg-indigo-500">3</span></td>
                                                            <td>
                                                                <small className="text-thin">Nunc posuere eleifend lobortis.</small>
                                                            </td>
                                                            <td className="va-middle">80%</td>
                                                            <td className="text-right va-middle"><em className="ion-arrow-graph-up-right text-success"></em></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="va-middle"><span className="badge bg-info">4</span></td>
                                                            <td>
                                                                <small className="text-thin">Nunc posuere eleifend lobortis.</small>
                                                            </td>
                                                            <td className="va-middle">50%</td>
                                                            <td className="text-right va-middle"><em className="ion-arrow-graph-down-right text-warning"></em></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            {/* END table-responsive */}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg="3" xs="12">
                            {/* Activity feed */}
                            <div className="card">
                                <div className="card-heading">
                                    {/* START dropdown */}
                                    <div className="pull-right">
                                        <Dropdown pullRight >
                                            <Dropdown.Toggle bsStyle="" noCaret className="btn btn-default btn-flat btn-flat-icon ripple">
                                              <em className="ion-android-more-vertical"></em>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="md-dropdown-menu" >
                                                <MenuItem eventKey="1">Last 30 days</MenuItem>
                                                <MenuItem eventKey="2">Last week</MenuItem>
                                                <MenuItem eventKey="3">Last year</MenuItem>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    {/* END dropdown */}
                                    <div className="card-title">Activity</div><small>What's people doing right now</small>
                                </div>
                                <div className="card-body bb">
                                    <p className="pull-left mr"><a href=""><img src="img/user/04.jpg" alt="User" className="img-circle thumb32"/></a></p>
                                    <div className="oh">
                                        <p><strong className="spr">Adam</strong><span className="spr">posted in</span><a href="">Material</a></p>
                                        <p className="bl pl"><i>That's awesome!</i></p>
                                        <div className="clearfix">
                                            <div className="pull-left text-muted"><em className="ion-android-time mr-sm"></em><span>2 hours ago</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body bb">
                                    <p className="pull-left mr"><a href=""><img src="img/user/06.jpg" alt="User" className="img-circle thumb32"/></a></p>
                                    <div className="oh">
                                        <p><strong className="spr">Dora</strong><span>added a new task</span></p>
                                        <p><em className="ion-calendar icon-fw"></em><a href="">Start migration</a></p>
                                        <div className="clearfix">
                                            <div className="pull-left text-muted"><em className="ion-android-time mr-sm"></em><span>3 hours ago</span></div>
                                            <div className="pull-right"><span>2</span><em className="ion-star ml-sm text-warning"></em></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body bb">
                                    <p className="pull-left mr"><a href=""><img src="img/user/07.jpg" alt="User" className="img-circle thumb32"/></a></p>
                                    <div className="oh">
                                        <p><strong className="spr">Kathryn</strong><span className="spr">published</span><a href="">Trip</a></p>
                                        <p><a href=""><img src="img/pic1.jpg" alt="Pic" className="mr-sm thumb48"/></a><a href=""><img src="img/pic2.jpg" alt="Pic" className="mr-sm thumb48"/></a></p>
                                        <div className="clearfix">
                                            <div className="pull-left text-muted"><em className="ion-android-time mr-sm"></em><span>4 hours ago</span></div>
                                            <div className="pull-right"><span>2</span><em className="ion-ios-heart ml-sm text-danger"></em></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body bb">
                                    <p className="pull-left mr"><a href=""><img src="img/user/02.jpg" alt="User" className="img-circle thumb32"/></a></p>
                                    <div className="oh">
                                        <p><strong className="spr">Daniel</strong><span className="spr">joined to</span><a href="">Group</a></p>
                                        <p><span className="image-list"><a href=""><img src="img/user/03.jpg" alt="User" className="img-circle thumb32"/></a><a href=""><img src="img/user/04.jpg" alt="User" className="img-circle thumb32"/></a><a href=""><img src="img/user/05.jpg" alt="User" className="img-circle thumb32"/></a><a href=""><img src="img/user/07.jpg" alt="User" className="img-circle thumb32"/></a><strong><a href="" className="ml-sm link-unstyled">+3</a></strong></span></p>
                                        <div className="clearfix">
                                            <div className="pull-left text-muted"><em className="ion-android-time mr-sm"></em><span>yesterday</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body bb">
                                    <p className="pull-left mr"><a href=""><img src="img/user/03.jpg" alt="User" className="img-circle thumb32"/></a></p>
                                    <div className="oh">
                                        <p><strong className="spr">Leroy Day</strong><span className="spr">wakes up!</span></p>
                                        <p className="bl pl"><i>That's awesome!</i></p>
                                        <div className="clearfix">
                                            <div className="pull-left text-muted"><em className="ion-android-time mr-sm"></em><span>2 weeks ago</span></div>
                                        </div>
                                    </div>
                                </div><a href="" className="card-footer btn btn-flat btn-default"><small className="text-center text-muted lh1">See more activities</small></a>
                            </div>
                        </Col>

                    </Row>
                </Grid>
            </section>
        );
    }
}

export default Dashboard;
