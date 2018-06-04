import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import { Row, Input, Button, Slider, Slide, Icon } from 'react-materialize'
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
			<Slider>
  <Slide
    src="https://3c1703fe8d.site.internapcdn.net/newman/gfx/news/hires/2018/crowdfunding.jpg"
    title="Micro funding">
    Here's our platform for community.
  </Slide>
  <Slide
    src="data:image/png;base64,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"
    title="Have an Idea?">
     No problem we are here.
  </Slide>
</Slider>
                <Row>
                    <Input placeholder="Enter Project Name" label="Project Name" 
                        onChange={this.handleNameChange.bind(this)} s={12} ><Icon>spellcheck</Icon></Input>
                    <Input type="textarea" laceholder="Enter the markdown for your project" label="Description"
                        onChange={this.handleMarkdownChange.bind(this)} s={12} ><Icon>insert_comment</Icon></Input>
                    <Input placeholder="Enter the url for the banner image" label="Banner Url"
                        onChange={this.handleBannerUrlChange.bind(this)} s={12}><Icon>camera</Icon></Input>
                    <h3 className="center">Milestones</h3>
                    {this.state.milestones.map((milestone, idx) => {
                        return(<div>
                            <Row>
                            <h6> Milestone {idx + 1} </h6>
                            <Input placeholder="Enter Milestone Name" 
                                onChange={this.handleMilestonNameChange(idx).bind(this)}><Icon>spellcheck</Icon></Input>
                            <Input placeholder="Enter Milestone Description"
                                onChange={this.handleMilestoneDescriptionChange(idx).bind(this)}><Icon>insert_comment</Icon></Input>
                            <Input placeholder="Enter Extimated Cost"
                                onChange={this.handleMilestoneCostChange(idx).bind(this)}><Icon>account_balance</Icon></Input>
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
export default AddProject