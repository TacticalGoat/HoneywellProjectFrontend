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

  handleReport(){
    let id = this.props.match.params.id;
    this.Api.reportProject(id)
      .then(res => {alert("The project has been reported.")})
      .catch(err => alert(err))
  }

  render() {
    return (
      <div>
        <h1 align="center">{this.state.name}</h1>
        <Card className='large'
          header={<CardTitle image={this.state.bannerUrl}></CardTitle>}>
        </Card>
        <h3 align="center">Start Date: {this.state.startDate}</h3>
        <h4>Amount Required: Rs.{this.state.totalCost} </h4>
        <h4>Amount Collected: Rs.{this.state.amountRaised} </h4>
        <Modal
          trigger={<Button waves='light' class="center-align">Donate<Icon right>favorite_border</Icon></Button>}>
          <h4>Donate to {this.state.name} </h4>
          <Input placeholder="Enter the amount" onChange={this.handleDonationAmountChanged.bind(this)}/>
          <Button waves='red' onClick={this.handleDonation.bind(this)}>Yes<Icon right>check</Icon></Button>&emsp;
        </Modal>
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
        <Modal
          trigger={<Button>Report<Icon right>delete_sweep</Icon></Button>}>
          <p>Do you want to Report this project?</p>
          <Button waves='red' onClick={this.handleReport.bind(this)}>Yes<Icon right>check</Icon></Button>&emsp;
          <Button waves='red'>No<Icon right>clear</Icon></Button>&emsp;
        </Modal>
        <h3 align="left">Leave A Comment</h3>
        <div class="row">
          <form class="col s7">
            <div class="row">
              <div class="input-field col s12">
                <textarea id="textarea1" class="materialize-textarea"></textarea>
                <label for="textarea1"></label>
              </div>
            </div>
          </form>
          <form class="col s5" align="left"><br />
            <Button waves='light'>Comment<Icon right>keyboard_arrow_right</Icon></Button>&emsp;
	 </form>
        </div>
        <div align="left">
          <Row>
            <Col s={12}>
              <Chip>
                <img src='data:image/jpeg;base64,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' />
                {}
              </Chip>
              <label> {} </label>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default Project