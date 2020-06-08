const initialState = {
    data: [
        {
            "agent_name":"test1",
            "position":[123,456],
            "related_to":"test2",
            "relationship":"test1 = 3.14 * test2"
        },
        {
            "agent_name":"test2",
            "position":[987,4],
            "related_to":null,
            "relationship":null,
            "custom_field_1":"placeholder_content",
        }
    ],
}

export default function agentsReducer (state=initialState, action) {
    switch (action.type) {

        case 'CREATEAGENT':
            return {
                ...state,
                data: state.data.concat(action.payload)
            }

        case 'CREATEMULTIPLEAGENTS':
            return {
                ...state,
                data: state.data.concat(action.payload)
            }
        
        case 'UPDATEAGENT':
            return {
                ...state,
                test: action.payload
            }

        case 'DELETEAGENT':
            const agent = action.payload
            var index = state.data.indexOf(agent);
            let updatedData = state.data;
            if (index !== -1) {
                updatedData.splice(index, 1);
            }
            return {
                ...state,
                data: updatedData
            }
            
        default:
            return state;
    }
}