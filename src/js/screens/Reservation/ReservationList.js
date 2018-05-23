import React, { Component } from 'react';
import DatePicker  from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { updateProperty, formatReservationList, resetReservations } from '../../actions/reservation';
import axios from 'axios';
import { ROUTES, button } from '../../constants';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import ActionContacts from 'material-ui/svg-icons/communication/contacts';
import ActionInfo from 'material-ui/svg-icons/action/info';

class ReservationList extends Component {
    setHotelName = (obj,hotelName) => {
        this.props.updateProperty({hotelName});
    };
    setCheckInDate = (obj,checkInDate) => {
        this.props.updateProperty({checkInDate});
    };
    setCheckOutDate = (obj,checkOutDate) => {
        this.props.updateProperty({checkOutDate});
    };
    getReservations = () => {
        let hotelName = null;
        let checkInDate = null;
        let checkOutDate = null;
        if(!hotelName && !checkInDate && !checkOutDate) {
            axios.get('/api/reservations')
                .then((res)=> {
                    if(res.data.length>0){
                        this.props.formatReservationList(res.data);
                    }
                })
                .catch(result => {
                    console.log("Error: ", result);
                })
        }
    };
    render() {
        const reservationList = this.props.reservation.filterList;
        const reservations = reservationList.length > 0?(
            <Paper zDepth={2}>
                <List>
                    <Subheader>Search Result</Subheader>
                    {reservationList.map((item) => {
                        return (<ListItem
                            leftAvatar={<Avatar icon={<ActionContacts />} />}
                            rightIcon={<ActionInfo />}
                            primaryText={item.hotelName}
                            secondaryText={item.name}
                            key={item.id}
                            onClick={()=>{this.props.history.push(ROUTES.reservationDetails+item.id)}}
                        />)
                    })}
                </List>
            </Paper>
        ):null;
        const resetFilter = reservationList.length > 0?(
                <RaisedButton label="Clear Search" labelColor="#FFFFFF" className="button" backgroundColor="#a4c639" onClick={this.props.resetReservations}/>
            ):null;
        return (
            <div>
                <h2>List of Reservation</h2>
                <Divider />
                <div className="contentWrapper">
                    <Paper zDepth={2} className="gapBottom">
                        <div className="boxTitle">
                            Filter
                        </div>
                        <div className="boxContent">
                            <div className="formBox">
                                <div className="formField">
                                    <TextField
                                        floatingLabelText="Hotel Name"
                                        onChange={this.setHotelName}
                                    />
                                </div>
                                <div className="formField">
                                    <DatePicker
                                        floatingLabelText="Check-in date"
                                        onChange={this.setCheckInDate}
                                    />
                                </div>
                                <div className="formField">
                                    <DatePicker
                                        floatingLabelText="Check-out date"
                                        onChange={this.setCheckOutDate}
                                    />
                                </div>
                            </div>
                            <RaisedButton
                                label="Search Reservations"
                                className="button"
                                fullWidth={true}
                                onClick={this.getReservations}
                                backgroundColor={button.backgroundColor}
                                labelColor={button.textColor}
                            />
                        </div>
                    </Paper>
                    {reservations}
                    {resetFilter}
                </div>
            </div>
        )
    }
}

// Connect
const mapStateToProps = state => ({
    reservation: state.reservation,
});

export default connect(mapStateToProps, { updateProperty, formatReservationList, resetReservations })(ReservationList);
