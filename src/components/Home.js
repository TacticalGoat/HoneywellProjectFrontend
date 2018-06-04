import React from 'react'
import { Button, Card, Row, Col,CardTitle,Breadcrumb,MenuItem,Icon,Chip,Slider,Slide } from 'react-materialize';
import {Link} from 'react-router-dom'
import AuthService from '../services/AuthService'
import ApiService from '../services/ApiService'
class Home extends React.Component{
  constructor() {
    super();
    this.Auth = new AuthService();
    this.Api = new ApiService();
    this.state = {
      projects: [{
        id: "",
        name: "",
        banner_url: ""
      }]
    }
  }
  componentWillMount(){
    this.details()
  }

  details() {
    this.Api.getIndexProjects()
      .then(res => {
        console.log(res);
        this.setState({
          "projects": res.projects
        })
      })
      .catch(err => { alert(err); })
  }
  render(){
    return(
  <div>
       <div align="center" padding="10px 10px 10px 10px">
    <Slider>
  <Slide
    src="http://d3gtswiihfkcji.cloudfront.net/uploads/2015/08/05104938/Crowdfunding-concept.jpg"
    title="Micro funding">
    Here's our platform for community.
  </Slide>
  <Slide
    src="https://cdn2.iconfinder.com/data/icons/bubble-seo-internet-marketing-5/360/Creative_Services-512.png"
    title="Have an Idea?">
     No problem we are here.
  </Slide>
  <Slide
    src="data:image/jpeg;base64,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"
    title="Register"
    placement="right">
    And get Funding for your Idea.
  </Slide>
</Slider>
<br/>
<hr width="80%" size="10"/>
  </div>      
  <h1 align="center">Projects</h1>
  <hr width="50%" size="10"/>
  <br />
  <Row>
    <Col s={2} />
     <Col m={7}s={12} >
	{
            this.state.projects.map((project, idx) => {
              console.log(project.id)
              console.log(project.name)
              console.log("Banner Url:" + project.banner_url)
              var count=0
              return(
                <div>
                  <Row>
                      
                    <Card className="medium" header={
                      <CardTitle  image={project.banner_url}>{project.name}</CardTitle>}
                      actions={<Link to={'/project/' + project.id}> Explore</Link>}/>
                  </Row>
                </div>
              )
            })
          }
          </Col>
</Row>

  </div>
)
}
}
export default Home