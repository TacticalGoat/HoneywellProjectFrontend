import React, { Component } from 'react'
import { Card, CardTitle, Button, Icon, Row, Col, Chip, Modal, Tabs, Tab, Input } from 'react-materialize'
import ReactMarkdown from 'react-markdown';
import AuthService from '../services/AuthService';
import ApiService from '../services/ApiService';


class Project extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
    this.Api = new ApiService();
    this.state = {
      name: "Loading...",
      owner: "",
      donationAmount: "",
      currentUserIsOwner: false,
      bannerUrl: "",
      id: "",
      startDate: "",
      markdown: "",
      totalCost: "",
      amountRaised: "",
      milestones: [{
        name: "",
        description: "",
        cost: 0
      }],
    }
  }

  getProjectDetails() {
    let id = this.props.match.params.id;
    this.Api.getProjectById(id)
      .then(res => {
        console.log(res);
        this.setState({
          name: res.name,
          owner: res.owner,
          id: res.id,
          currentUserIsOwner: res.current_user_is_owner,
          bannerUrl: res.banner_url,
          startDate: res.start_date,
          markdown: res.markdown,
          milestones: res.milestones,
          totalCost: res.total_cost,
          amountRaised: res.amount_raised
        })
      })
      .catch(err => { alert(err) })
  }

  componentWillMount() {
    if (!this.Auth.loggedIn()) {
      this.props.history.replace('/');
    }
    this.getProjectDetails();
  }

  handleDonationAmountChanged(e){
    this.setState({
      donationAmount: e.target.value
    })
  }

  handleDonation(){
    let id = this.props.match.params.id;
    this.Api.addDonation(id, this.state.donationAmount)
      .then(res => this.props.history.replace('/loading/'+id))
      .catch(err => alert(err))
  }

  render() {
    return (
      <div>
        <h1 align="center">{this.state.name}</h1>
        <Card className='large'
          header={<CardTitle image={this.state.bannerUrl}></CardTitle>}>
        </Card>
        <div align="center">
		<h4>Start Date: {this.state.startDate}</h4>
        <h5>Amount Required: Rs.{this.state.totalCost} </h5>
        <h5>Amount Collected: Rs.{this.state.amountRaised} </h5>
        <Modal
          trigger={<Button waves='light' class="center-align">Donate<Icon right>favorite_border</Icon></Button>}>
          <h4>Donate to {this.state.name} </h4>
          <Input placeholder="Enter the amount" onChange={this.handleDonationAmountChanged.bind(this)}/>
          <Button waves='red' onClick={this.handleDonation.bind(this)}>Yes<Icon right>check</Icon></Button>&emsp;
        </Modal>
		</div>
        <ReactMarkdown source={this.state.markdown} />
        <Tabs className='tab-demo z-depth-1'>
          {
            this.state.milestones.map((milestone, idx) => {
              return (
                <Tab title={milestone.name}>
                  <h4>{milestone.name}</h4>
                  <ReactMarkdown source={milestone.description} />
                  <h6> EST Cost: {milestone.cost}</h6>
                  <Modal
                    trigger={<Button>Phase Updation<Icon right></Icon></Button>}>
                    <p>Update The Phase</p>
                    <Input s={8} label="Status of the phase" validate><Icon>bookmark_border</Icon></Input>
                    <Input s={8} label="Description" validate><Icon>account_balance</Icon></Input>
                    <Button waves='red'>Ok<Icon right>check</Icon></Button>&emsp;
		              </Modal>
                </Tab>
              )
            })
          }
        </Tabs>
        <div align="center">
		<Modal
          trigger={<Button>Report<Icon right>delete_sweep</Icon></Button>}>
          <p>Do you want to Report this project?</p>
          <Button waves='red'>Yes<Icon right>check</Icon></Button>&emsp;
          <Button waves='red'>No<Icon right>clear</Icon></Button>&emsp;
        </Modal>
		</div>
      </div>
    )
  }
}

export default Project