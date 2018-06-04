import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import { Row, Input, Button } from 'react-materialize'
import ApiService from '../services/ApiService';

class AddProject extends Component {
    constructor() {
        super();
        this.Auth = new AuthService();
        this.Api = new ApiService();
        this.state = {
            name: "",
            markdown: "",
            banner_url: "",
            milestones: [{
                name: "",
                description: "",
                cost: 0
            }],
            total_cost: 0,
            bannerUrl: "",
        }
    }

    componentDidMount(){
        if(!this.Auth.loggedIn()){
            this.props.history.replace('/');
        }
    }

    handleMilestonNameChange = (idx) => (evt) => {
        const newMilestones = this.state.milestones.map((milestone, sidx) => {
            if (idx != sidx) return milestone
            else {
                return { ...milestone, name: evt.target.value }
            }
        });

        this.setState({ milestones: newMilestones })
    }

    handleMilestoneDescriptionChange = (idx) => (evt) => {
        const newMilestones = this.state.milestones.map((milestone, sidx) => {
            if (idx != sidx) return milestone
            return { ...milestone, description: evt.target.value }
        });

        this.setState({ milestones: newMilestones })
    }

    handleMilestoneCostChange = (idx) => (evt) => {
        const newMilestones = this.state.milestones.map((milestone, sidx) => {
            if (idx != sidx) return milestone;
            return { ...milestone, cost: evt.target.value }
        });

        this.setState({ milestones: newMilestones })
    }

    handleAddMileStone() {
        this.setState({
            milestones: this.state.milestones.concat({
                name: "",
                description: "",
                cost: 0
            })
        });
    }

    handleRemoveMilestone = (idx) => () => {
        this.setState({
            milestones: this.state.milestones.filter((m, sidx) => idx !== sidx)
        });
    }

    handleNameChange(e){
        this.setState({name: e.target.value});
    }

    handleMarkdownChange(e){
        this.setState({markdown: e.target.value});
    }

    handleBannerUrlChange(e){
        this.setState({banner_url: e.target.value});
    }

    handleSubmit(){
        const output ={
            name: this.state.name,
            markdown: this.state.markdown,
            milestones: this.state.milestones
        }
        console.log(output)
        this.Api.addProject(
            this.state.name,
            this.state.markdown,
            this.state.banner_url,
            this.state.milestones
        )
        .then(res => alert("added success fully"))
        .catch(err => alert(err));
    }

    render() {
        return (
            <div>
                <Row>
                    <Input placeholder="Enter Project Name" label="Project Name" 
                        onChange={this.handleNameChange.bind(this)} s={12} />
                    <Input placeholder="Enter the markdown for your project" label="Description"
                        onChange={this.handleMarkdownChange.bind(this)} s={12} />
                    <Input placeholder="Enter the url for the banner image" label="Banner Url"
                        onChange={this.handleBannerUrlChange.bind(this)} s={12}/>
                    <h3 className="center">Milestones</h3>
                    {this.state.milestones.map((milestone, idx) => {
                        return(<div>
                            <Row>
                            <h6> Milestone {idx + 1} </h6>
                            <Input placeholder="Enter Milestone Name" 
                                onChange={this.handleMilestonNameChange(idx).bind(this)}/>
                            <Input placeholder="Enter Milestone Description"
                                onChange={this.handleMilestoneDescriptionChange(idx).bind(this)}/>
                            <Input placeholder="Enter Extimated Cost"
                                onChange={this.handleMilestoneCostChange(idx).bind(this)}/>
                            <Button onClick={this.handleRemoveMilestone(idx)}>-</Button>
                            </Row>
                        </div>)
                    })}
                    <Button onClick={this.handleAddMileStone.bind(this)}>Add Milestone</Button>
                    <br/>
                    <br/>
                    <Button onClick={this.handleSubmit.bind(this)}>Submit</Button>
                </Row>
            </div>
        )
    }
}

export default AddProject;