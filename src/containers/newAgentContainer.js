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
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "shards-react";

import {updateAgent, createAgent} from '../actions/updateAgent';
import NewSingleAgent from '../components/newSingleAgent';
import NewMultipleAgents from '../components/newMultipleAgents';

class NewAgentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.duplicateAgentDropdown = React.createRef();
        this.createNewAgentCallback = this.createNewAgentCallback.bind(this);
        this.createMultipleAgentsCallback = this.createMultipleAgentsCallback.bind(this);
        this.setCurrAgent = this.setCurrAgent.bind(this);
        this.state = {
            dropdownOpen: false,
            currentAgent: {
                agent_name: null,
                position: [null, null],
                related_to: null,
                relationship: null,
            },
            agents: [],
            multiAgent: true,       // change!
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

    createMultipleAgentsCallback(agent) {
        console.log("More logic here");
    }

    setCurrAgent(agent) {
        console.log("Reached here", agent);
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

    renderDuplicateDropdown() {
        const {agents} = this.state;
        
        let dropdownOptions;
        if (agents.length < 1) {
            dropdownOptions = (
                <DropdownItem disabled>No agents to duplicate from</DropdownItem>
            )
        } else {
            dropdownOptions = agents.map(agent => {
                return (
                    <DropdownItem onClick={() => this.setCurrAgent(agent)}>{agent.agent_name}</DropdownItem>
                )
            })
        }

        return (
            <Dropdown
                ref = {this.duplicateAgentDropdown}
                open={this.state.dropdownOpen}
                toggle={() => this.dropdownToggle()}
            >
                <DropdownToggle caret>
                    Copy existing agent
                </DropdownToggle>
                <DropdownMenu>
                    {dropdownOptions}
                </DropdownMenu>
            </Dropdown>
        )
    }

    renderAgentForm() {
        const {currentAgent, multiAgent} = this.state;
        if(multiAgent) {
            return (
                <NewMultipleAgents createMultipleAgentsCallback={this.createMultipleAgentsCallback} />
            )
        } else {
            if (currentAgent != null) {
                return (
                    <NewSingleAgent agent={currentAgent} createNewAgentCallback={this.createNewAgentCallback} />
                )
            }
            return (
                <NewSingleAgent agent={null} createNewAgentCallback={this.createNewAgentCallback} />
            )
        }
    }

    render() {        
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
                            {this.renderDuplicateDropdown()}
                            {this.state.multiAgent ?
                                <Button outline style={{marginLeft: "15px"}} onClick={() => this.setState({multiAgent: !this.state.multiAgent})}>Generate single agent</Button>
                                :
                                <Button style={{marginLeft: "15px"}} onClick={() => this.setState({multiAgent: !this.state.multiAgent})}>Generate multiple agents</Button>
                            }
                        </ContentRow>
                        {this.renderAgentForm()}
                    </CardBody>
                </Card>
            </WizardContainer>
        )
    }
}

const mapDispatchToProps = {
    updateAgent,
    createAgent
}

const mapStateToProps = (state) => {
    const agentsReducer = state;
    return {agentsReducer}
}


export default connect(mapStateToProps, mapDispatchToProps)(NewAgentContainer);