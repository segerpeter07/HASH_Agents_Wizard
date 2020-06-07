export const updateAgent = (req) => {
    return {
        type: "UPDATEAGENT",
        payload: req,
    }
}

export const deleteAgent = (agent) => {
    return {
        type: "DELETEAGENT",
        payload: agent
    }
}