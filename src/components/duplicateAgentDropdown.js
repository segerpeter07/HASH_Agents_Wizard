import React, {useState} from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "shards-react";


const DuplicateAgentDropdown = (props) => {
    const {agents, setAgentCallback} = props;
    const [dropdown, setDropdown] = useState(false);
        
    let dropdownOptions;
    if (agents.length < 1) {
        dropdownOptions = (
            <DropdownItem disabled>No agents to duplicate from</DropdownItem>
        )
    } else {
        dropdownOptions = agents.map(agent => {
            return (
                <DropdownItem 
                    key={agent.agent_name}
                    onClick={() => setAgentCallback(agent)}
                    // onClick={() => this.setCurrAgent(agent)}
                >
                    {agent.agent_name}
                </DropdownItem>
            )
        })
    }

    return (
        <Dropdown
            open={dropdown}
            toggle={() => setDropdown(!dropdown)}
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

export default DuplicateAgentDropdown;