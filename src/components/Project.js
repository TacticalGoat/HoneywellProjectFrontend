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
        cost: 0,
        updates:[{
          title: "loading...",
          content: "Please wait..."

        }]
      }],
      updateTitle: "",
      updateContent: "",
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

  handleDonationAmountChanged(e) {
    this.setState({
      donationAmount: e.target.value
    })
  }

  handleDonation() {
    let id = this.props.match.params.id;
    this.Api.addDonation(id, this.state.donationAmount)
      .then(res => this.props.history.replace('/loading/' + id))
      .catch(err => alert(err))
  }

  handleReport() {
    let id = this.props.match.params.id;
    this.Api.reportProject(id)
      .then(res => { alert("The project has been reported.") })
      .catch(err => alert(err))
  }

  handleUpdateTitleChange(e){
    this.setState({
      updateTitle: e.target.value
    })
  }

  handleUpdateContentChange(e){
    this.setState({
      updateContent: e.target.value
    })
  }

  handleUpdate(e){
    let milestone_id = e.currentTarget.dataset.mode;
    this.Api.addUpdate(milestone_id, this.state.updateTitle, this.state.updateContent)
      .then(res => alert("Updated successfully"))
      .catch(err => alert(err));
  }

  shouldComponentUpdate(nextProps, nextState){
    if(this.state.updateTitle != nextState.updateTitle){
      return false;
    }

    if(this.state.updateContent != nextState.updateContent){
      return false;
    }

    return true;
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
            <Input placeholder="Enter the amount" onChange={this.handleDonationAmountChanged.bind(this)} />
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
                  {
                    milestone.updates.map((update, idx) => {
                      return (
                        <Col m={6} s={12}>
                          <Card className='medium' title={update.title}>
                            <p>Posted:{update.posted_on}</p>
                            <p>
                              {update.content}
                            </p>
                          </Card>
                        </Col>
                      );
                    })
                  }
                  {
                    this.state.currentUserIsOwner ? (
                      <div align="center">
                        <Modal
                          trigger={<Button>Post Update<Icon right></Icon></Button>}>
                          <p>Update The Phase</p>
                          <Input s={8} placeholder="Title"onChange={this.handleUpdateTitleChange.bind(this)}><Icon>bookmark_border</Icon></Input>
                          <Input s={8} placeholder="Description" onChange={this.handleUpdateContentChange.bind(this)}><Icon>account_balance</Icon></Input>
                          <Button waves='red' onClick={this.handleUpdate.bind(this)} data-mode={milestone.id}>Ok<Icon right>check</Icon></Button>&emsp;
		                  </Modal>
                      </div>
                    ) : (
                        <div />
                      )
                  }
                </Tab>
              )
            })
          }
        </Tabs>
        <div align="center">
          <Modal
            trigger={<Button>Report<Icon right>delete_sweep</Icon></Button>}>
            <p>Do you want to Report this project?</p>
            <Button waves='red' onClick={this.handleReport.bind(this)}>Yes<Icon right>check</Icon></Button>&emsp;
          <Button waves='red'>No<Icon right>clear</Icon></Button>&emsp;
        </Modal>
        </div>
      </div>
    )
  }
}

export default Project