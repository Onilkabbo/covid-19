import React, { Component } from 'react';
import './Globalcase.css';
import axios from 'axios';
import Moment from 'react-moment';
import Card from '../common/Card';

export default class Globalcase extends Component {
    state = {
        confirmed: null,
        deaths: null,
        recovered: null,
        last_update_time: ''
    }

    componentDidMount() {
        axios.get('https://covid19.mathdro.id/api')
            .then(res => {
                // console.log(res.data);
                this.setState({
                    confirmed: res.data.confirmed.value,
                    deaths: res.data.deaths.value,
                    recovered: res.data.recovered.value,
                    last_update_time: res.data.lastUpdate
                });
                
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="Globalcase">
                <h3 className="global_title">Global Case</h3>
                <p className="time_update">
                    {
                        this.state.last_update_time && <Moment parse="YYYY-MM-DD HH:mm">
                                {this.state.last_update_time }
                            </Moment>
                    }
                    
                </p>
                <div className="row">
                    <Card 
                        class_name="yellow"
                        value={this.state.confirmed}
                        title="Confirmed"
                    />
                    <Card 
                        class_name="red"
                        value={this.state.deaths}
                        title="Deaths"
                    />
                    <Card 
                        class_name="green"
                        value={this.state.recovered}
                        title="Recovered"
                    />
                </div>
            </div>
        )
    }
}
