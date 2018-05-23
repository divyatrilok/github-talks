const initialState = {
    itemsPerPage: 25,
    owner: "divyavontimitta"
}
const reposDetails = {
    show: false,
    details: {
    }
}

export default (state = { initialState, reposDetails }, action) => {
    const payload = action.payload;
    switch (action.type) {
        case 'GET_REPOS':
            console.log("get repositories")
            return {
                ...state,
                repos: payload
            }
        case 'SET_OWNER':
            console.log("set owner")
            return {
                ...state,
                owner: payload
            }
        case 'SET_PAGE':
            console.log("set page")
            return {
                ...state,
                page: payload
            }
        case 'SET_ROWS':
            console.log("set rows per page");
            return {
                ...state,
                itemsPerPage: payload
            }
        case 'GET_COMMITS':
            console.log("get commits of repository");
            return {
                ...state,
                reposDetails: {
                    ...state.reposDetails,
                    show: true,
                    details: {
                        ...state.reposDetails.details,
                        commits: [...state.reposDetails.details.commits || "", payload]
                    }
                }
            }
        case 'SHOW_COMMITS':
            console.log("toggle commits of repository");
            return {
                ...state,
                reposDetails: {
                    ...state.reposDetails,
                    show: payload
                }
            }
        case "CURRENT_REPO":
            console.log("current repo details");
            return {
                ...state,
                currentRepo: payload
            }
        default:
            return state
    }
}
