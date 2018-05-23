import axios from 'axios';

export const reposAction = () => (dispatch, getState) => {
    var state = getState().reposReducer;
    var itemsPerPage = state.initialState.itemsPerPage;
    if (typeof state.itemsPerPage !== "undefined") {
        itemsPerPage = state.itemsPerPage
    }
    dispatch({
        type: 'GET_REPOS',
        payload: []
    })
    // var repos = `https://api.github.com/users/${state.owner}/repos?per_page=${itemsPerPage}&type=all&sort=updated&order=asc`;
    var url = `https://api.github.com/search/repositories?q=user:${state.owner}&per_page=${itemsPerPage}&type=all&sort=stargazers_count&order=desc&page=${state.page}`
    axios.get(url)
        .then((res) => {
            dispatch({
                type: 'GET_REPOS',
                payload: res.data
            })
        })
        .catch((error) => {
            dispatch({
                type: 'GET_REPOS',
                payload: []
            })
        })
}

export const updateOwner = (owner) => dispatch => {
    dispatch({
        type: 'SET_OWNER',
        payload: owner
    })
}

export const updateActivePage = (pageNumber) => dispatch => {
    dispatch({
        type: 'SET_PAGE',
        payload: pageNumber
    })
}

export const updateRowsPerPage = (count) => dispatch => {
    dispatch({
        type: 'SET_ROWS',
        payload: count
    })
}

export const getCommits = (repo) => dispatch => {
    var url = `https://api.github.com/repos/${repo.full_name}/commits?per_page=9999`
    axios.get(url)
        .then((res) => {
            dispatch({
                type: 'GET_COMMITS',
                payload: {
                    url: res.config.url,
                    data: res.data
                }
            })
            dispatch({
                type: 'CURRENT_REPO',
                payload: res.data
            })
        })
        .catch((error) => {
            dispatch({
                type: 'GET_COMMITS',
                payload: []
            })
        })
}

export const showCommits = (flag, repo) => dispatch => {
    dispatch({
        type: 'SHOW_COMMITS',
        payload: flag
    })
    dispatch({
        type: 'CURRENT_REPO',
        payload: repo !== false ? repo.data : undefined
    })
}
