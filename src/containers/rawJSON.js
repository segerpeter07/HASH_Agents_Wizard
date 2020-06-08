import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button} from 'shards-react';

class RawJSON extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            agents: this.props.agentsReducer.data
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.agentsReducer.data !== prevProps.agentsReducer.data) {
            this.setState({
                agents: this.props.agentsReducer
            })
        }
    }

    render() {
        let {agents} = this.state;
        if (agents) {
            return (
                <div>
                    <Link to="/"><Button>Back</Button></Link>
                    <br></br>
                    {JSON.stringify(agents)}
                </div>
            )
        } else {
            return (
                <div>
                    <Link to="/"><Button>Back</Button></Link>
                    <br></br>
                    Loading...
                </div>
            )
        }
    }
}


const mapDispatchToProps = {}

const mapStateToProps = (state) => {
    const agentsReducer = state;
    return {agentsReducer}
}

export default connect(mapStateToProps, mapDispatchToProps)(RawJSON);