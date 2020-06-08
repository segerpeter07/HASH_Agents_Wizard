export const updateAgent = (req) => {
    return {
        type: "UPDATEAGENT",
        payload: req,
    }
}

export const createAgent = (agent) => {
    return {
        type: "CREATEAGENT",
        payload: agent,
    }
}

export const createMultipleAgents = (numAgents, params) => {
    const {base_name, xRange, yRange} = params;
    let agents = []
    for(let i = 0; i < numAgents; i++) {
        let xCoord = Math.floor(Math.random()*(xRange[1]-xRange[0]))+xRange[0];
        let yCoord = Math.floor(Math.random()*(yRange[1]-yRange[0]))+yRange[0];
        let fullName = `${base_name}_${i+1}`;
        let newAgent = {
            agent_name: fullName,
            position: [xCoord, yCoord],
            related_to: null,
            relationship: null,
        }
        agents = agents.concat(newAgent)
    }
    return {
        type: "CREATEMULTIPLEAGENTS",
        payload: agents
    }
}

export const deleteAgent = (agent) => {
    return {
        type: "DELETEAGENT",
        payload: agent
    }
}