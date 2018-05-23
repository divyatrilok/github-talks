import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { reposAction, updateOwner } from '../actions/reposAction';
import Hidden from '@material-ui/core/Hidden';
import RaisedButton from 'material-ui/RaisedButton';

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    reposAction: () => dispatch(reposAction()),
    updateOwner: (owner) => dispatch(updateOwner(owner))
})

export class Search extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.store;
        this.state = {
            "searchText": this.props.reposReducer.initialState.owner
        }
    }
    handleGetRepos = (event) => { 
        if (event.keyCode === 13 || event.target.tagName === 'SPAN') {
            this.props.updateOwner(this.state.searchText);
            this.props.reposAction();
        }
    }
    searchTextChanged = (event, newValue) =>{
        this.setState({
           "searchText": newValue 
        })
    }
    render() {
        return (
            <div>
                <TextField
                    hintText=""
                    floatingLabelText="Enter Github User Name or Org Name"
                    type="text"
                    value={this.state.searchText}
                    fullWidth={true}
                    onKeyDown={this.handleGetRepos}
                    onChange={this.searchTextChanged}
                />
                <Hidden mdUp>
                    <RaisedButton
                        primary={true}
                        label="Search Repos"
                        fullWidth={true}
                        disabled = {!this.state.searchText}
                        onClick = {this.handleGetRepos} />
                </Hidden>
            </div>
        )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);