import React, {Component} from 'react';
import { connect } from 'react-redux';
import { updateDetails } from '../../actions/reservation';
import Divider from 'material-ui/Divider';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import axios from 'axios';

class ReservationDetails extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        console.log("ID: ",id);
        axios.get('/api/reservation/'+id)
            .then((res)=> {
                console.log("Result: ",res);
                if(res.data.length>0){
                    this.props.updateDetails(res.data[0]);
                }
            })
            .catch(result => {
                console.log("Error: ", result);
            })
    }
    render() {
        let hotelName = "Loading...";
        let name = "Loading...";
        let checkInDate = "Loading...";
        let checkOutDate = "Loading...";
        if(this.props.reservation.details.hotelName) {
            hotelName = this.props.reservation.details.hotelName;
            name = this.props.reservation.details.name;
            checkInDate = this.props.reservation.details.checkInDate;
            checkOutDate = this.props.reservation.details.checkOutDate;
        }
        const styles = {
            chip: {
                margin: 4,
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap',
            },
        };
        return (
            <div>
                <h2>Reservation Details</h2>
                <Divider />
                <div className="contentWrapper">
                    <Card
                        initiallyExpanded={true}
                    >
                        <CardHeader
                            title={hotelName}
                            subtitle={name}
                        />
                        <CardText expandable={true}>
                            <div style={styles.wrapper}>
                                <Chip
                                    style={styles.chip}
                                >
                                    Arival Date: {checkInDate}
                                </Chip>
                                <Chip
                                    style={styles.chip}
                                >
                                    Departure Date: {checkOutDate}
                                </Chip>
                            </div>
                        </CardText>
                    </Card>
                </div>
            </div>
        )
    }
}

// Connect
const mapStateToProps = state => ({
    reservation: state.reservation,
});

export default connect(mapStateToProps, { updateDetails })(ReservationDetails);
