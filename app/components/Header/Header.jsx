import React from 'react';
import pubsub from 'pubsub-js';
import { Dropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router'
import './Header.scss';
import './HeaderMenuLinks.scss';
import RippleRun from '../Ripple/Ripple.run';
import HeaderRun from './Header.run';
import RunAjaxRequest from '../Utils/RunAjaxRequest';

class Header extends React.Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            pageTitle: '',
            groups:[],
            has_groups:'hidden',
            myPrivateGroups:[],
            myPublicGroups:[]
        };
    }

    componentWillMount() {
        this.pubsub_token = pubsub.subscribe('setPageTitle', (ev, title) => {
            this.setState({pageTitle: title});
        });
    }

    componentWillUnmount() {
        pubsub.unsubscribe(this.pubsub_token);
    }

    showSearch() {
        pubsub.publish('showsearch');
    }

    showSettings() {
        pubsub.publish('showsettings');
    }

    componentDidMount() {
        HeaderRun();
        RippleRun();
        var dictParams = {'token': sessionStorage.getItem('token')};

        RunAjaxRequest('http://localhost:8888/get_groups?id=all', dictParams,(data) => {
            if(data){

                var myPrivateGroups = [];
                var myPublicGroups = [];
                var has_groups = data.groups.length == 0 ?  'hidden':'';
                for(var i=0;i<data.groups.length;i++){

                    if(data.groups[i].type=='PRIVATE'){
                        myPrivateGroups.push(data.groups[i]);
                    }
                    else {
                        myPublicGroups.push(data.groups[i]);
                    }

                }
                //var notItem = {'id':-1,'name':'No'};
                //if(myPublicGroups.length==0){
                //    myPublicGroups.push(notItem);
                //}
                //if(myPrivateGroups.length==0){
                //    myPrivateGroups.push(notItem);
                //}
                this.setState({
                    groups: data.groups,
                    has_groups:has_groups,
                    myPublicGroups:myPublicGroups,
                    myPrivateGroups:myPrivateGroups
                });
                $('#group-selector').select2();
                $('#group-selector').on("change", (event) => {
                    this.context.router.push('/group/' + event.target.value);
                });


            }
        });
    }

    handleChange(event) {
        alert(event.target.value);
        //this.setState({value: event.target.value});
        console.log(event.target.value);
    }

    render() {
        const ddMenuItem = (<span>
                                <em className="ion-person"></em><sup className="badge bg-danger">3</sup>
                            </span>);

        const publicGroups = this.state.myPublicGroups.map(function(group) {
          return (
                <option value={group.id}>{group.name}</option>
          );
        });

        const privateGroups = this.state.myPrivateGroups.map(function(group) {
          return (
                <option value={group.id}>{group.name}</option>
          );
        });

        return (
            <header className="header-container">
                <nav>
                    <ul className="visible-xs visible-sm">
                        <li><a id="sidebar-toggler" href="#" className="menu-link menu-link-slide"><span><em></em></span></a></li>
                    </ul>
                    <ul className="hidden-xs">
                        <li><a id="offcanvas-toggler" href="#" className="menu-link menu-link-slide"> <span><em></em></span></a></li>
                    </ul>
                    <h2 className="header-title"></h2>

                    <ul className="pull-right">
                        <li>


                            <div class="row">
                              <div class="col-xs-3">
                                <div class="form-group {this.state.has_groups}">
                                    <select id="group-selector" className="form-control" data-width="fit">
                                        <optgroup label="Public">
                                            {publicGroups}
                                        </optgroup>
                                        <optgroup label="Private">
                                            {privateGroups}
                                        </optgroup>
                                    </select>
                                </div>
                              </div>
                            </div>

                        </li>




                        <li>
                            <a href="#" className="ripple" onClick={this.showSearch}>
                                <em className="ion-ios-search-strong"></em>
                            </a>
                        </li>

                        <li>
                            <a href="#" className="ripple">
                                <em className="ion-card"></em>
                            </a>
                        </li>

                        <Dropdown id="basic-nav-dropdown" pullRight componentClass="li">
                            <Dropdown.Toggle useAnchor noCaret className="has-badge ripple">
                              <em className="ion-person"></em>
                              <sup className="badge bg-danger">3</sup>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="md-dropdown-menu" >
                                <LinkContainer to="profile">
                                    <MenuItem eventKey={3.1}>
                                        <em className="ion-home icon-fw"></em>
                                        Profile
                                    </MenuItem>
                                </LinkContainer>
                                <LinkContainer to="account">
                                    <MenuItem eventKey={3.2}><em className="ion-gear-a icon-fw"></em>Account</MenuItem>
                                </LinkContainer>
                                <MenuItem divider />
                                <LinkContainer to="/login">
                                    <MenuItem eventKey={3.3}><em className="ion-log-out icon-fw"></em>Logout</MenuItem>
                                </LinkContainer>
                            </Dropdown.Menu>
                        </Dropdown>
                        <li>
                            <a href="#" className="ripple" onClick={this.showSettings}>
                                <em className="ion-gear-b"></em>
                            </a>
                        </li>
                    </ul>

                </nav>
            </header>
        );
    }
}

Header.contextTypes = {
    router: React.PropTypes.object
};

export default Header;
