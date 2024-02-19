import Page from 'components/Page';
import React, { Component } from 'react';
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
  Row,
} from 'reactstrap';
export default class AddEmployee extends Component {
  notify = place => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Employee registered Successfully
          </div>
        </div>
      ),
      type: "success",
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
    this.onChangeF_name = this.onChangeF_name.bind(this);
    this.onChangeL_name = this.onChangeL_name.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeDepartement = this.onChangeDepartement.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onChangeBoss = this.onChangeBoss.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangePosition = this.onChangePosition.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      position:'EMPLOYEE',
      f_name: '',
      l_name: '',
      username: '',
      email: '',
      password: '',
      departement: '',
      role: '',
      boss: '',
      gender: '',
      departements: [],
      createemployees: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/manageDepartements/allDepartements')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            departements: response.data,
            departement: response.data[0]._id
          })
        }
      })
    axios.get('http://localhost:5000/loginEmployee/allemployees')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            createemployees: response.data,
            boss: response.data[0]._id
          })
        }
      })
  }

  onChangeF_name(e) {
    this.setState({
      f_name: e.target.value
    });
  }
  onChangeL_name(e) {
    this.setState({
      l_name: e.target.value
    });
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangePosition(e) {
    this.setState({
      position: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  onChangeRole(e) {
    this.setState({
      role: e.target.value
    });
  }
  onChangeDepartement = async (event) => {
    this.setState({
      departement: event.target.value
    });
  }
  onChangeBoss = async (event) => {
    this.setState({
      boss: event.target.value
    });
  }
  onChangeGender(e) {
    this.setState({
      gender: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const employee = {
      f_name: this.state.f_name,
      l_name: this.state.l_name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      departement: this.state.departement,
      role: this.state.role,
      boss: this.state.boss,
      gender: this.state.gender,
    }
    console.log(employee);

    axios.post('http://localhost:5000/registeremployee/addemployee', employee)
      .then(res => {
        console.log(res.data)
        this.notify("tc")
      }).catch((error)=> {
        this.setState({errorMessage: error.response.data.msg})
        this.notifyError('tc')
      })

    this.setState({
      f_name: '',
      l_name: '',
      username: '',
      email: '',
      password: '',
      departement: '',
      role: '',
      boss: '',
      gender: ''
    })


  }


  render() {
    return (
      <Page title="Add Employee" breadcrumbs={[{ name: 'add employee', active: true }]}>
        <div className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
        <Row>
          <Col xl={30} lg={12} md={12}>
            <Card>
              <CardHeader>Add Employee</CardHeader>
              <CardBody>
                <Form onSubmit={this.onSubmit}>
                  <FormGroup row>
                    <Label for="f_name" sm={2} size="lg">
                      First name
                  </Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        name="f_name"
                        required
                        value={this.state.f_name}
                        onChange={this.onChangeF_name}
                        placeholder="Write employee's First name"
                        size="lg"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="l_name" sm={2} size="lg" >
                      Last name
                  </Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        name="l_name"
                        required
                        value={this.state.l_name}
                        onChange={this.onChangeL_name}
                        placeholder="Write employee's last name"
                        size="lg"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="username" sm={2} size="lg" >
                      username
                  </Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        name="username"
                        required
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        placeholder="Write employee's username"
                        size="lg"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="email" sm={2} size="lg" >
                      E-mail
                  </Label>
                    <Col sm={10}>
                      <Input
                        type="email"
                        name="email"
                        required
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        placeholder="Write employee's E-mail"
                        size="lg"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="password" sm={2} size="lg" >
                      Password
                  </Label>
                    <Col sm={10}>
                      <Input
                        type="password"
                        name="password"
                        required
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        placeholder="Write employee's password"
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
                  <FormGroup row>
                    <Label for="departement" sm={2} size="lg">
                      Departement
                    </Label>
                    <Col sm={10}>
                      <Input
                        type="select" name="departement" size="lg"
                        required
                        id="departement"
                        value={this.state.departement}
                        onChange={(event) => { this.onChangeDepartement(event); }}> 
                        {
                          this.state.departements.map((departement) => {
                            return <option
                              key={departement._id}
                              value={departement._id} >{departement.departement_name}</option>;
                          })
                        }
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="role" sm={2} size="lg">
                      Role
                  </Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        name="role"
                        required
                        value={this.state.role}
                        onChange={this.onChangeRole}
                        placeholder="Write employee's role"
                        size="lg"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="gender" sm={2} size="lg" >
                      Gender
                  </Label>
                    <Col sm={10}>
                      <FormGroup check>
                        <Label check size="lg">
                          <Input type="radio"
                            name="gender"
                            id="female"
                            value="female"
                            checked={this.state.gender === "female"}
                            onChange={this.onChangeGender} /> Female
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check size="lg">
                          <Input type="radio"
                            name="gender"
                            id="male"
                            value="male"
                            checked={this.state.gender === "male"}
                            onChange={this.onChangeGender} /> Male
                        </Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }}>
                      <Button size="lg" type="submit" >Submit</Button>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>


      </Page>
    );
  }
}
