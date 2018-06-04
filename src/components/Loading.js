import React, {Component} from 'react';
import ReactLoading from 'react-loading';

class Loading extends Component {

    componentDidMount(){
        this.redirectToProject();
    }

    redirectToProject(){
        setTimeout(() => {
            this.props.history.replace('/project/' + this.props.match.params.id);
        }, 5000);
    }

    render(){
        return (
            <div align="center">
                <ReactLoading type="bars" color="#CCCCCC" height={300} width={375} />
                <h1>Processing Payment</h1>
            </div>
        )
    }
}

export default Loading