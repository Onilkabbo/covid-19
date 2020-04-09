import React, { Component } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import axios from 'axios';
import Moment from 'react-moment';
import Card from '../common/Card';
import Spinner from '../common/Spinner';
import './LocalCase.css';

export default class Localcase extends Component {
    state = {
        confirmed: null,
        deaths: null,
        recovered: null,
        countries: [],
        default_country: null,
        load: false,
        last_update_time: ''
    }
    componentWillMount() {
        axios.get('https://covid19.mathdro.id/api/countries')
            .then(res => {
                this.setState({countries: res.data.countries, load: true});
            })
            .catch(err => console.log(err))

        axios.get('https://ipapi.co/country')
        .then(res => {
            this.setState({
                default_country: res.data
            })
            axios.get(`https://covid19.mathdro.id/api/countries/${res.data}`)
            .then(res => {
                this.setState({
                    confirmed: res.data.confirmed.value,
                    deaths: res.data.deaths.value,
                    recovered: res.data.recovered.value,
                    last_update_time: res.data.lastUpdate
                });
            })
        });
    }
    setSelectedCountry = (country) => {
        axios.get(`https://covid19.mathdro.id/api/countries/${country}`)
            .then(res => {
                this.setState({
                    confirmed: res.data.confirmed.value,
                    deaths: res.data.deaths.value,
                    recovered: res.data.recovered.value,
                    last_update_time: res.data.lastUpdate
                });
            })
    }
    render() {
        let html = <Spinner />;
        if(this.state.load && this.state.default_country !== null) {
            html = <ReactFlagsSelect
                        countries={this.state.countries.iso2}
                        searchable={true}
                        defaultCountry={this.state.default_country}
                        onSelect={code => this.setSelectedCountry(code)}
                    />
        }
        return (
            <div className="Globalcase">
                        {html}
                    <p className="time_update">{
                        this.state.last_update_time && <Moment parse="YYYY-MM-DD HH:mm">
                            {this.state.last_update_time }
                        </Moment>
                    }</p>
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
