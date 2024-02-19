import Page from 'components/Page';
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardBody, FormGroup, CardHeader, Col, Row, Input, Table, Form, Button, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const Employers = props => (

  <tr>
    <td>{props.emp.f_name}</td>
    <td>{props.emp.l_name}</td>
    <td>{props.emp.username}</td>
    <td>{props.emp.email}</td>
    <td>{props.departement}</td>
    <td>{props.emp.role}</td>
    <td>{props.boss}</td>
    <td> <Link to={"/updates/"+props.id}> <FontAwesomeIcon icon={faEdit} /> </Link> </td>
    <td> <a href="/EmployeeList #" onClick={() => { props.deleteEmployee(props.emp.id) }} ><FontAwesomeIcon icon={faTrashAlt} /> </a> </td>

  </tr>
)

export default class EmployeesList extends Component {
  constructor(props) {
    super(props);
    this.deleteEmployee = this.deleteEmployee.bind(this)
    this.state = {
      createemployees: [],
      departements:[],
      searchText: '',
      originalList: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/loginEmployee/allemployees')
      .then(response => {
        this.setState({ createemployees: response.data, originalList: response.data })
        console.log("====>",response.data)
      })
      .catch((error) => {
        console.log(error);
        
      })
      
  }

  deleteEmployee(id) {
    axios.delete('http://localhost:5000/registeremployee/' + id)
      .then(response => { console.log(response.data) });

    this.setState({
      createemployees: this.state.createemployees.filter(el => el._id !== id)
    })
  }
  
  employeeList() {
    
    return this.state.createemployees.map(currentemp => {
      return <Employers emp={currentemp} departement={currentemp.departement.departement_name} boss={currentemp.boss.username} id={currentemp.id} deleteEmployee={this.deleteEmployee} key={currentemp.id} />;
      
    })
  }
  inputChange = (e) => {
    this.setState({ searchText: e.target.value });
  };
  search = () => {
    if (this.state.searchText.length > 0) {
      let list = this.state.originalList.filter((l) => {
        return l.username
          .toLowerCase()
          .includes(this.state.searchText.toLowerCase());
      });
      this.setState({ createemployees: list });
    } else {
      this.setState({ createemployees: this.state.originalList });
    }
  };
  render() {
    return (
      <Page
        title="Employees List"
        breadcrumbs={[{ name: 'Employees List', active: true }]}
        className="TablePage"
      >
        <Row>
          <Col xl={30} lg={12} md={12} >
            <Form>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="search_employee"
                    placeholder="Seach for employee..."
                    size="lg"
                    onChange={this.inputChange}
                  />
                </Col>
                <Col>
                  <Button color="secondary" size="lg"
                  onClick={this.search}>
                    Search
                </Button>
                </Col>
              </FormGroup>
              <Card className="mb-3">
                <CardHeader>Employees List</CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Departement</th>
                        <th>Role</th>
                        <th>Supervisor</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                    { this.employeeList() }
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Form>
          </Col>
        </Row>
      </Page>
    )
  }

}

