import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';

// const mapStateToProps = state => ({
//     ...state
// })

// const mapDispatchToProps = dispatch => ({
//     showCommits: (flag, repo) => dispatch(showCommits(flag, repo))
// })

class Warning extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true
        }
    }

    onDialogClose = () => {
        this.setState({ open: false });
        // window.location.reload(true);

    };

    render() {
        const actions = [
            <RaisedButton
                label="OK"
                primary={true}
                onClick={this.onDialogClose}
            />,
        ];
        const reposReducer = this.props.reposReducer;

        return (
            <Dialog
                title="Hey please slow down!"
                actions={actions}
                modal={true}
                open={this.state.open}
                onRequestClose={this.onDialogClose}
                autoScrollBodyContent={true}
            >
                <div>
                    <p>Let's give Github a small breather and try again in a bit. Github is over loaded! </p>
                </div>
            </Dialog>
        )

    }
}

export default Warning;