import React, { Component } from 'react';
import * as RecordsAPI from "../utils/RecordsAPI"
export default class RecordsForm extends Component{
    constructor (props){
        super(props);
        this.state = {
            date: "",
            title: "",
            amount: "",
        }
    }
    valid() {
        return this.state.date && this.state.title && this.state.amount;
    }
    handleChange(event) {
        const {name,value} = event.target;
        this.setState({
            [name]: value
        })
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = {
            date: this.state.date,
            title: this.state.title,
            amount: Number.parseInt(this.state.amount, 0)
        };
        RecordsAPI.create(data).then(
            response => {
                this.props.handleNewRecord(response.data);
                this.setState({
                    date: "",
                    title: "",
                    amount: "",
                })
            }
        ).catch(
            error => console.log(error.message)
        )
    }
    render() {
        return (
            <form className="form-inline mb-3" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group mr-1">
                    <input type="text" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Date" name="date" value={this.state.date}/>
                </div>
                <div className="form-group mr-1">
                    <input type="text" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Title" name="title" value={this.state.title}/>
                </div>
                <div className="form-group mr-1">
                    <input type="text" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Amount" name="amount" value={this.state.amount}/>
                </div>
                <button type="submit" disabled={!this.valid()} className="btn btn-primary">Create Record</button>
            </form>
        );
    }
}
