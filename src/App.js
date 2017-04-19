import React, { Component } from 'react';
import './App.css';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import SearchBox from './components/SearchBox';
import SearchResult from './components/SearchResult';
import SortComponent from './components/SortComponent';
import {connect} from 'react-redux';
import {search, sortBy, goToPage, getDetails} from './actions';

const mapStateToProps = ({ query, results, sortOrder, page, isLoading, details }) => ({
  query,
  results,
  sortOrder,
  page,
  isLoading,
  details
});

const mapDispatchToProps = (dispatch) => {
  return {
    onSearch: (title, params) => {
      dispatch(search(title, params));
    },
    sortBy: (order) => {
      dispatch(sortBy(order));
    },
    goToPage: (number) => {
      dispatch(goToPage(number));
    },
    getDetails: (id) => {
      dispatch(getDetails(id));
    }
  }
}

class App extends Component {

  handleChange(ev){
    let query = ev.currentTarget.value;
    this.props.onSearch(query.trim());
  }

  handleSortChange(order){
    this.props.sortBy(order);
  }

  handlePrevClick(){
    this.props.goToPage(this.props.page - 1);
  }

  handleNextClick(){
    this.props.goToPage(this.props.page + 1);
  }

  handleGetDetails(id){
    this.props.getDetails(id);
  }

  render() {
    let {page, results} = this.props;
    let totalResults = results.totalResults || 0;
    let disablePrev = page === 1;
    let disableNext = (page * 10) > totalResults;

    return (
      <div className="App">
        <Grid>
          <Row>
            <form>
              <Col sm={6}>
                <SearchBox placeholder="Search..." onChange={this.handleChange.bind(this)} errorMessage={this.props.results.errorMessage} totalNumberOfResults={this.props.results.totalResults} /></Col>
              <Col sm={6}><SortComponent onChange={this.handleSortChange.bind(this)} value={this.props.sortOrder} /></Col>
            </form>
          </Row>
          <Row className={this.props.isLoading ? "loading": ""}>
            {this.props.results.results.map((r, i) => {
              return <Col sm={12} key={i}>
                <SearchResult result={r} details={this.props.details[r.imdbID]} onGetDetails={this.handleGetDetails.bind(this, r.imdbID)}/>
              </Col>
            })}
          </Row>
          <Row>
            <Col xs={5}><Button bsSize="large" block onClick={this.handlePrevClick.bind(this)} disabled={disablePrev}>Prev</Button></Col>
            <Col xs={2}>Page&nbsp;{this.props.page}</Col>
            <Col xs={5}><Button bsSize="large" block onClick={this.handleNextClick.bind(this)} disabled={disableNext}>Next</Button></Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
