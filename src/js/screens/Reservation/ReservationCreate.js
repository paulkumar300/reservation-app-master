import React, {Component} from 'react';
import Divider from 'material-ui/Divider';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { updateProperty } from '../../actions/reservation';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { button, hotelList } from '../../constants';
import axios from 'axios';

class ReservationCreate extends Component {
    setHotelName = (obj,createHotelName) => {
        if(hotelList[createHotelName].length>0){
            this.props.updateProperty({createHotelNameError:null});
        } else {
            this.props.updateProperty({createHotelNameError:'This field is required'});
        }
        this.props.updateProperty({createHotelName});
    };
    setName = (obj,createName) => {
        if(createName){
            this.props.updateProperty({createNameError:null});
        } else {
            this.props.updateProperty({createNameError:'This field is required'});
        }
        this.props.updateProperty({createName});
    };
    setCheckInDate = (obj,createCheckInDate) => {
        if(createCheckInDate){
            this.props.updateProperty({createCheckInDateError:null});
        } else {
            this.props.updateProperty({createCheckInDateError:'This field is required'});
        }
        this.props.updateProperty({createCheckInDate});
    };
    setCheckOutDate = (obj,createCheckOutDate) => {
        if(createCheckOutDate){
            this.props.updateProperty({createCheckOutDateError:null});
        } else {
            this.props.updateProperty({createCheckOutDateError:'This field is required'});
        }
        this.props.updateProperty({createCheckOutDate});
    };
    createReservation = () => {
        let {createHotelName, createName, createCheckInDate, createCheckOutDate } = this.props.reservation;
        this.props.updateProperty({
            createHotelNameError:!hotelList[createHotelName]?'This field is required':null,
            createNameError:!createName?'This field is required':null,
            createCheckInDateError:!createCheckInDate?'This field is required':null,
            createCheckOutDateError:!createCheckOutDate?'This field is required':null,
        });
        if(hotelList[createHotelName] && createName && createCheckInDate && createCheckOutDate) {
            const headers = {
                    "key": "Content-Type",
                    "value": "application/json",
                    "description": ""
                };
            const data = {
                "mode": "raw",
                "raw": {
                    name: createName,
                    hotelName: hotelList[createHotelName],
                    arrivalDate: createCheckInDate,
                    departureDate: createCheckOutDate,
                }
            };
            axios.post('/api/reservations', data ,headers)
                .then((res)=> {
                    console.log("Result: ",res);
                })
                .catch(result => {
                    console.log("Error: ", result);
                })
        }
    };
    render() {
        return (
            <div>
                <h2>Create Reservation</h2>
                <Divider />
                <div className="contentWrapper">
                    <Paper zDepth={2} className="gapBottom">
                        <div className="boxTitle">
                            New User Reservation
                        </div>
                        <div className="boxContent">
                            <div className="formBox">
                                <div className="formField">
                                    <TextField
                                        floatingLabelText="Name"
                                        onChange={this.setName}
                                        errorText={this.props.reservation.createNameError}
                                    />
                                </div>
                                <div className="formField">
                                    <SelectField
                                        floatingLabelText="Hotel Name"
                                        value={this.props.reservation.createHotelName}
                                        onChange={this.setHotelName}
                                        className="selectBox"
                                        errorText={this.props.reservation.createHotelNameError}
                                    >
                                        <MenuItem value={0} primaryText="Hotel Mumbai" />
                                        <MenuItem value={1} primaryText="Hotel Delhi" />
                                        <MenuItem value={2} primaryText="Hotel Bangalore" />
                                        <MenuItem value={3} primaryText="Hotel Chennai" />
                                    </SelectField>
                                </div>
                                <div className="formField">
                                    <DatePicker
                                        floatingLabelText="Check-in date"
                                        onChange={this.setCheckInDate}
                                        errorText={this.props.reservation.createCheckInDateError}
                                    />
                                </div>
                                <div className="formField">
                                    <DatePicker
                                        floatingLabelText="Check-out date"
                                        onChange={this.setCheckOutDate}
                                        errorText={this.props.reservation.createCheckOutDateError}
                                    />
                                </div>
                            </div>
                            <RaisedButton
                                label="Create New User Reservation"
                                className="button"
                                fullWidth={true}
                                onClick={this.createReservation}
                                backgroundColor={button.backgroundColor}
                                labelColor={button.textColor}
                            />
                        </div>
                    </Paper>
                </div>
            </div>
        )
    }
}

// Connect
const mapStateToProps = state => ({
    reservation: state.reservation,
});

export default connect(mapStateToProps, { updateProperty })(ReservationCreate);
