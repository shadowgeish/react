import React from 'react';
import pubsub from 'pubsub-js';
import { Link } from 'react-router'
import { MenuItem, Button, Modal, Alert,Popover } from 'react-bootstrap';


import './Sidebar.scss';
import '../Forms/Material.scss';
import '../Forms/FormsAdvanced.scss';

import SidebarRun from './Sidebar.run';
import {initSvgReplace} from '../Utils/Utils';
import RippleRun from '../Ripple/Ripple.run';
import RunAjaxRequest from '../Utils/RunAjaxRequest';


class Sidebar extends React.Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            showModal: false,
            activePage: 1,
            autoFocus:true,
            groupTypes:[],
            currencies:[],
            rotationTypes:[],
            keyboard:true
        };
    }

    close() {
        this.setState({ showModal: false, autoFocus:true, keyboard:true });
    }

    open() {

        this.setState({ showModal: true, autoFocus:true, keyboard:true  });
    }


    createNewGroup() {

        const newGroupName = this.refs.newGroupName.value;
        const newGroupType = this.refs.newGroupType.value;
        const newGroupDescription = this.refs.newGroupDescription.value;
        const newGroupAmount = this.refs.newGroupAmount.value;
        const newGroupFrequency = this.refs.newGroupFrequency.value;
        const newGroupRate = this.refs.newGroupRate.value;
        const newGroupDueDay = this.refs.newGroupDueDay.value;
        const newGroupCurrency = this.refs.newGroupCurrency.value;
        const newGroupNbMembers = this.refs.newGroupNbMembers.value;
        const newGroupRotationType = this.refs.newGroupRotationType.value;

        var dictParams = {
            'token':sessionStorage.getItem('token'),
            'newGroupName': newGroupName,
            'newGroupType': newGroupType,
            'newGroupDescription': newGroupDescription,
            'newGroupAmount': newGroupAmount,
            'newGroupFrequency': newGroupFrequency,
            'newGroupRate': newGroupRate,
            'newGroupDueDay': newGroupDueDay,
            'newGroupCurrency':newGroupCurrency,
            'newGroupNbMembers': newGroupNbMembers,
            'newGroupRotationType':newGroupRotationType
        };

        RunAjaxRequest('http://localhost:8888/add_group', dictParams,(data) => {
            if(data){
                alert(data.group_added);
                if(data.group_added == 'yes'){
                    swal('', '', 'success');
                }
                else
                {
                    $('#existing-group-text').hide().removeClass('hidden').show(500);
                }

            }
        });
    }

    componentDidMount() {
        SidebarRun();
        initSvgReplace();
        RippleRun();
        var dictParams = {'token': sessionStorage.getItem('token')};

        RunAjaxRequest('http://localhost:8888/get_list?list=listGroupRotation-ccy-listGroupType', dictParams,(data) => {
            if(data){
                this.setState({
                    rotationTypes: data.groupRotationType,
                    currencies: data.ccy,
                    groupTypes: data.groupType
                });
            }
        });



    }

    routeActive(paths) {
        paths = Array.isArray(paths) ? paths : [paths];
        for (let p in paths) {
            if (this.context.router.isActive(''+paths[p]) === true)
                return 'active';
        }
        return '';
    }

    render() {

        var groupTypes = this.state.groupTypes.map(function(type) {
          return (
            <option value={type.id} data-localize={type.code}></option>
          );
        });

        var currencies = this.state.currencies.map(function(ccy) {
          return (
            <option value={ccy.id} >{ccy.code}</option>
          );
        });

        var rotationTypes = this.state.rotationTypes.map(function(rotationType) {
          return (
            <option value={rotationType.id} data-localize={rotationType.code}></option>
          );
        });

        return (
            <aside className="sidebar-container">
                <div className="sidebar-header">
                    <div className="pull-right pt-lg text-muted hidden"><em className="ion-close-round"></em></div>
                    <a href="#" className="sidebar-header-logo"><img src="img/logo.png" data-svg-replace="img/logo.svg" alt="Logo" /><span className="sidebar-header-logo-text">Discreet-Income</span></a>
                </div>
                <div className="sidebar-content">
                    <div className="sidebar-toolbar text-center">
                        <a href=""><img src="img/user/01.jpg" alt="Profile" className="img-circle thumb64" /></a>
                        <div className="mt"><span data-localize="WELCOME">Welcome</span>, Serge NGOUBE</div>


                    </div>
                    <nav className="sidebar-nav">
                        <div className="form-group text-center">
                            <h4><Button bsStyle="primary" onClick={this.open.bind(this)} className="btn-raised mr ripple">Create a new Group</Button></h4>
                            <Modal show={this.state.showModal} backdrop="true" autoFocus={this.state.autoFocus} keyboard={this.state.keyboard} onHide={this.close.bind(this)}>
                              <Modal.Header closeButton>
                                <Modal.Title>Create un new group</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>

                                <div className="text-danger text-center hidden" id ="existing-group-text">The name already exists !</div>

                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="mda-form-group">
                                            <div className="mda-form-control">
                                                <input ref="newGroupName" tabIndex="0" aria-invalid="false" aria-required="true" className="form-control"/>
                                                <div className="mda-form-control-line"></div>
                                                <label>Name</label><span className="mda-form-msg right">Must be 100 characters</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="mda-form-group">
                                            <div className="mda-form-control">
                                                <select ref="newGroupType"  className="form-control">
                                                    {groupTypes}
                                                </select>
                                                <div className="mda-form-control-line"></div>
                                                <label>Type</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-12">
                                        <div className="mda-form-group">
                                            <div className="mda-form-control">
                                                <textarea rows="3" ref="newGroupDescription"  aria-multiline="true" aria-required="true" tabIndex="0" aria-invalid="false" className="form-control"></textarea>
                                                <div className="mda-form-control-line"></div>
                                                <label>Description</label><span className="mda-form-msg right">Enter 400 characters to discrib your group</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="mda-form-group">
                                            <div className="mda-form-control">
                                                <input required="" ref="newGroupAmount"  tabIndex="0" aria-required="true" aria-invalid="true" className="form-control"/>
                                                <div className="mda-form-control-line"></div>
                                                <label>Amount</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="mda-form-group">
                                            <div className="mda-form-control">
                                                <input required="" tabIndex="0" ref="newGroupFrequency"  aria-required="true" aria-invalid="false" className="form-control"/>
                                                <div className="mda-form-control-line"></div>
                                                <label>Frequency</label><span className="mda-form-msg right"> Every x month</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="mda-form-group">
                                            <div className="mda-form-control">
                                                <input required="" tabIndex="0" ref="newGroupNbMembers"  aria-required="true" aria-invalid="false" className="form-control"/>
                                                <div className="mda-form-control-line"></div>
                                                <label>Number of members</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="mda-form-group">
                                            <div className="mda-form-control">
                                                <input required="" tabIndex="0" ref="newGroupRate" aria-required="true" aria-invalid="true" className="form-control"/>
                                                <div className="mda-form-control-line"></div>
                                                <label>Rate</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="mda-form-group">
                                            <div className="mda-form-control">
                                                <input required="" ref="newGroupDueDay" tabIndex="0" aria-required="true" aria-invalid="true" className="form-control"/>
                                                <div className="mda-form-control-line"></div>
                                                <label>Due Date</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="mda-form-group">
                                            <div className="mda-form-control">
                                                <select ref="newGroupCurrency"  className="form-control">
                                                    {currencies}
                                                </select>
                                                <div className="mda-form-control-line"></div>
                                                <label>Currency</label>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-sm-6">
                                        <div className="mda-form-group">
                                            <div className="mda-form-control" >
                                                <select ref="newGroupRotationType"  className="form-control">
                                                    {rotationTypes}
                                                </select>
                                                <div  className="mda-form-control-line"></div>
                                                <label>Rotation Type</label>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-sm-12 text-center">
                                        <h1><Button bsStyle="primary" onClick={this.createNewGroup.bind(this)} className="btn-raised mr ripple">Create my new group</Button></h1>
                                    </div>
                                </div>

                              </Modal.Body>
                            </Modal>
                        </div>
                        <ul>
                            <li className={this.routeActive('/dashboard') ? 'active':''}>
                                <Link to="dashboard" className="ripple">
                                    <span className="pull-right nav-label"><span className="badge bg-success">2</span></span><span className="nav-icon">
                                    <img src="" data-svg-replace="img/icons/aperture.svg" alt="MenuItem" className="hidden" /></span>
                                    <span>Dashboard</span>
                                </Link>
                            </li>

                            <li className={this.routeActive('/groups') ? 'active':''}>
                                <Link to="groups" className="ripple">
                                    <span className="nav-icon">
                                    <img src="" data-svg-replace="img/icons/ios-people.svg" alt="MenuItem" className="hidden" /></span>
                                    <span>Groups</span>
                                </Link>
                            </li>

                            <li className={this.routeActive('/account') ? 'active':''}>
                                <Link to="account" className="ripple">
                                    <span className="pull-right nav-label"><span className="badge bg-success">2</span></span><span className="nav-icon">
                                    <img src="" data-svg-replace="img/icons/cash.svg" alt="MenuItem" className="hidden" /></span>
                                    <span>Account</span>
                                </Link>
                            </li>


                            <li className={this.routeActive('/profile') ? 'active':''}>
                                <Link to="profile" className="ripple">
                                    <span className="pull-right nav-label"><span className="badge bg-warning">2</span></span><span className="nav-icon">
                                    <img src="" data-svg-replace="img/icons/ios-person.svg" alt="MenuItem" className="hidden" /></span>
                                    <span>My Profile</span>
                                </Link>
                            </li>

                            <li className={this.routeActive('/faq') ? 'active':''}>
                                <Link to="faq" className="ripple">
                                    <span className="pull-right nav-label"><span className="badge bg-success">2</span></span><span className="nav-icon">
                                    <img src="" data-svg-replace="img/icons/help-circled.svg" alt="MenuItem" className="hidden" /></span>
                                    <span>Simulation</span>
                                </Link>
                            </li>

                            <li className={this.routeActive('/faq') ? 'active':''}>
                                <Link to="faq" className="ripple">
                                    <span className="pull-right nav-label"><span className="badge bg-success">2</span></span><span className="nav-icon">
                                    <img src="" data-svg-replace="img/icons/help-circled.svg" alt="MenuItem" className="hidden" /></span>
                                    <span>FAQ</span>
                                </Link>
                            </li>

                            <li className={this.routeActive('/aboutus') ? 'active':''}>
                                <Link to="aboutus" className="ripple">
                                    <span className="pull-right nav-label"><span className="badge bg-success">2</span></span><span className="nav-icon">
                                    <img src="" data-svg-replace="img/icons/ribbon-b.svg" alt="MenuItem" className="hidden" /></span>
                                    <span>About us</span>
                                </Link>
                            </li>

                        </ul>
                    </nav>
                </div>
            </aside>
        );
    }
}

Sidebar.contextTypes = {
    router: React.PropTypes.object
};

export default Sidebar;
