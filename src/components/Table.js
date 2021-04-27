import { Component } from 'react';
import API from '../utils/API';
import Row from './Row';

export default class Table extends Component {
  state = {
    employees: [],
    location: '',
  };

  // CALL API + SET STATE when component mounts to DOM...
  componentDidMount() {
    API.getUsers().then(({ data }) => {
      this.setState({ employees: data.results });
    });
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  };

  // SORT BY NAME
  sortByName = () => {
    const sorted = this.state.employees.sort((a, b) =>
      a.name.last > b.name.last ? 1 : b.name.last > a.name.last ? -1 : 0
    );
    this.setState({ employees: sorted });
  };

  // FILTER BY STATE (LOCATION)
  filterLocation = (location) => (employee) => {
    const queryLocation = employee.location.state;
    return queryLocation.toLowerCase() === location.toLowerCase();
  };

  renderFiltered = (event) => {
    event.preventDefault();
    const input = event.target.children[0].children[1].value;
    const matches = this.state.employees.filter(this.filterLocation(input));
    this.setState({ employees: matches, location: '' });
  };

  clearFilter = (event) => {
    event.preventDefault();
    API.getUsers().then(({ data }) => {
      this.setState({ employees: data.results });
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="row">
              <button className="btn" onClick={this.sortByName}>
                Sort A-Z
              </button>
            </div>
            <div className="row">
              <form className="form form-inline" onSubmit={this.renderFiltered}>
                <div className="form-group">
                  <label>Filter by State</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="California"
                    aria-label="location"
                    aria-describedby="filterBtn"
                    name="location"
                    id="locationInput"
                    onChange={this.handleInputChange}
                    value={this.state.location}
                  />
                  <button className="btn" type="submit">
                    Filter
                  </button>
                  <button className="btn" onClick={this.clearFilter}>
                    Clear Filter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>First</th>
                <th>Last</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {this.state.employees.map((employee, i) => (
                <Row
                  key={i}
                  firstName={employee.name.first}
                  lastName={employee.name.last}
                  image={employee.picture.medium}
                  phone={employee.phone}
                  email={employee.email}
                  location={employee.location.state}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
