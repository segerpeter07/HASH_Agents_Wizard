import React from 'react';
import {
    Card,
    CardTitle,
    CardBody,
    Button,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    FormInput
  } from "shards-react";
import { StyledCardHeader, ContentRow } from './agentCard.styles';


class AgentCard extends React.Component {
    constructor(props) {
        super(props);
        this.actionButtonWrapper = React.createRef();
        this.state = {
            agentData: props.data,
            dropdownToggle: false,
            propertiesChanged: false,
        }
    }

    buttonToggle() {
        this.setState({
            ...this.state,
            dropdownToggle: !this.state.dropdownToggle
        })
    }

    changePropertyValue(property, value) {
        console.log(property, value)
        let updatedAgentData = this.state.agentData;
        updatedAgentData[property] = value;

        console.log('updated: ', updatedAgentData)
        this.setState({
            ...this.state,
            agentData: updatedAgentData,
            propertiesChanged: true
        })
    }

    renderActionButton() {
        const {deleteAgentCallback} = this.props;
        return (
            <Dropdown 
                ref = {this.actionButtonWrapper}
                open={this.state.dropdownToggle}
                toggle={() => this.buttonToggle()}
                size="sm"
            >
                <DropdownToggle 
                    caret
                    outline
                    theme="secondary"
                >
                    Actions
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={() => deleteAgentCallback(this.state.agentData)}>Delete agent</DropdownItem>
            </DropdownMenu>
            </Dropdown>
        )
    }

    renderCustomAgentProps() {
        let defaultProps = ["agent_name", "position", "related_to", "relationship"];
        for (let [key, value] of Object.entries(this.state.agentData)) {
            if (!defaultProps.includes(key)) {
                return (
                    <ContentRow>
                        {key}:
                        <FormInput 
                            style={{maxWidth: '200px'}}
                            size="sm"
                            defaultValue={value ? value : "None"}
                            onChange={(e) => this.changePropertyValue(key, e.target.value)}
                        />
                    </ContentRow>
                )
            }
        }
    }

    render() {
        const {agent_name, position, related_to, relationship} = this.state.agentData;
        return(
            <Card>
                <CardBody>
                    <StyledCardHeader>
                        <CardTitle>{agent_name}</CardTitle>
                        {this.renderActionButton()}
                    </StyledCardHeader>
                    <ContentRow>
                        Position (x,y):
                        <FormInput
                            style={{maxWidth: '100px'}}
                            size="sm"
                            defaultValue ={position[0]}
                        />
                        <FormInput
                            style={{maxWidth: '100px'}}
                            size="sm"
                            defaultValue ={position[1]}
                        />
                    </ContentRow>
                    <ContentRow>
                        Related to:
                        <FormInput
                            style={{maxWidth: '200px'}}
                            size="sm"
                            defaultValue={related_to ? related_to : "None"}
                            onChange={(e) => this.changePropertyValue("related_to", e.target.value)}
                        />
                    </ContentRow>
                    <ContentRow>
                        Relationship:
                        <FormInput
                            style={{maxWidth: '200px'}}
                            size="sm"
                            defaultValue={relationship ? relationship : "None"}
                            onChange={(e) => this.changePropertyValue("relationship", e.target.value)}
                        />
                    </ContentRow>
                    {this.renderCustomAgentProps()}
                    {this.state.propertiesChanged ? 
                        <Button>Save changes</Button>
                        :
                        null
                    }
                    
                </CardBody>
            </Card>
        )
    }

}

export default AgentCard;