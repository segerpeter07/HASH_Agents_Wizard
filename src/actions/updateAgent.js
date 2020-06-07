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

export const deleteAgent = (agent) => {
    return {
        type: "DELETEAGENT",
        payload: agent
    }
}