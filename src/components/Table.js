import { Component } from 'react';
import API from '../utils/API';
import '../assets/css/utils.css';
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
        <div className="tab scroll">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <button className="btn btn-primary" onClick={this.sortByName}>
              Sort A-Z
            </button>
            <form className="form form-inline" onSubmit={this.renderFiltered}>
              <div className="form-group">
                <label className="mr-2">Filter by State</label>
                <input
                  type="text"
                  className="form-control mr-2"
                  placeholder="California"
                  aria-label="location"
                  aria-describedby="filterBtn"
                  name="location"
                  id="locationInput"
                  onChange={this.handleInputChange}
                  value={this.state.location}
                />
                <button
                  className="btn btn-primary mr-2"
                  type="submit"
                  id="filterBtn"
                >
                  Filter
                </button>
                <button className="btn btn-primary" onClick={this.clearFilter}>
                  Clear Filter
                </button>
              </div>
            </form>
          </div>
          <div className="row">
            <table className="table mb-0">
              <thead>
                <tr>
                  <th>
                    <span className="material-icons">emoji_emotions</span>
                  </th>
                  <th>
                    <strong>First</strong>
                  </th>
                  <th>
                    <strong>Last</strong>
                  </th>
                  <th>
                    <strong>Phone</strong>
                  </th>
                  <th>
                    <strong>Email</strong>
                  </th>
                  <th>
                    <strong>Location</strong>
                  </th>
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
      </div>
    );
  }
}
