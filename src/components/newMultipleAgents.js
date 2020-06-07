import React from 'react';

import {
    Button,
    FormInput,
    FormGroup,
  } from "shards-react";
import {Link} from 'react-router-dom';
import {ContentContainer, ContentRow} from './newMultipleAgents.styles';

class NewMultipleAgents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            agent: {
                agent_name: null,
                position: [null, null],
                related_to: null,
                relationship: null,
            }
        }
    }

    changePropertyValue(property, value) {
        let updatedAgentData = this.state.agent;

        if (property === "pos-x") {
            updatedAgentData["position"] = [value, this.state.agent.position[1]]
        } else if (property === "pos-y") {
            updatedAgentData["position"] = [this.state.agent.position[0], value]
        } else {
            updatedAgentData[property] = value;
        }


        this.setState({
            ...this.state,
            agent: updatedAgentData,
        })
    }


    render() {
        const {agent_name, related_to, position, relationship} = this.state.agent;
        const {createMultipleAgentsCallback} = this.props;

        return(
            <ContentContainer>
                <ContentRow>
                    Agent name:
                    <FormInput
                        style={{maxWidth: '200px', marginLeft:"15px"}}
                        size="sm"
                        defaultValue={agent_name ? agent_name : ""}
                        onChange={(e) => this.changePropertyValue("agent_name", e.target.value)}
                    />
                </ContentRow>
                <ContentRow>
                    Position (x,y):
                    <FormInput
                        style={{maxWidth: '200px', marginRight:"15px", marginLeft:"15px"}}
                        size="sm"
                        defaultValue ={position ? this.state.agent.position[0]: ""}
                        onChange={(e) => this.changePropertyValue("pos-x", e.target.value)}
                    />
                    <FormInput
                        style={{maxWidth: '200px'}}
                        size="sm"
                        defaultValue ={position ? this.state.agent.position[1]: ""}
                        onChange={(e) => this.changePropertyValue("pos-y", e.target.value)}
                    />
                </ContentRow>
                <ContentRow>
                    Related to:
                    <FormInput
                        style={{maxWidth: '200px', marginLeft:"15px"}}
                        size="sm"
                        defaultValue={related_to ? related_to : ""}
                        onChange={(e) => this.changePropertyValue("related_to", e.target.value)}
                    />
                </ContentRow>
                <ContentRow>
                    Relationship:
                    <FormInput
                        style={{maxWidth: '200px', marginLeft:"15px"}}
                        size="sm"
                        defaultValue={(agent_name && related_to) || relationship ? `${agent_name} = (${related_to})` : ""}
                        onChange={(e) => this.changePropertyValue("relationship", e.target.value)}
                    />
                </ContentRow>
                <Link to="/"><Button style={{float: "right"}} onClick={() => createMultipleAgentsCallback(this.state.agent)}>Create agents</Button></Link>
            </ContentContainer>
        )
    }
}

export default NewMultipleAgents;