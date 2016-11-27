import React from 'react';
import pubsub from 'pubsub-js';
import { Link } from 'react-router'
import { Grid, Row, Col, Dropdown, MenuItem, Button, ButtonGroup, ButtonToolbar, DropdownButton, SplitButton, Modal, Alert,Popover  } from 'react-bootstrap';
import DashboardRun from './Dashboard.run';
import RippleRun from '../Ripple/Ripple.run';
import RunAjaxRequest from '../Utils/RunAjaxRequest';


import Pagination from 'react-js-pagination'
import './Dashboard.scss';

class Dashboard extends React.Component {

    componentWillMount() {
        pubsub.publish('setPageTitle', this.constructor.name);
    }

    constructor(props) {
        super(props);
        this.state = {
            paymentsData: [],
            requestsData: [],
            request_to_join_group_list:[],
            eventsData: [],
            activePage: 1,
            no_requests:[],
            no_events:[],
            isLoading: false,
            RequestAutoFocus:false,
            RequestKeyboard:false,
            RequestShowModal:false,
            ModalRequestSender:'',
            ModalRequestGroup:'',
            availableRotationPositions:[],
            positionSelectionType:'',
            currentRequest:-1,
            innerClass: 'pagination pagination-sm rounded-pagination'
        };

        this.handlePageChange = this.handlePageChange.bind(this)
    }

    RequestClose() {
        this.setState({ RequestShowModal: false});
    }

    accept(requestId) {
        var allReq = this.state.requestsData;
        var req = undefined;
        if(allReq){
            for(var i=0;i<allReq.length;i++){
                if(allReq[i].id == requestId){
                    req = allReq[i];
                }
            }
        }

        var dictParams = {'token': sessionStorage.getItem('token'), 'request_id':requestId, 'action':'acceptRequestWindow'};
        RunAjaxRequest('http://localhost:8888/dashboard', dictParams,(data) => {
            if(data){
                this.setState({
                    availableRotationPositions:data.available_rotation_positions,
                    positionSelectionType:data.position_selection_type,
                    RequestShowModal: true
                });

            }
        });

        this.setState({ModalRequestSender:req.sender, ModalRequestGroup:req.group, currentRequest:requestId });
    }

    reject() {

        this.setState({ RequestShowModal: true, RequestAutoFocus:true, RequestKeyboard:true  });
    }

    joinGroup(requestId){

        var dictParams = {'token': sessionStorage.getItem('token'), 'request_id':requestId, 'action':'joinGroup'};
        RunAjaxRequest('http://localhost:8888/dashboard', dictParams,(data) => {
            if(data){
                if(data.status == 'ok'){
                    this.reload();
                    this.setState({RequestShowModal: false});
                    swal('', '', 'success');
                }
            }
        });

    }

    handlePageChange(pageNumber) {

        console.log('active page is ' + pageNumber);

        this.setState({activePage: pageNumber});

    }

    reload(){
        this.setState({ isLoading: true });
        var dictParams = {'token': sessionStorage.getItem('token')};
        RunAjaxRequest('http://localhost:8888/dashboard', dictParams,(data) => {
            if(data){


                var request_to_join_group_list = [];
                var no_requests = [];
                var no_events = [];


                if(data.requests_data){
                    if(data.requests_data.length==0){
                        no_requests.push({});
                    }

                    for(var i=0;i<data.requests_data.length;i++){
                        if(data.requests_data[i].REQUEST_TO_JOIN_GROUP){
                            request_to_join_group_list.push(data.requests_data[i]);
                        }
                    }
                }else{
                    no_requests.push({});
                }

                //Events
                if(data.events_data){
                    if(data.events_data.length==0){
                        no_events.push({});
                    }
                }else{
                    no_events.push({});
                }

                this.setState({
                    paymentsData: data.payments_data,
                    requestsData: data.requests_data,
                    eventsData: data.events_data,
                    eventsDataCount: data.events_data_count,
                    paymentsDataCount: data.payments_data_count,
                    RequestsDataCount: data.requests_data_count,
                    no_requests:no_requests,
                    no_events:no_events,
                    isLoading: false,
                    request_to_join_group_list:request_to_join_group_list
                });




            }
        });
    }

    componentDidMount() {
        DashboardRun();
        RippleRun();
        this.reload();

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

        const request_list = this.state.request_to_join_group_list.map( (request) => {
          return (
                <li className="list-group-item"><small><strong>{request.sender}</strong> would like to add you to his group [<strong>{request.group}</strong>]</small> <Button bsStyle="success" className="btn-flat ripple" bsSize="small" onClick={() => this.accept(request.id)} ><small>accept</small></Button> <Button bsStyle="danger" bsSize="small" className="btn-flat mr ripple"><small>reject</small></Button> </li>
          );
        });

        const no_request = this.state.no_requests.map(function(request) {
          return (
                <div className="text-center"><i><small>No Request</small></i></div>
                );
        });

        const no_event = this.state.no_events.map(function(event) {
          return (
                <div className="text-center"><i><small>No recent event</small></i></div>
                );
        });

        const position_list = this.state.availableRotationPositions.map(function(pos) {
          return (
            <option value={pos.code}>{pos.value}</option>
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
                                            <div className="card-title">Request</div><small>List of requests received</small>
                                        </div>
                                        <ul className="list-group m0">
                                            {request_list}
                                            {no_request}
                                            <div className="text-center">
                                                <Pagination
                                                  activePage={this.state.activePage}
                                                  itemsCountPerPage={6}
                                                  totalItemsCount={this.state.RequestsDataCount}
                                                  pageRangeDisplayed={5}
                                                  innerClass={this.state.innerClass}
                                                  onChange={this.handlePageChange}
                                                />
                                            </div>
                                        </ul>
                                        <Modal show={this.state.RequestShowModal} backdrop="true" autoFocus={this.state.RequestAutoFocus} keyboard={this.state.RequestKeyboard} onHide={this.RequestClose.bind(this)}>
                                          <Modal.Header closeButton>
                                            <Modal.Title>Accept to join {this.state.ModalRequestGroup} group</Modal.Title>
                                            <div className="text-center"><small>Request from {this.state.ModalRequestSender}</small></div>

                                          </Modal.Header>
                                          <Modal.Body>

                                            <div className="text-danger text-center hidden" id ="existing-group-text">The name already exists !</div>

                                            <div className="row">

                                                <div className="mda-form-control col-sm-12" >
                                                    <select ref="position"  className="form-control">
                                                        {position_list}
                                                    </select>
                                                    <div  className="mda-form-control-line"></div>
                                                    <label>Rotation Postition</label>
                                                </div>



                                                <div className="col-sm-12 text-center">
                                                    <h1 className="text-center"><Button bsStyle="warning" onClick={() => this.joinGroup(this.state.currentRequest)} className="btn-raised mr ripple">Join the group</Button>
                                                    <Button bsStyle="primary" className="btn-raised mr ripple" onClick={this.RequestClose.bind(this)} >Cancel</Button>
                                                    </h1>
                                                </div>
                                            </div>

                                          </Modal.Body>
                                        </Modal>


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
                                            <div className="card-title">Next Payment</div><small>Next incoming payments.</small>
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
                                                                <small>Nunc gposuere eleifend lobortis.</small>
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
                                    <div className="card-title">Activity</div><small>Recent events</small>
                                </div>
                                {no_event}
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
