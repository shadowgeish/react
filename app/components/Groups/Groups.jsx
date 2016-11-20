import React from 'react';
import pubsub from 'pubsub-js';
import { Link } from 'react-router'
import { Grid, Row, Col, Dropdown, MenuItem, Button, ButtonGroup, ButtonToolbar, DropdownButton, SplitButton, Panel, Tabs, Tab, Well, Pagination, Tooltip, Popover, ProgressBar, Label, Modal} from 'react-bootstrap';

import GroupsRun from './Groups.run';
import RippleRun from '../Ripple/Ripple.run';
import '../Tables/Datatable.scss';
import '../Forms/Material.scss';
import RunAjaxRequest from '../Utils/RunAjaxRequest';

class Groups extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pageTitle: '',
            groups:[]
        };
    }

    componentWillMount() {
        pubsub.publish('setPageTitle', this.constructor.name);
    }


    componentDidMount() {
        GroupsRun();
        RippleRun();
        var dictParams = {'token': sessionStorage.getItem('token')};

        RunAjaxRequest('http://localhost:8888/get_groups?id=all', dictParams,(data) => {
            if(data){
                this.setState({
                    groups: data.groups
                });

                $('#groupsTable').dataTable({
                    'paging': true, // Table pagination
                    'ordering': true, // Column ordering
                    'info': true, // Bottom left status text
                    // Text translation options
                    // Note the required keywords between underscores (e.g _MENU_)
                    oLanguage: {
                        sSearch: '<em class="ion-search"></em>',
                        sLengthMenu: '_MENU_ records per page',
                        info: 'Showing page _PAGE_ of _PAGES_',
                        zeroRecords: 'Nothing found - sorry',
                        infoEmpty: 'No records available',
                        infoFiltered: '(filtered from _MAX_ total records)',
                        oPaginate: {
                            sNext: '<em class="ion-ios-arrow-right"></em>',
                            sPrevious: '<em class="ion-ios-arrow-left"></em>'
                        }
                    }
                });

            }

        });



    }

    render() {

        const groups = this.state.groups.map(function(group) {
          return (
                <tr className="gradeX">
                    <td><Link to={'group/' + group.id} className="ripple"> <Button bsStyle="primary" bsSize="xsmall" className="ripple">Details</Button></Link></td>
                    <td>{group.name}</td>
                    <td>{group.description}</td>
                    <td>{group.date_creation}</td>
                    <td>{group.amount}</td>
                    <td>{group.type_code}</td>
                    <td>{group.nb_members}</td>
                    <td>{group.currency}</td>
                    <td>Every {group.frequency} months</td>
                    <td>{group.due_day}</td>
                </tr>
          );
        });

        return (
            <section>
                <div className="content-heading bg-white">
                    <Row>
                        <Col sm="6">
                            <h4 className="m0 text-thin">
                                <span data-localize="GROUP"> Discreet Groups </span>
                            </h4>
                            <small>Groups</small>
                        </Col>

                        <Col sm="6"className="text-left hidden-xs">
                            <Row>
                                <Col sm="6"className="text-left hidden-xs">
                                    <label className="mda-checkbox">
                                        <input type="checkbox" defaultChecked/><em className="bg-green-500"></em>Public groups
                                    </label>
                                    <label className="mda-checkbox">
                                        <input type="checkbox" defaultChecked/><em className="bg-blue-500"></em>Public groups
                                    </label>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <Grid fluid>
                    <Row>
                        <Col lg="12">
                            <Row>
                                <Col lg="12">
                                    <div className="card">

                                        <div className="card-body">
                                            {/* START table-responsive */}
                                            <div className="table-responsive">

                                                {/* DATATABLE DEMO 2 */}
                                                <table id="groupsTable" className="table-datatable table table-striped table-hover mv-lg">
                                                    <thead>
                                                        <tr>
                                                            <th>Action</th>
                                                            <th>Group name</th>
                                                            <th>Description</th>
                                                            <th>Creation date</th>
                                                            <th className="sort-numeric">Amount</th>
                                                            <th>Type</th>
                                                            <th>Members</th>
                                                            <th>Currency</th>
                                                            <th>Frequency</th>
                                                            <th>Due day</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {groups}
                                                    </tbody>
                                                </table>


                                            </div>
                                            {/* END table-responsive */}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                    </Row>
                </Grid>
            </section>
        );
    }
}

export default Groups;
