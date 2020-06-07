import React from 'react';
import { connect } from 'react-redux';
import { Button} from 'shards-react';

import {updateAgent, deleteAgent} from '../actions/updateAgent';
import { AppContainer, AgentCardsContainer, AgentCardItem } from './agentsOverviewContainer.styles';
import AgentCard from '../components/agentCard';

class AgentsOverviewContainer extends React.Component {
    constructor(props) {
        super(props);
        this.deleteAgentHandler = this.deleteAgentHandler.bind(this);
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        const reduxState = this.props.agentsReducer;
        this.setState({
            data: reduxState.data,
            reduxTest: reduxState.test
        })
    }

    handleSubmit(e) {
        this.props.updateAgent(this.state.test);
    }

    deleteAgentHandler(agent) {
        this.props.deleteAgent(agent);
    }

    renderAgentCards() {
        const agentData = this.state.data;
        if (agentData) {
            if (agentData.length > 0) {
                return agentData.map((agent, k) => (
                    <AgentCardItem key={k}>
                        <AgentCard 
                            data={agent}
                            deleteAgentCallback = {this.deleteAgentHandler}
                        />
                    </AgentCardItem>
                ))
            } else {
                return (<p>No agents made yet.</p>)
            }
        }
        return <p>Loading...</p>
    }

    render() {
        return (
            <AppContainer>
                <h2>Agents overview</h2>
                <Button>New agent wizard</Button>
                    <AgentCardsContainer>
                        {this.renderAgentCards()}
                    </AgentCardsContainer>
            </AppContainer>
        );
    };
}

const mapDispatchToProps = {
    updateAgent,
    deleteAgent
}

const mapStateToProps = (state) => {
    const agentsReducer = state;
    return {agentsReducer}
}

export default connect(mapStateToProps, mapDispatchToProps)(AgentsOverviewContainer);
