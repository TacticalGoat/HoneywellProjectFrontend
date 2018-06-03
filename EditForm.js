import React from 'react'
import Markdown from 'react-markdown';	
import ReactDOM from 'react-dom'
import {Card, CardTitle, Button, Icon, Row, Col, Chip, Modal, Input} from 'react-materialize'

class EditForm extends React.Component{
	constructor(){
	super();
	this.state={describe:" "}
	this.handleChange=this.handleChange.bind(this);
	};
	handleChange(e){
	this.setState({describe: e.target.value})
	}
	render(){
		return(
		 <div padding="10px 10px 10px 10px">
    <h1 align="center">Edit Project Page</h1>
		<Card className='large'
  header={<CardTitle image='https://cdn.pixabay.com/photo/2015/12/15/09/04/banner-1093907_960_720.jpg'></CardTitle>}	
  action={<a ref='#'><Button waves='light'>Donate</Button></a>}>
  I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.
   am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.
    am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.
</Card>
<div id="container">
	<form>
		<Row>
			 <Input s={8} label="Title Of The Project" validate><Icon>comment</Icon></Input>
		</Row>
		<Row>
			 <Input s={8} label="Banner URL" validate><Icon>crop_original</Icon></Input>
		</Row>
		<Row>
		<label for="describe">Description of the Project in Markdown</label>
			<textarea s={8} id="describe" name="describe" class="materialize-textarea" validate value={this.state.describe} onChange={this.handleChange.bind(this)}></textarea>
			          

		</Row>
		<Row>
		<Markdown 
                    escapeHtml={true}
                    source={this.state.describe} 
                /></Row>
		 <Button waves='light'>Save Changes<Icon right>check</Icon></Button>&emsp;<br/><br/>	
		<Modal
  trigger={<Button>End This Project?<Icon right>delete_sweep</Icon></Button>}>
  <p>Do you want to End this project?</p>
  <Button waves='red'>Yes<Icon right>check</Icon></Button>&emsp;
  <Button waves='red'>No<Icon right>clear</Icon></Button>&emsp;
</Modal><br/>
	</form>
</div>

</div>
);
	}
}  
 

export default EditForm