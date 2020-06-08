import React from 'react';

import {AgentCardItem} from '../containers/agentsOverviewContainer.styles';
import AgentCard from './agentCard';

class AgentOverviewCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            agents: this.props.agents
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.agents) {
            if(!this.state.agents && this.props.agents) {
                this.setState({
                    agents: this.props.agents
                })
            }
        }
    }

    render() {
        const agents = this.props.agents;
        if (agents) {
            if (agents.length > 0) {
                return agents.map((agent, k) => (
                    <AgentCardItem key={k} id={k}>
                        <AgentCard 
                            data={agent}
                            deleteAgentCallback = {() => this.props.deleteAgentCallback(agent)}
                        />
                    </AgentCardItem>
                ))
            } else {
                return (<p>No agents made yet.</p>)
            }
        }
        return <p>Loading...</p>
    }
    
}

export default AgentOverviewCards