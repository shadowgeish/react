import React from 'react';
import pubsub from 'pubsub-js';
import { Link } from 'react-router'
import { Grid, Row, Col, Dropdown, MenuItem, Button, ButtonGroup, ButtonToolbar, DropdownButton, SplitButton } from 'react-bootstrap';

import DashboardRun from './Dashboard.run';
import RippleRun from '../Ripple/Ripple.run';
import RunAjaxRequest from '../Utils/RunAjaxRequest';

class Dashboard extends React.Component {

    componentWillMount() {
        pubsub.publish('setPageTitle', this.constructor.name);
    }

    constructor(props) {
        super(props);
        this.state = {
            paymentsData: [],
            membersData: [],
            eventsData: []
        };
    }

    componentDidMount() {
        DashboardRun();
        RippleRun();

        var dictParams = {'token': sessionStorage.getItem('token'),'id':this.props.params.id};
        RunAjaxRequest('http://localhost:8888/dashboard', dictParams,(data) => {
            if(data){
                this.setState({
                    paymentsData: data.payments_data,
                    membersData: data.members_data,
                    eventsData: data.events_data
                });

            }
        });

    }

    render() {

        const event_list = this.state.eventsData.map(function(event) {
          return (
                <div className="card-body pb0">
                    <p className="pull-left mr"><em className="ion-record text-info"></em></p>
                    <div className="oh">
                        <p><span className="mr-sm" data-localize={event.event_type}>{event.event_type}</span><strong className="mr-sm">{event.group}</strong></p>
                        <div className="clearfix">
                            <p className="bl pl"><i><a href="#">Click to open the group</a></i></p>
                            <div className="pull-left text-muted"><em className="ion-android-time mr-sm"></em><span>{event.duration_seconds} ago</span></div>
                        </div>
                    </div>
                </div>
          );
        });

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
                                {event_list}
                                <a href="" className="card-footer btn btn-flat btn-default"><small className="text-center text-muted lh1">See more activities</small></a>
                            </div>
                        </Col>

                    </Row>
                </Grid>
            </section>
        );
    }
}

export default Dashboard;
