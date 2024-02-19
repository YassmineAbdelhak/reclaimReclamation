import Page from 'components/Page';
import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
  Row, Modal, ModalHeader, ModalBody, ModalFooter, 
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const ReclamatType = (props) => {
  const [info, setInfo] = useState(false);
  return( /*onClick={() => { props.deleteReclamationType(props.escalation._id) }}  */
  <tr>
    <td>{props.escalation.reclamation_ddanger}</td>
    <td>{props.escalation.timer} min</td>
    <td> <Link to={"/edit/"+props.escalation._id} > <FontAwesomeIcon icon={faEdit} /> </Link></td>
    <td> <a  style={{cursor:'pointer', color:'#6E9DBA'}} onClick={()=> setInfo(!info)} >
      
      <Modal isOpen={info} toggle={()=> setInfo(!info)}
      className='modal-info'>
        <ModalHeader toggle={()=> setInfo(!info)}></ModalHeader>
        <ModalBody style={{color:'black'}}>
          Are you sure you want to delete this?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => { props.deleteReclamationType(props.escalation._id) }}  href="/reclamationType" > Delete </Button>
          <Button color="secondary" onClick={() => setInfo(!info)} > Cancel </Button>
        </ModalFooter>
      </Modal>
      <FontAwesomeIcon icon={faTrashAlt} /> 
    </a> </td>
  </tr>
  
)
}



export default class ReclamationType extends Component {
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
  constructor(props) {
    super(props);
    this.onChangeReclamation_ddanger = this.onChangeReclamation_ddanger.bind(this);
    this.onChangeTimer = this.onChangeTimer.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteReclamationType = this.deleteReclamationType.bind(this);
    this.state = {
      searchText: '',
      escalations: [],
      originalList: [],
      reclamation_ddanger: '',
      timer: '',
    }
  }
  componentDidMount() {
    axios.get('http://localhost:5000/manageEscalation/')
      .then(response => {
        this.setState({ escalations: response.data, originalList: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteReclamationType(id) {
    axios.delete('http://localhost:5000/manageEscalation/' + id)
      .then(res => {
        console.log(res.data)
        this.notifyDelete("tc")
      });
    this.setState({
      escalations: this.state.escalations.filter(el => el._id !== id)
    })
  }

  onChangeReclamation_ddanger(e) {
    this.setState({
      reclamation_ddanger: e.target.value
    });
  }

  onChangeTimer(e) {
    this.setState({
      timer: e.target.value
    });
  }
  
  inputChange = (e) => {
    this.setState({ searchText: e.target.value });
  };
  search = () => {
    if (this.state.searchText.length > 0) {
      let list = this.state.originalList.filter((l) => {
        return l.reclamation_ddanger
          .toLowerCase()
          .includes(this.state.searchText.toLowerCase());
      });
      this.setState({ escalations: list });
    } else {
      this.setState({ escalations: this.state.originalList });
    }
  };

  onSubmit(e) {
    e.preventDefault();
    const reclamationt = {
      reclamation_ddanger: this.state.reclamation_ddanger,
      timer: this.state.timer,
    }
    console.log(reclamationt);

    axios.post('http://localhost:5000/manageEscalation/', reclamationt)
      .then(res => {
        console.log(res.data)
        this.notify("tc")
        window.location='/ReclamationType'
      }).catch((error)=> {
        this.setState({errorMessage: error.response.data.msg})
        this.notifyError('tc')
      })

    this.setState({
      reclamation_ddanger: '',
      timer: ''
    })

  }

  recTypeList() {
    return this.state.escalations.map(currentRecType => {
      return <ReclamatType escalation={currentRecType} deleteReclamationType={this.deleteReclamationType} key={currentRecType._id} />;
    })
  }

  render() {
    return (
      <Page title="Reclamation Type" breadcrumbs={[{ name: 'Reclamation Type', active: true }]}>
        <div className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
        <Col xl={30} lg={12} md={12}>
          <Card>
            <CardHeader>Manage Reclamation Type</CardHeader>
            <CardBody>
              <Form onSubmit={this.onSubmit} >
                <FormGroup row>
                  <Label for="reclamation_ddanger" sm={2} size="lg">
                    degree of danger
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="reclamation_ddanger"
                      required
                      value={this.state.reclamation_ddanger}
                      onChange={this.onChangeReclamation_ddanger}
                      placeholder="Write Reclamation's degree of danger"
                      size="lg"
                    />
                  </Col>
                </FormGroup>{' '}
                <FormGroup row>
                  <Label for="timer" sm={2} size="lg">
                    Timer
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="number"
                      name="timer"
                      required
                      value={this.state.timer}
                      onChange={this.onChangeTimer}
                      placeholder="Write Reclamation's Timer"
                      size="lg"
                    />
                  </Col>
                </FormGroup>{' '}
                <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button size="lg">Submit</Button>
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
                      name="search_reclamationType"
                      placeholder="Seach for reclamation Type..."
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
                  <CardHeader>reclamation Type List</CardHeader>
                  <CardBody>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Degree of danger</th>
                          <th>Timer</th>
                          <th>Edit</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.recTypeList() }
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
