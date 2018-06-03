import React from 'react'
import Markdown from 'react-markdown';	
import ReactDOM from 'react-dom'
import {Card, CardTitle, Button, Icon, Row, Col, Chip, Modal, Input} from 'react-materialize'

class CreateProject extends React.Component{
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
    <h1 align="center">Create Project Page</h1>
		
<div id="container">
	<form>
		<Row>
			 <Input s={8} label="Title Of The Project" validate><Icon>comment</Icon></Input>
		</Row>
		<Row>
			 <Input s={8} label="Banner URL" validate><Icon>crop_original</Icon></Input>
		</Row>
		<Row>
			 <Input s={8} label="Amount Required" validate><Icon>account_balance</Icon></Input>
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
		 <Button waves='light'>Create Project<Icon right>check</Icon></Button>&emsp;<br/><br/>	
		<br/>
	</form>
</div>

</div>
);
	}
}  
 

export default CreateProject