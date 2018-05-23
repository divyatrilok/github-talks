import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showCommits } from '../actions/reposAction';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    showCommits: (flag, repo) => dispatch(showCommits(flag, repo))
})

class Commits extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.store;
        this.state = {
            open: true,
            total_count: 0
        }
        this.onDialogClose = this.onDialogClose.bind(this);
    }

    onDialogClose = () => {
        // this.setState({ open: false });
        this.setState({ total_count: 0 }, function () {
            this.props.showCommits(false, false);
        });

    };

    styles = {
        wrapper: {
            fontSize: 12
        },
        author: {
            display: 'flex',
            alignItems: 'center'
        },
        whiteSpace: {
            width: 8
        },
        subHeader: {
            paddingLeft: 0
        }
    }
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
                title="Commit Details"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.onDialogClose}
                autoScrollBodyContent={true}
            >
                <div>
                    <Subheader style={this.styles.subHeader}>Showing the last {this.state.total_count} commits to the repo {reposReducer.owner}</Subheader>
                    {
                        typeof reposReducer.currentRepo !== "undefined" ?
                            reposReducer.currentRepo.map((row, index) => {
                                if (this.state.total_count !== Object.keys(reposReducer.currentRepo).length) {
                                    this.setState({ total_count: Object.keys(reposReducer.currentRepo).length })
                                }
                                const _row = reposReducer.currentRepo[index]
                                const author_url = typeof _row.author === "undefined" || _row.author === null ? "" : _row.author.html_url
                                const author_img = typeof _row.committer === "undefined" || _row.committer === null ? "" : _row.committer.avatar_url
                                const author_name = typeof _row.commit.author.name === "undefined" || _row.commit === null ? "" : _row.commit.author.name
                                const commit_message = typeof _row.commit.message === "undefined" || _row.commit === null ? "" : _row.commit.message
                                const comment_count = typeof _row.commit.comment_count === "undefined" || _row.commit === null ? 0 : _row.commit.comment_count
                                const commit_url = typeof _row.html_url === "undefined" || _row.html_url === null ? "" : _row.html_url
                                const commit_number = typeof _row.sha === "undefined" || _row.sha === null ? "Commit URL" : _row.sha
                                return (
                                    <div style={this.styles.wrapper}>
                                        <p>
                                            <a href={author_url} target="_blank" style={this.styles.author}>
                                                <Avatar src={author_img} size={30} /><span style={this.styles.whiteSpace}></span>{author_name}</a>
                                        </p>
                                        <p><strong>Commit Message:</strong> {commit_message}</p>
                                        <p><strong>Comment Count:</strong> {comment_count}</p>
                                        <p><strong>Commit URL:</strong> <a href={commit_url} target="_blank">{commit_number}</a></p>

                                        <Divider />
                                    </div>
                                )
                            }) : <CircularProgress />

                    }
                </div>
            </Dialog>
        )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Commits);