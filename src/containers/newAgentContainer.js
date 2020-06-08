import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { WizardContainer, ContentRow } from './newAgentContainer.styles';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardSubtitle,
} from "shards-react";

import {updateAgent, createAgent, createMultipleAgents} from '../actions/updateAgent';
import NewSingleAgent from '../components/newSingleAgent';
import NewMultipleAgents from '../components/newMultipleAgents';
import DuplicateAgentDropdown from '../components/duplicateAgentDropdown';

class NewAgentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.createNewAgentCallback = this.createNewAgentCallback.bind(this);
        this.createMultipleAgentsCallback = this.createMultipleAgentsCallback.bind(this);
        this.setCurrAgent = this.setCurrAgent.bind(this);
        this.dropdownToggle = this.dropdownToggle.bind(this);
        this.state = {
            currentAgent: {
                agent_name: null,
                position: [null, null],
                related_to: null,
                relationship: null,
            },
            dropdownOpen: false,
            agents: [],
            multiAgent: false,
        }
    }

    componentDidMount() {
        const reduxState = this.props.agentsReducer;
        this.setState({
            agents: reduxState.data,
        })
    }

    dropdownToggle() {
        this.setState({
            ...this.state,
            dropdownOpen: !this.state.dropdownOpen
        })
    }

    createNewAgentCallback(agent) {
        this.props.createAgent(agent);
    }

    createMultipleAgentsCallback(numAgents, params) {
        this.props.createMultipleAgents(numAgents, params);
    }

    setCurrAgent(agent) {
        this.setState({
            currentAgent: {
                agent_name: agent.agent_name,
                position: agent.position,
                related_to: agent.related_to,
                relationship: agent.relationship,
                ...agent
            }
        })
    }

    renderAgentForm(currentAgent = this.state.currentAgent, multiAgent = this.state.multiAgent) {
        if(multiAgent) {
            return (
                <NewMultipleAgents createMultipleAgentsCallback={this.createMultipleAgentsCallback} />
            )
        } else {
            return (
                <NewSingleAgent agent={currentAgent} createNewAgentCallback={this.createNewAgentCallback} />
            )
        }
    }

    render() {     
        const {currentAgent, multiAgent, agents} = this.state;
        return(
            <WizardContainer>
                <Card>
                    <CardHeader style={{justifyContent: 'space-between'}}>
                        <Link to="/"><Button>← Home</Button></Link>
                    </CardHeader>
                    <CardBody>
                        <CardTitle>New Agent Wizard</CardTitle>
                        <CardSubtitle>Begin the process of creating new agents for your model below.</CardSubtitle>
                        <ContentRow>
                            <DuplicateAgentDropdown
                                agents={agents}
                                setAgentCallback={this.setCurrAgent}
                                dropdownToggleCallback={this.dropdownToggle}
                            />
                            {this.state.multiAgent ?
                                <Button outline style={{marginLeft: "15px"}} onClick={() => this.setState({multiAgent: !this.state.multiAgent})}>Generate single agent</Button>
                                :
                                <Button style={{marginLeft: "15px"}} onClick={() => this.setState({multiAgent: !this.state.multiAgent})}>Generate multiple agents</Button>
                            }
                        </ContentRow>
                        {this.renderAgentForm(currentAgent, multiAgent)}
                    </CardBody>
                </Card>
            </WizardContainer>
        )
    }
}

const mapDispatchToProps = {
    updateAgent,
    createAgent,
    createMultipleAgents
}

const mapStateToProps = (state) => {
    const agentsReducer = state;
    return {agentsReducer}
}


export default connect(mapStateToProps, mapDispatchToProps)(NewAgentContainer);