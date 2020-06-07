import React from 'react';

import {
    Button,
    FormInput,
    FormGroup,
  } from "shards-react";
import {Link} from 'react-router-dom';
import {ContentContainer, ContentRow} from './newSingleAgent.styles';

class NewSingleAgent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            agent: props.agent,
            displayNewProperty: false,
            newProperty: ""
        }
    }

    toggleNewPropertyButton() {
        this.setState({
            displayNewProperty: !this.state.displayNewProperty
        })
    }

    addNewProperty() {
        const {newProperty} = this.state;
        if (newProperty) {
            let updatedAgent = this.state.agent;
            updatedAgent[newProperty] = ""
            this.setState({
                displayNewProperty: false,
                agent: updatedAgent,
                newProperty: "",
            })
        } else {
            this.setState({
                displayNewProperty: false
            })
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

    renderNewPropertyFields() {
        const {displayNewProperty} = this.state;
        if(displayNewProperty) {
            return (
                <ContentRow>
                    <FormGroup>
                        <label htmlFor="#newProperty">New Property:</label>
                        <FormInput id="#newProperty" onChange={(e) => this.setState({newProperty: e.target.value})}/>
                    </FormGroup>
                    <Button outline size="sm" style={{marginTop:"15px", marginBottom:"15px", marginLeft:"15px"}} onClick={() => this.addNewProperty()}>+ Property value</Button>
                </ContentRow>
            )
        } else {
            return (
                <Button outline block style={{marginTop:"15px", marginBottom:"15px"}} onClick={() => this.toggleNewPropertyButton()}>+ Add property</Button> 
            )
        }
    }

    renderCustomProperties() {
        const {agent} = this.state
        let defaultProps = ["agent_name", "position", "related_to", "relationship"];
        for (let [key, value] of Object.entries(agent)) {
            if (!defaultProps.includes(key)) {
                return (
                    <ContentRow>
                        {key}:
                        <FormInput 
                            style={{maxWidth: '200px', marginLeft:"15px"}}
                            size="sm"
                            defaultValue={value ? value : ""}
                            onChange={(e) => this.changePropertyValue(key, e.target.value)}
                        />
                    </ContentRow>
                )
            }
        }
    }

    render() {
        const {agent_name, related_to, position, relationship} = this.state.agent;
        const {createNewAgentCallback} = this.props;

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
                {this.renderCustomProperties()}
                {this.renderNewPropertyFields()}
                <Link to="/"><Button style={{float: "right"}} onClick={() => createNewAgentCallback(this.state.agent)}>Create agent</Button></Link>
            </ContentContainer>
        )
    }
}

export default NewSingleAgent;