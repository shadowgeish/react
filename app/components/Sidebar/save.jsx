import React from 'react';
import pubsub from 'pubsub-js';
import { Link } from 'react-router'
import { MenuItem, Button, Alert,Popover } from 'react-bootstrap';
import { Modal, ModalHeader, ModalBody,ModalFooter} from 'elemental';

import './Sidebar.scss';
import '../Forms/Material.scss';
import '../Forms/FormsAdvanced.scss';

import SidebarRun from './Sidebar.run';
import {initSvgReplace} from '../Utils/Utils';
import RippleRun from '../Ripple/Ripple.run';
import RunAjaxRequest from '../Utils/RunAjaxRequest';
import Translate from '../Translate/Translate';


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
        this.setState({showModal: false, autoFocus:true, keyboard:true});
    }

    c() {
        alert('ok');
        this.setState({showModal: true, autoFocus:true, keyboard:true});
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

        var dictParams = {
            'token':localStorage.getItem('token'),
            'newGroupName': newGroupName,
            'newGroupType': newGroupType,
            'newGroupDescription': newGroupDescription,
            'newGroupAmount': newGroupAmount,
            'newGroupFrequency': newGroupFrequency,
            'newGroupRate': newGroupRate,
            'newGroupDueDay': newGroupDueDay,
            'newGroupCurrency':newGroupCurrency
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
        var dictParams = {'token': localStorage.getItem('token')};

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
            <option value={type.id}>{type.name}</option>
          );
        });

        var currencies = this.state.currencies.map(function(ccy) {
          return (
            <option value={ccy.id}>{ccy.code}</option>
          );
        });

        var rotationTypes = this.state.rotationTypes.map(function(rotationType) {
          return (
            <option value={rotationType.id} data-localize="RANDOM"></option>
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

                        <Modal isOpen={this.state.showModal}>
                            <ModalHeader text="Lots of text to show scroll behavior" showCloseButton onClose={this.close.bind(this)}/>
                            <ModalBody>cdffd</ModalBody>
                            <ModalFooter>
                                <Button type="primary" onClick={this.close.bind(this)}>Close modal</Button>
                                <Button bsStyle="primary" onClick={this.close.bind(this)}>Also closes modal</Button>
                            </ModalFooter>
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
