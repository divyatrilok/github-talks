import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    reposAction,
    updateActivePage,
    updateRowsPerPage,
    updateOwner,
    showCommits,
    getCommits
} from '../actions/reposAction';
import {
    Table,
    TableHeader,
    TableHeaderColumn,
    TableBody,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import ReactPaginate from 'react-paginate';
import Commits from './Commits';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Warning from './Warning'

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    reposAction: () => dispatch(reposAction()),
    updateActivePage: (pageNumber) => dispatch(updateActivePage(pageNumber)),
    updateRowsPerPage: (count) => dispatch(updateRowsPerPage(count)),
    updateOwner: (owner) => dispatch(updateOwner(owner)),
    showCommits: (flag, repo) => dispatch(showCommits(flag, repo)),
    getCommits: (repo) => dispatch(getCommits(repo))
})

const styles = {
    wrapper: {
        marginTop: '50px'
    },
    innerWrapper: {
        'display': 'flex',
        'flexDirection': 'column',
        'minHeight': 600
    },
    cell: {
        cursor: 'pointer'
    }
}

class Results extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.state;
        var itemsPerPage = this.props.reposReducer.initialState.itemsPerPage;
        if (typeof this.props.reposReducer.itemsPerPage !== "undefined") {
            itemsPerPage = this.props.reposReducer.itemsPerPage
        }
        this.state = {
            itemsPerPage: itemsPerPage
        }
        this.onRowSelection = this.onRowSelection.bind(this);
        this.props.updateActivePage(1);
        this.props.updateOwner(this.props.reposReducer.initialState.owner);
        this.props.reposAction();
    }
    handlePageClick = (pageNumber) => {
        console.log(`active page is ${pageNumber.selected}`);
        this.props.updateActivePage(pageNumber.selected);
        this.props.reposAction();
    };

    handleMenuChange = (event, index, value) => {
        this.setState({
            itemsPerPage: value
        }, function () {
            this.props.updateRowsPerPage(value);
            this.props.updateActivePage(1);
            this.props.reposAction();
        });
    };
    handleCellClick(row, column, event) {
        var repo = this.props.reposReducer.repos.items[row]
        console.log(repo)
    }
    onRowSelection = (row) => {
        var repo = this.props.reposReducer.repos.items[row]
        console.log(repo);
        var url = `https://api.github.com/repos/${repo.full_name}/commits`;
        var p = this.props.reposReducer.reposDetails.details.commits || [];
        var _repo = false;
        for (var key in p) {
            if (p.hasOwnProperty(key)) {
                if (p[key].url.indexOf(url) !== -1) {
                    _repo = p[key];
                }
            }
        }
        if (!_repo) {
            this.props.getCommits(repo);
        }
        this.props.showCommits(true, _repo);
    }
    render() {
        return (
            <div style={styles.wrapper}>
                {
                    typeof this.props.reposReducer.repos !== "undefined"
                    && this.props.reposReducer.status === 'ERROR' ?
                    <Warning/> : 
                    typeof this.props.reposReducer.repos !== "undefined"
                        && this.props.reposReducer.repos.total_count !== 0 ?
                        (<div style={styles.innerWrapper}>
                            <h2>Repositories for {this.props.reposReducer.owner} listed below</h2>
                            <Table height="600" onRowSelection={this.onRowSelection}>
                                <TableHeader adjustForCheckbox={false} displaySelectAll={false} displayRowCheckbox={false}>
                                    <TableRow>
                                        <TableHeaderColumn colSpan="3" tooltip="" style={{ textAlign: 'center' }}>
                                            <ReactPaginate previousLabel={"previous"}
                                                nextLabel={"next"}
                                                breakLabel={<a>...</a>}
                                                breakClassName={"break-me"}
                                                pageCount={Math.ceil(this.props.reposReducer.repos.total_count / this.state.itemsPerPage)}
                                                marginPagesDisplayed={2}
                                                pageRangeDisplayed={5}
                                                onPageChange={this.handlePageClick}
                                                containerClassName={"pagination"}
                                                subContainerClassName={"pages pagination"}
                                                activeClassName={"active"} />
                                        </TableHeaderColumn>
                                        <TableHeaderColumn colSpan="1" tooltip="" style={{ textAlign: 'right' }}>
                                            <DropDownMenu
                                                value={typeof this.props.reposReducer.itemsPerPage === "undefined" ?
                                                    this.props.reposReducer.initialState.itemsPerPage :
                                                    this.props.reposReducer.itemsPerPage}
                                                onChange={this.handleMenuChange}>
                                                <MenuItem value={10} primaryText="10 per page" />
                                                <MenuItem value={15} primaryText="15 per page" />
                                                <MenuItem value={20} primaryText="20 per page" />
                                                <MenuItem value={25} primaryText="25 per page" />
                                                <MenuItem value={50} primaryText="50 per page" />
                                            </DropDownMenu>
                                        </TableHeaderColumn>
                                    </TableRow>
                                    <TableRow>
                                        <TableHeaderColumn>
                                            Name
                                        </TableHeaderColumn>
                                        <TableHeaderColumn>
                                            Stargazers
                                        </TableHeaderColumn>
                                        <TableHeaderColumn>
                                            Language
                                        </TableHeaderColumn>
                                        <TableHeaderColumn>
                                            Forks
                                        </TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody
                                    stripedRows={true}
                                    displayRowCheckbox={false}>
                                    {
                                        this.props.reposReducer.repos.length !== 0 ?
                                            this.props.reposReducer.repos.items.map((row, index) => {
                                                return (<TableRow hoverable={true} key={row.id}>
                                                    <TableRowColumn style={styles.cell}>{row.name}</TableRowColumn>
                                                    <TableRowColumn style={styles.cell}>{row.stargazers_count}</TableRowColumn>
                                                    <TableRowColumn style={styles.cell}>{row.language}</TableRowColumn>
                                                    <TableRowColumn style={styles.cell}>{row.forks_count}</TableRowColumn>
                                                </TableRow>)
                                            }) : <TableRow><TableRowColumn>No Repos Found</TableRowColumn></TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </div>)
                        : <p>loading</p>
                }
                {
                    this.props.reposReducer.reposDetails.show === true ?
                        <Commits /> :
                        null
                }
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Results);
