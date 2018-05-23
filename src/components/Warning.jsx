import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

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
                    <p>Github has a API Rate limit and we are exceeding it. Please refresh the page of try again later!</p>
                </div>
            </Dialog>
        )

    }
}

export default Warning;