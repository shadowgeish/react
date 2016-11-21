import React from 'react';
import pubsub from 'pubsub-js';
import { Link } from 'react-router'
import { Grid, Row, Col, Dropdown, MenuItem, Button, ButtonGroup, ButtonToolbar, DropdownButton, SplitButton, Panel, Tabs, Tab, Well, Pagination, Tooltip, Popover, ProgressBar, Label, Modal} from 'react-bootstrap';

import GroupRun from './Group.run';
import RippleRun from '../Ripple/Ripple.run';
import '../Tables/Datatable.scss';
import '../Forms/Material.scss';
import '../Pages/Timeline.scss';
import RunAjaxRequest from '../Utils/RunAjaxRequest';
import './Group.scss';

class Group extends React.Component {


    componentWillMount() {
        pubsub.publish('setPageTitle', this.constructor.name);
    }

    componentDidMount() {
        GroupRun();
        RippleRun();
        //alert(this.props.params.id);
        var dictParams = {'token': sessionStorage.getItem('token'),'id':this.props.params.id};
        RunAjaxRequest('http://localhost:8888/get_groups', dictParams,(data) => {
            if(data){
                var col1=[];
                var col2=[];
                for(var i=0;i<data.members_data.length;i++){
                    if(i%2==0){
                        col1.push(data.members_data[i]);
                    }
                    else{
                        col2.push(data.members_data[i]);
                    }
                }

                this.setState({
                    groupData: data.group_info,
                    membersData: data.members_data,
                    eventsData: data.events_data,
                    col1:col1,
                    col2:col2
                });

            }
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            showModalMsg: false,
            showModalNew: false,
            groupData:{},
            membersData:[],
            eventsData: [],
            col1:[],
            col2:[]
        };
    }

    closeMsg() {
        this.setState({ showModalMsg: false,showModalAddMember: false });
    }


    closeNew() {
        this.setState({ showModalNew: false,showModalAddMember: false  });
    }

    openNew() {
        this.setState({ showModalNew: true,showModalAddMember: false  });
    }

    addNewMember() {
        const emailtoadd = this.refs.emailsToAdd.value;
        var data = $('#addMemberInput').select2('data');

        var email_array = [];
        //for each(item in data){
        for(var i=0;i<data.length;i++){
            email_array.push(data[i].text);
        }
        var email_list = email_array.join(';');

        var dictParams = {'token': sessionStorage.getItem('token'),
                          'id':this.props.params.id,
                          'email_list':email_list
                          };
        RunAjaxRequest('http://localhost:8888/add_group_member', dictParams,(data) => {
            if(data){
                var col1=[];
                var col2=[];
                for(var i=0;i<data.members_data.length;i++){
                    if(i%2==0){
                        col1.push(data.members_data[i]);
                    }
                    else{
                        col2.push(data.members_data[i]);
                    }
                }

                this.setState({
                    groupData: data.group_info,
                    membersData: data.members_data,
                    eventsData: data.events_data,
                    col1:col1,
                    col2:col2
                });

            }
        });

    }


    render() {
        const members_fco1 = this.state.col1.map(function(member) {
          return (
                <div className="mda-list-item-group">
                    <img src="img/user/02.jpg" alt="List user" className="mda-list-item-img thumb40"/>
                    <div className="mda-list-item-text mda-2-line">
                        <h4><a href="#">{member.first_name} {member.sur_name}</a></h4>
                        <div className="text-muted text-ellipsis">{member.email}</div>
                    </div>
                </div>
          );
        });
        const members_fco2 = this.state.col2.map(function(member) {
          return (
                <li className="mda-list-item">
                    <img src="img/user/02.jpg" alt="List user" className="mda-list-item-img thumb40"/>
                    <div className="mda-list-item-text mda-2-line">
                        <h4><a href="#">{member.first_name} {member.sur_name}</a></h4>
                        <div className="text-muted text-ellipsis">{member.email}</div>
                    </div>
                </li>
          );
        });

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
                <div className="container-overlap bg-white">
                    <Row>
                        <Col sm="6">
                            <h4 className="m0 text-thin">
                            <span data-localize="GROUP"> </span> {this.state.groupData.name}<small><Label bsStyle="danger" className="hidden">private</Label><Label bsStyle="-*" className="">public</Label></small></h4><small><Link to="groups" className="ripple">Groups</Link> > {this.state.groupData.name} </small>
                        </Col>
                    </Row>
                </div>

                <Grid fluid>
                    <Row>
                        <Col lg="12" md="12">

                            <ul id="myTabs" role="tablist" className="nav nav-pills nav-justified">
                                <li role="presentation" className="active"><a id="home-tab" href="#home" role="tab" data-toggle="tab" aria-controls="home" aria-expanded="true"><b>Home</b></a></li>
                                <li role="presentation"><a id="profile-tab" href="#payments" role="tab" data-toggle="tab" aria-controls="profile">Payments</a></li>
                                <li role="presentation" className="dropdown"><a id="profile-tab" href="#messages" role="tab" data-toggle="tab" aria-controls="messages">Messages</a></li>
                                <li role="presentation" className="dropdown"><a id="profile-tab" href="#grouprequests" role="tab" data-toggle="tab" aria-controls="messages">Requests</a></li>
                            </ul>
                            <div id="group-tab-content" className="tab-content text-left">
                                <div id="home" role="tabpanel" aria-labelledby="home-tab" className="tab-pane fade in active" bsStyle="pills" >

                                    <Row>
                                        {/* Left column */}
                                        <Col md={7} lg={8}>
                                            <form editable-form="" name="user.profileForm" className="card">
                                                <h5 className="card-heading pb0">
                                                    {/* START dropdown */}
                                                    <div className="pull-right">
                                                        <Label bsStyle="info">active</Label>

                                                        <Dropdown pullRight >
                                                            <Dropdown.Toggle bsStyle="" noCaret className="btn-flat btn-flat-icon">
                                                              <em className="ion-android-more-vertical"></em>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu className="md-dropdown-menu" >
                                                                <MenuItem eventKey="1">Request payment</MenuItem>
                                                                <MenuItem eventKey="2">Report an issue</MenuItem>
                                                            </Dropdown.Menu>
                                                        </Dropdown>

                                                    </div>
                                                    {/* END dropdown */}
                                                    About
                                                </h5>
                                                <div className="card-body">
                                                    <p data-type="textarea" className="is-editable text-inherit">{this.state.groupData.description}</p>
                                                </div>
                                                <div className="card-divider"></div>
                                                <div className="card-offset">
                                                    <div className="card-offset-item text-right">
                                                        <button id="edit-enable" type="button" className="btn-raised btn btn-warning btn-circle btn-lg"><em className="ion-edit"></em></button>
                                                        <button id="edit-disable" type="submit" className="btn-raised btn btn-success btn-circle btn-lg hidden"><em className="ion-checkmark-round"></em></button>
                                                    </div>
                                                </div>
                                                <h5 className="card-heading pb0">Group Information</h5>
                                                <div className="card-body">
                                                    <table className="table table-striped">
                                                        <tbody>
                                                            <tr>
                                                                <td><em className="ion-document-text icon-fw mr"></em>Name</td>
                                                                <td>{this.state.groupData.name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><em className="ion-egg icon-fw mr"></em>Creation date</td>
                                                                <td><span data-type="date" data-mode="popup" className="is-editable text-inherit">{this.state.groupData.date_creation}</span></td>
                                                            </tr>
                                                            <tr>
                                                                <td><em className="ion-ios-body icon-fw mr"></em>Amount</td>
                                                                <td><span data-type="date" data-mode="popup" className="is-editable text-inherit">{this.state.groupData.amount}</span></td>
                                                            </tr>

                                                            <tr>
                                                                <td><em className="ion-ios-body icon-fw mr"></em>Frequency</td>
                                                                <td><span data-type="date" data-mode="popup" className="is-editable text-inherit">Every {this.state.groupData.frequency} months</span></td>
                                                            </tr>

                                                            <tr>
                                                                <td><em className="ion-ios-body icon-fw mr"></em>Due day</td>
                                                                <td><span data-type="date" data-mode="popup" className="is-editable text-inherit">On {this.state.groupData.due_day} of the month</span></td>
                                                            </tr>

                                                            <tr>
                                                                <td><em className="ion-ios-body icon-fw mr"></em>Creator</td>
                                                                <td><span data-type="date" data-mode="popup" className="is-editable text-inherit">{this.state.groupData.creator}</span></td>
                                                            </tr>



                                                            <tr>
                                                                <td><em className="ion-android-home icon-fw mr"></em>Rates</td>
                                                                <td><span className="is-editable text-inherit">{this.state.groupData.rate}</span></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <div className="form-group text-center">
                                                        <h4><Button bsStyle="warning" className="btn-raised mr ripple btn-lg">Start Now </Button></h4>
                                                    </div>
                                                </div>

                                                <div className="card-footer">
                                                    <p><small>14 / 29, Previous: Serge, Next: Rafael</small></p>
                                                    <div id="group-round" className="flot-chart"></div>
                                                </div>
                                                <div className="card-divider"></div>
                                                <h5 className="card-heading pb0">{this.state.groupData.nb_members} Members</h5>
                                                <div className="card-body">
                                                    <Row>
                                                        <div className="text-danger text-center hidden" id ="existing-email-text">The email is already added !</div>
                                                        <div className="input-group">
                                                            <select id="addMemberInput" ref="emailsToAdd"  placeholder="Enter a email then spacei k ..." multiple="multiple" className="form-control" data-tags="true"></select><span className="input-group-btn">
                                                                <button type="button"  onClick={this.addNewMember.bind(this)} className="btn-raised btn btn-warning"><em className="ion-person-add"></em></button></span>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <Col md={6}>

                                                            <div className="mda-list-group">
                                                                {members_fco1}
                                                            </div>

                                                        </Col>
                                                        <Col md={6}>
                                                            <ul className="mda-list-group">
                                                                {members_fco2}
                                                            </ul>
                                                        </Col>
                                                    </Row>


                                                    <div className="card-body pv0 text-right"><a href="#" className="btn btn-flat btn-info">View all</a></div>


                                                </div>
                                            </form>
                                        </Col>
                                        {/* Right column */}
                                        <Col md={5} lg={4}>

                                            <div className="card bg-success">
                                                <div className="card-body pv">
                                                    <div className="clearfix">
                                                        <div className="pull-left">
                                                            <h4 className="m0 text-thin">780</h4>
                                                        </div>
                                                        <div className="text-right mt-lg">
                                                        <Link to="groups" className="ripple text-thin text-white"><small className="m0 text-thin">payments</small></Link>
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
                                                    Activity
                                                </h5>
                                                {event_list}
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

                                                <a href="" className="card-footer btn btn-flat btn-default"><small className="text-center text-muted lh1">See more activities</small></a>
                                            </div>
                                        </Col>
                                    </Row>



                                </div>
                                <div id="payments" role="tabpanel" aria-labelledby="profile-tab" className="tab-pane fade">
                                <div className="card">
                                        <div className="card-heading">
                                            <div className="form-group">

                                            <div className="col-md-1 col-sm-1">
                                                <select id="group-selector2"  className="form-control">
                                                    <optgroup label="Alaskan/Hawaiian Time Zone">
                                                        <option value="AK">Alaska</option>
                                                        <option value="HI">Hawaii</option>
                                                    </optgroup>
                                                    <optgroup label="Pacific Time Zone">
                                                        <option value="CA">California</option>
                                                        <option value="NV">Nevada</option>
                                                    </optgroup>
                                                    <optgroup label="Mountain Time Zone">
                                                        <option value="AZ">Arizona</option>
                                                        <option value="CO">Colorado</option>
                                                        <option value="ID">Idaho</option>
                                                    </optgroup>
                                                </select>
                                            </div>
                                            <div className="col-md-1 col-sm-1">
                                                <select id="group-selector3"  className="form-control">
                                                    <optgroup label="Alaskan/Hawaiian Time Zone">
                                                        <option value="AK">Alaska</option>
                                                        <option value="HI">Hawaii</option>
                                                    </optgroup>
                                                    <optgroup label="Pacific Time Zone">
                                                        <option value="CA">California</option>
                                                        <option value="NV">Nevada</option>
                                                    </optgroup>
                                                    <optgroup label="Mountain Time Zone">
                                                        <option value="AZ">Arizona</option>
                                                        <option value="CO">Colorado</option>
                                                        <option value="ID">Idaho</option>
                                                    </optgroup>
                                                </select>
                                            </div>
                                            <div className="col-md-1 col-sm-1">
                                                <select id="group-selector4"  className="form-control">
                                                    <optgroup label="Alaskan/Hawaiian Time Zone">
                                                        <option value="AK">Alaska</option>
                                                        <option value="HI">Hawaii</option>
                                                    </optgroup>
                                                    <optgroup label="Pacific Time Zone">
                                                        <option value="CA">California</option>
                                                        <option value="NV">Nevada</option>
                                                    </optgroup>
                                                    <optgroup label="Mountain Time Zone">
                                                        <option value="AZ">Arizona</option>
                                                        <option value="CO">Colorado</option>
                                                        <option value="ID">Idaho</option>
                                                    </optgroup>
                                                </select>
                                            </div>
                                            <Button bsStyle="primary" className="btn-raised mr ripple">Filter</Button>
                                        </div>

                                        </div>

                                        <div className="card-body">
                                           <div className="table-responsive">
                                                <table id="groupsPaymentTable" className="table-datatable table table-striped table-hover mv-lg">
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
                                </div>
                                <div id="messages" role="tabpanel" aria-labelledby="messages-tab" className="tab-pane fade">
                                    <div className="card">
                                        <div className="card-heading">
                                            <div className="form-group">

                                                <div className="col-md-1 col-sm-1">
                                                    <select id="group-selector2"  className="form-control">
                                                        <optgroup label="Alaskan/Hawaiian Time Zone">
                                                            <option value="AK">Alaska</option>
                                                            <option value="HI">Hawaii</option>
                                                        </optgroup>
                                                        <optgroup label="Pacific Time Zone">
                                                            <option value="CA">California</option>
                                                            <option value="NV">Nevada</option>
                                                        </optgroup>
                                                        <optgroup label="Mountain Time Zone">
                                                            <option value="AZ">Arizona</option>
                                                            <option value="CO">Colorado</option>
                                                            <option value="ID">Idaho</option>
                                                        </optgroup>
                                                    </select>
                                                </div>
                                                <div className="col-md-1 col-sm-1">
                                                    <select id="group-selector3"  className="form-control">
                                                        <optgroup label="Alaskan/Hawaiian Time Zone">
                                                            <option value="AK">Alaska</option>
                                                            <option value="HI">Hawaii</option>
                                                        </optgroup>
                                                        <optgroup label="Pacific Time Zone">
                                                            <option value="CA">California</option>
                                                            <option value="NV">Nevada</option>
                                                        </optgroup>
                                                        <optgroup label="Mountain Time Zone">
                                                            <option value="AZ">Arizona</option>
                                                            <option value="CO">Colorado</option>
                                                            <option value="ID">Idaho</option>
                                                        </optgroup>
                                                    </select>
                                                </div>
                                                <div className="col-md-1 col-sm-1">
                                                    <select id="group-selector4"  className="form-control">
                                                        <optgroup label="Alaskan/Hawaiian Time Zone">
                                                            <option value="AK">Alaska</option>
                                                            <option value="HI">Hawaii</option>
                                                        </optgroup>
                                                        <optgroup label="Pacific Time Zone">
                                                            <option value="CA">California</option>
                                                            <option value="NV">Nevada</option>
                                                        </optgroup>
                                                        <optgroup label="Mountain Time Zone">
                                                            <option value="AZ">Arizona</option>
                                                            <option value="CO">Colorado</option>
                                                            <option value="ID">Idaho</option>
                                                        </optgroup>
                                                    </select>
                                                </div>
                                                <Button bsStyle="primary" className="btn-raised mr ripple">Filter</Button>
                                            </div>

                                        </div>

                                        <div className="card-body">
                                                {/* START timeline */}
                                                <ul className="timeline-alt">
                                                    <li data-datetime="Now" className="timeline-separator"></li>
                                                    {/* START timeline item */}
                                                    <li>
                                                        <div className="timeline-badge bg-info"></div>
                                                        <div className="timeline-panel">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <p><strong>Client Meeting</strong></p>
                                                                    <small>Pellentesque ut diam velit, eget porttitor risus. Nullam posuere euismod volutpat.</small>
                                                                    <div className="text-right"><a href="">Av 123 St - Floor 2</a></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    {/* END timeline item */}
                                                    {/* START timeline item */}
                                                    <li className="timeline-inverted">
                                                        <div className="timeline-badge bg-pink-400"></div>
                                                        <div className="timeline-panel">
                                                            <div className="card">
                                                                <div className="card-body"><em className="mr ion-ios-telephone icon-lg"></em>Call with Michael</div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    {/* END timeline item */}
                                                    {/* START timeline separator */}
                                                    <li data-datetime="Yesterday" className="timeline-separator"></li>
                                                    {/* END timeline separator */}
                                                    {/* START timeline item */}
                                                    <li>
                                                        <div className="timeline-badge bg-purple-500"></div>
                                                        <div className="timeline-panel">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <p><strong>Conference</strong></p>
                                                                    <p>Join development group</p><small><a href="skype:echo123?call"><em className="ion-ios-telephone mr-sm icon-lg"></em> Call the Skype Echo</a></small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    {/* END timeline item */}
                                                    {/* START timeline item */}
                                                    <li className="timeline-inverted">
                                                        <div className="timeline-badge bg-green-500"></div>
                                                        <div className="timeline-panel">
                                                            <div className="card right">
                                                                <div className="card-body">
                                                                    <p><strong>Appointment</strong></p>
                                                                    <p>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    {/* END timeline item */}
                                                    {/* START timeline item */}
                                                    <li>
                                                        <div className="timeline-badge bg-info"></div>
                                                        <div className="timeline-panel">
                                                            <div className="card bg-blue-500">
                                                                <div className="card-body">
                                                                    <p><strong>Fly</strong></p>
                                                                    <p>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    {/* END timeline item */}
                                                    {/* START timeline separator */}
                                                    <li data-datetime="2 days ago" className="timeline-separator"></li>
                                                    {/* END timeline separator */}
                                                    {/* START timeline item */}
                                                    <li className="timeline-inverted">
                                                        <div className="timeline-badge bg-warning"></div>
                                                        <div className="timeline-panel">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <p><strong>Relax</strong></p>
                                                                    <p>Listen some music</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    {/* END timeline item */}
                                                    {/* START timeline item */}
                                                    <li className="timeline-end"><a href="" className="timeline-badge bg-blue-grey-200"></a></li>
                                                    {/* END timeline item */}
                                                </ul>
                                                {/* END timeline */}
                                        </div>

                                        {/* Floating button for compose */}
                                        <div className="floatbutton">
                                            <ul className="mfb-component--br mfb-zoomin">
                                                <li className="mfb-component__wrap">
                                                    <a onClick={this.openNew.bind(this)} id="compose" href="#" className="mfb-component__button--main">
                                                        <i className="mfb-component__main-icon--resting ion-edit"></i>
                                                        <i className="mfb-component__main-icon--active ion-edit"></i></a>
                                                    <ul className="mfb-component__list"></ul>
                                                </li>
                                            </ul>
                                        </div>


                                        {/* Modal content example for compose */}
                                        <Modal show={this.state.showModalNew} onHide={this.closeNew.bind(this)}>
                                            <Modal.Body>
                                                <form action="">
                                                    <div className="mda-form-group">
                                                        <div className="mda-form-control">
                                                            <input rows="3" aria-multiline="true" tabindex="0" aria-invalid="false" className="form-control"/>
                                                            <div className="mda-form-control-line"></div>
                                                            <label>To:</label>
                                                        </div>
                                                    </div>
                                                    <div className="mda-form-group">
                                                        <div className="mda-form-control">
                                                            <textarea rows="3" aria-multiline="true" tabindex="0" aria-invalid="false" className="form-control"></textarea>
                                                            <div className="mda-form-control-line"></div>
                                                            <label>Message</label>
                                                        </div>
                                                    </div>
                                                    <Button onClick={this.closeNew.bind(this)} bsStyle="success">Send</Button>
                                                </form>
                                            </Modal.Body>
                                        </Modal>
                                        {/* End Modal content example for compose */}

                                    </div>
                                </div>
                                <div id="grouprequests" role="tabpanel" aria-labelledby="messages-tab" className="tab-pane fade">

                                    <div className="card">
                                        <div className="card-heading">
                                            <div className="form-group">

                                            <div className="col-md-1 col-sm-1">
                                                <select id="group-selector2"  className="form-control">
                                                    <optgroup label="Alaskan/Hawaiian Time Zone">
                                                        <option value="AK">Alaska</option>
                                                        <option value="HI">Hawaii</option>
                                                    </optgroup>
                                                    <optgroup label="Pacific Time Zone">
                                                        <option value="CA">California</option>
                                                        <option value="NV">Nevada</option>
                                                    </optgroup>
                                                    <optgroup label="Mountain Time Zone">
                                                        <option value="AZ">Arizona</option>
                                                        <option value="CO">Colorado</option>
                                                        <option value="ID">Idaho</option>
                                                    </optgroup>
                                                </select>
                                            </div>
                                            <div className="col-md-1 col-sm-1">
                                                <select id="group-selector3"  className="form-control">
                                                    <optgroup label="Alaskan/Hawaiian Time Zone">
                                                        <option value="AK">Alaska</option>
                                                        <option value="HI">Hawaii</option>
                                                    </optgroup>
                                                    <optgroup label="Pacific Time Zone">
                                                        <option value="CA">California</option>
                                                        <option value="NV">Nevada</option>
                                                    </optgroup>
                                                    <optgroup label="Mountain Time Zone">
                                                        <option value="AZ">Arizona</option>
                                                        <option value="CO">Colorado</option>
                                                        <option value="ID">Idaho</option>
                                                    </optgroup>
                                                </select>
                                            </div>
                                            <div className="col-md-1 col-sm-1">
                                                <select id="group-selector4"  className="form-control">
                                                    <optgroup label="Alaskan/Hawaiian Time Zone">
                                                        <option value="AK">Alaska</option>
                                                        <option value="HI">Hawaii</option>
                                                    </optgroup>
                                                    <optgroup label="Pacific Time Zone">
                                                        <option value="CA">California</option>
                                                        <option value="NV">Nevada</option>
                                                    </optgroup>
                                                    <optgroup label="Mountain Time Zone">
                                                        <option value="AZ">Arizona</option>
                                                        <option value="CO">Colorado</option>
                                                        <option value="ID">Idaho</option>
                                                    </optgroup>
                                                </select>
                                            </div>
                                            <Button bsStyle="primary" className="btn-raised mr ripple">Filter</Button>
                                        </div>

                                        </div>

                                        <div className="card-body">
                                           <div className="table-responsive">
                                                <table id="groupsPaymentTable" className="table-datatable table table-striped table-hover mv-lg">
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

                                </div>
                            </div>


                        </Col>

                    </Row>
                </Grid>
            </section>
        );
    }
}

export default Group;
