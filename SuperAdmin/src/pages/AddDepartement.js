import { Sidebar } from 'components/Layout';
import Page from 'components/Page';
import React, { Component, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NotificationAlert from "react-notification-alert";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Table,
  Row,ModalHeader, ModalBody, ModalFooter, Modal,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const DepartCom = (props) => {
  const [info, setInfo] = useState(false);
  return(
  <tr>
    <td>{props.departm.departement_name}</td>
    <td> {props.boss}</td>
    <td> <Link to={"/update/" + props.departm._id}> <FontAwesomeIcon icon={faEdit} /> </Link> </td>
    <td> <a  style={{cursor:'pointer', color:'#6E9DBA'}} onClick={()=> setInfo(!info)} >
      
      <Modal isOpen={info} toggle={()=> setInfo(!info)}
      className='modal-info'>
        <ModalHeader toggle={()=> setInfo(!info)}></ModalHeader>
        <ModalBody style={{color:'black'}}>
          Are you sure you want to delete this?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => { props.deleteDepartment(props.departm._id) }}  > Delete </Button>
          <Button color="secondary" onClick={() => setInfo(!info)} > Cancel </Button>
        </ModalFooter>
      </Modal>
      <FontAwesomeIcon icon={faTrashAlt} /> 
    </a> </td>
  </tr>
)
}

export default class AddDepartement extends Component {
  notify = place => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Department registered Successfully
          </div>
        </div>
      ),
      type: "success",
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7
    };
    this.refs.notificationAlert.notificationAlert(options);
  };
  notifyDelete = place => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Department registered Successfully
          </div>
        </div>
      ),
      type: "warning",
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7
    };
    this.refs.notificationAlert.notificationAlert(options);
  };
  notifyError = place => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            {this.state.errorMessage}
          </div>
        </div>
      ),
      type: "danger",
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7
    };
    this.refs.notificationAlert.notificationAlert(options);
  };
  constructor(props) {
    super(props);
    this.onChangeDepartement_name = this.onChangeDepartement_name.bind(this);
    this.onChangeBoss = this.onChangeBoss.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteDepartment = this.deleteDepartment.bind(this);
    this.state = {
      searchText: '',
      departement_name: '',
      boss: '',
      departements: [],
      originalList: [],
      createemployees: [],
      errorMessage:''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/manageDepartements/allDepartements')
      .then(response => {
        this.setState({ departements: response.data, originalList: response.data})
        console.log("DEPARTMEEEENTS",response.data)
      })
      .catch((error) => {
        console.log(error);
      })
      axios.get('http://localhost:5000/loginEmployee/allemployees')
      .then(response => {
        this.setState({ createemployees: response.data})
        console.log("====>",response.data)
      })
      .catch((error) => {
        console.log(error);
        
      })
  }
  onChangeBoss = async (event) => {
    this.setState({
      boss: event.target.value
    });
  }
  inputChange = (e) => {
    this.setState({ searchText: e.target.value });
  };
  search = () => {
    if (this.state.searchText.length > 0) {
      let list = this.state.originalList.filter((l) => {
        return l.departement_name
          .toLowerCase()
          .includes(this.state.searchText.toLowerCase());
      });
      this.setState({ departements: list });
    } else {
      this.setState({ departements: this.state.originalList });
    }
  };
  deleteDepartment(id) {
    axios.delete('http://localhost:5000/manageDepartements/' + id)
      .then(response => { 
        console.log(response.data)
        this.notifyDelete("tc")
        window.location='/AddDepartement'
      });

    this.setState({
      departements: this.state.departements.filter(el => el._id !== id)
    })
  }

  onChangeDepartement_name(e) {
    this.setState({
      departement_name: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const department = {
      departement_name: this.state.departement_name,
      boss: this.state.boss,
    }
    console.log(department);

    axios.post('http://localhost:5000/manageDepartements/addDepartement', department)
      .then(res =>{ console.log(res.data)
        this.notify("tc")
      window.location = '/addDepartement';
      }
      ).catch((error)=> {
        this.setState({errorMessage: error.response.data.msg})
        this.notifyError('tc')
      })
 
    this.setState({
      departement_name: '',
      boss: '',
    }) 
    
  }

  departmentList() {
    return this.state.departements.map(currentdept => {
      return <DepartCom departm={currentdept} boss={currentdept.boss.username} deleteDepartment={this.deleteDepartment} key={currentdept._id} />;
    })
  }
  render() {
    return (
      
      <Page title="Departements" >
        <div className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
        <Col xl={30} lg={12} md={12}>
          <Card>
            <CardHeader>Manage Departement</CardHeader>
            <CardBody>
              <Form onSubmit={this.onSubmit}>
                <FormGroup row>
                  <Label for="departement_name" sm={2} size="lg">
                    Departement-Name
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      required
                      value={this.state.departement_name}
                      onChange={this.onChangeDepartement_name}
                      placeholder="Write Departement's name"
                      size="lg"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="boss" sm={2} size="lg">
                      supervisor
                  </Label>
                    <Col sm={10}>
                      <Input
                        type="select" name="boss" size="lg"
                        id="boss"
                        required
                        value={this.state.boss}
                        onChange={(event) => { this.onChangeBoss(event); }}>
                        {
                          this.state.createemployees.map((boss)=> {
                            return (
                            <option
                              key={boss.id}
                              value={boss.id} >{boss.username}</option>
                            )
                          })
                        }
                      </Input>
                    </Col>
                  </FormGroup>
                <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button type="submit" size="lg">Submit</Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
          <br />
          <Row>
            <Col xl={30} lg={12} md={12} >
              <Form>
                <FormGroup row>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="search_department"
                      placeholder="Seach for Department..."
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
                <Card className="mb-3" xl={30} lg={12} md={12} >
                  <CardHeader >Departement List</CardHeader>
                  <CardBody>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Departement Name</th>
                          <th>supervisor</th>
                          <th>Edit</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.departmentList()}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Form>
            </Col>
          </Row>
        </Col>
      </Page>
    )
  }
}


