import React, {Component} from 'react';
import { withRouter } from 'react-router';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';

import { ROUTES } from '../constants';

class Nav extends Component {
    render() {
        return (
            <div className="navBar">
                {this.props.children}
                <List className="navList">
                    <ListItem primaryText="Reservation List" leftIcon={<ContentInbox />}
                              onClick={()=>{
                                  this.props.history.push(ROUTES.home)
                              }}/>
                    <Divider />
                    <ListItem primaryText="Create Reservation" leftIcon={<ActionGrade />}
                              onClick={()=>{
                                  this.props.history.push(ROUTES.reservationCreate)
                              }}/>
                    <Divider />
                </List>
            </div>
        )
    }
}

export default withRouter(Nav);
