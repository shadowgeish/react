import React from 'react';
import pubsub from 'pubsub-js';
import { Grid, Row, Col, Button, Dropdown, MenuItem } from 'react-bootstrap';

import AccountRun from './Account.run';

class Account extends React.Component {

    componentWillMount() {
        pubsub.publish('setPageTitle', this.constructor.name);
    }

    componentDidMount() {
        AccountRun();
    }

    render() {
        return (
            <section>
                <div className="content-heading bg-white">
                    <Row>
                        <Col sm="9">
                            <h4 className="m0 text-thin">
                            <span data-localize="GROUP">Balance</span></h4><small>List of payments</small>
                        </Col>
                        <Col sm="3"className="text-right hidden-xs">
                            <h4><Button bsStyle="warning" className="btn-raised mr ripple">Make a payment</Button></h4>
                        </Col>
                    </Row>
                </div>
                <Grid fluid>
                    <Row>
                        {/* Left column */}
                        <Col md={7} lg={8}>
                            <div className="card">
                                <h5 className="card-heading pb0">
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

                                <h5 className="card-heading pb0">List </h5>
                                <div className="card-body ">



                                     <div className="table-responsive">
                                                <table id="paymentTable" className="table-datatable table table-striped table-hover mv-lg">
                                                            <thead>
                                                                <tr>
                                                                    <th>Rendering engine</th>
                                                                    <th>Browser</th>
                                                                    <th>Platform(s)</th>
                                                                    <th className="sort-numeric">Engine version</th>
                                                                    <th className="sort-alpha">CSS grade</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr className="gradeX">
                                                                    <td>Trident</td>
                                                                    <td>Internet Explorer 4.0</td>
                                                                    <td>Win 95+</td>
                                                                    <td>4</td>
                                                                    <td>X</td>
                                                                </tr>
                                                                <tr className="gradeC">
                                                                    <td>Trident</td>
                                                                    <td>Internet Explorer 5.0</td>
                                                                    <td>Win 95+</td>
                                                                    <td>5</td>
                                                                    <td>C</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Trident</td>
                                                                    <td>Internet Explorer 5.5</td>
                                                                    <td>Win 95+</td>
                                                                    <td>5.5</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Trident</td>
                                                                    <td>Internet Explorer 6</td>
                                                                    <td>Win 98+</td>
                                                                    <td>6</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Trident</td>
                                                                    <td>Internet Explorer 7</td>
                                                                    <td>Win XP SP2+</td>
                                                                    <td>7</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Trident</td>
                                                                    <td>AOL browser (AOL desktop)</td>
                                                                    <td>Win XP</td>
                                                                    <td>6</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Gecko</td>
                                                                    <td>Firefox 1.0</td>
                                                                    <td>Win 98+ / OSX.2+</td>
                                                                    <td>1.7</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Gecko</td>
                                                                    <td>Firefox 1.5</td>
                                                                    <td>Win 98+ / OSX.2+</td>
                                                                    <td>1.8</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Gecko</td>
                                                                    <td>Firefox 2.0</td>
                                                                    <td>Win 98+ / OSX.2+</td>
                                                                    <td>1.8</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Gecko</td>
                                                                    <td>Firefox 3.0</td>
                                                                    <td>Win 2k+ / OSX.3+</td>
                                                                    <td>1.9</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Gecko</td>
                                                                    <td>Camino 1.0</td>
                                                                    <td>OSX.2+</td>
                                                                    <td>1.8</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Gecko</td>
                                                                    <td>Camino 1.5</td>
                                                                    <td>OSX.3+</td>
                                                                    <td>1.8</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Gecko</td>
                                                                    <td>Netscape 7.2</td>
                                                                    <td>Win 95+ / Mac OS 8.6-9.2</td>
                                                                    <td>1.7</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Gecko</td>
                                                                    <td>Netscape Browser 8</td>
                                                                    <td>Win 98SE+</td>
                                                                    <td>1.7</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Gecko</td>
                                                                    <td>Netscape Navigator 9</td>
                                                                    <td>Win 98+ / OSX.2+</td>
                                                                    <td>1.8</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Gecko</td>
                                                                    <td>Mozilla 1.0</td>
                                                                    <td>Win 95+ / OSX.1+</td>
                                                                    <td>1</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Gecko</td>
                                                                    <td>Mozilla 1.1</td>
                                                                    <td>Win 95+ / OSX.1+</td>
                                                                    <td>1.1</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Gecko</td>
                                                                    <td>Mozilla 1.2</td>
                                                                    <td>Win 95+ / OSX.1+</td>
                                                                    <td>1.2</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Gecko</td>
                                                                    <td>Mozilla 1.3</td>
                                                                    <td>Win 95+ / OSX.1+</td>
                                                                    <td>1.3</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Gecko</td>
                                                                    <td>Mozilla 1.4</td>
                                                                    <td>Win 95+ / OSX.1+</td>
                                                                    <td>1.4</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Gecko</td>
                                                                    <td>Mozilla 1.5</td>
                                                                    <td>Win 95+ / OSX.1+</td>
                                                                    <td>1.5</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Gecko</td>
                                                                    <td>Mozilla 1.6</td>
                                                                    <td>Win 95+ / OSX.1+</td>
                                                                    <td>1.6</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Gecko</td>
                                                                    <td>Mozilla 1.7</td>
                                                                    <td>Win 98+ / OSX.1+</td>
                                                                    <td>1.7</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Gecko</td>
                                                                    <td>Mozilla 1.8</td>
                                                                    <td>Win 98+ / OSX.1+</td>
                                                                    <td>1.8</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Gecko</td>
                                                                    <td>Seamonkey 1.1</td>
                                                                    <td>Win 98+ / OSX.2+</td>
                                                                    <td>1.8</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Gecko</td>
                                                                    <td>Epiphany 2.20</td>
                                                                    <td>Gnome</td>
                                                                    <td>1.8</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Webkit</td>
                                                                    <td>Safari 1.2</td>
                                                                    <td>OSX.3</td>
                                                                    <td>125.5</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Webkit</td>
                                                                    <td>Safari 1.3</td>
                                                                    <td>OSX.3</td>
                                                                    <td>312.8</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Webkit</td>
                                                                    <td>Safari 2.0</td>
                                                                    <td>OSX.4+</td>
                                                                    <td>419.3</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Webkit</td>
                                                                    <td>Safari 3.0</td>
                                                                    <td>OSX.4+</td>
                                                                    <td>522.1</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Webkit</td>
                                                                    <td>OmniWeb 5.5</td>
                                                                    <td>OSX.4+</td>
                                                                    <td>420</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Webkit</td>
                                                                    <td>iPod Touch / iPhone</td>
                                                                    <td>iPod</td>
                                                                    <td>420.1</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Webkit</td>
                                                                    <td>S60</td>
                                                                    <td>S60</td>
                                                                    <td>413</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Presto</td>
                                                                    <td>Opera 7.0</td>
                                                                    <td>Win 95+ / OSX.1+</td>
                                                                    <td>-</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Presto</td>
                                                                    <td>Opera 7.5</td>
                                                                    <td>Win 95+ / OSX.2+</td>
                                                                    <td>-</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Presto</td>
                                                                    <td>Opera 8.0</td>
                                                                    <td>Win 95+ / OSX.2+</td>
                                                                    <td>-</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Presto</td>
                                                                    <td>Opera 8.5</td>
                                                                    <td>Win 95+ / OSX.2+</td>
                                                                    <td>-</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Presto</td>
                                                                    <td>Opera 9.0</td>
                                                                    <td>Win 95+ / OSX.3+</td>
                                                                    <td>-</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Presto</td>
                                                                    <td>Opera 9.2</td>
                                                                    <td>Win 88+ / OSX.3+</td>
                                                                    <td>-</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Presto</td>
                                                                    <td>Opera 9.5</td>
                                                                    <td>Win 88+ / OSX.3+</td>
                                                                    <td>-</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Presto</td>
                                                                    <td>Opera for Wii</td>
                                                                    <td>Wii</td>
                                                                    <td>-</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Presto</td>
                                                                    <td>Nokia N800</td>
                                                                    <td>N800</td>
                                                                    <td>-</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>Presto</td>
                                                                    <td>Nintendo DS browser</td>
                                                                    <td>Nintendo DS</td>
                                                                    <td>8.5</td>
                                                                    <td>C/A<sup>1</sup></td>
                                                                </tr>
                                                                <tr className="gradeC">
                                                                    <td>KHTML</td>
                                                                    <td>Konqureror 3.1</td>
                                                                    <td>KDE 3.1</td>
                                                                    <td>3.1</td>
                                                                    <td>C</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>KHTML</td>
                                                                    <td>Konqureror 3.3</td>
                                                                    <td>KDE 3.3</td>
                                                                    <td>3.3</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeA">
                                                                    <td>KHTML</td>
                                                                    <td>Konqureror 3.5</td>
                                                                    <td>KDE 3.5</td>
                                                                    <td>3.5</td>
                                                                    <td>A</td>
                                                                </tr>
                                                                <tr className="gradeX">
                                                                    <td>Tasman</td>
                                                                    <td>Internet Explorer 4.5</td>
                                                                    <td>Mac OS 8-9</td>
                                                                    <td>-</td>
                                                                    <td>X</td>
                                                                </tr>
                                                                <tr className="gradeC">
                                                                    <td>Tasman</td>
                                                                    <td>Internet Explorer 5.1</td>
                                                                    <td>Mac OS 7.6-9</td>
                                                                    <td>1</td>
                                                                    <td>C</td>
                                                                </tr>
                                                                <tr className="gradeC">
                                                                    <td>Tasman</td>
                                                                    <td>Internet Explorer 5.2</td>
                                                                    <td>Mac OS 8-X</td>
                                                                    <td>1d</td>
                                                                    <td>C</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                     </div>
                                            {/* END table-responsive */}



                                </div>
                            </div>
                        </Col>
                        {/* Right column */}
                        <Col md={5} lg={4}>

                            <div className="card bg-info">
                                <div className="card-body text-center">
                                    <p className="lead m0">##########</p>
                                </div>
                                <div className="card-footer text-right">
                                    <button type="button" className="btn btn-flat btn-info text-white">Show number</button>
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
                                <h5 className="card-heading">Payment Requests</h5>
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

export default Account;
