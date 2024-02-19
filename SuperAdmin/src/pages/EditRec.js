/* eslint-disable jsx-a11y/href-no-hash */
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Page from 'components/Page';
import Typography from 'components/Typography';
import NotificationAlert from "react-notification-alert";
import {
    Alert,
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    DropdownItem,
    DropdownMenu,
    UncontrolledButtonDropdown,
    DropdownToggle,
    FormGroup,
    Label,
    Button,
    Form,
    Input,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default class AllReclamation extends Component {
    notify = place => {
        var options = {};
        options = {
            place: place,
            message: (
                <div>
                    <div>
                        Reclamation Updated Successfully
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

        super(props)
        this.onChangePosition = this.onChangePosition.bind(this);
        this.onChangeEmployee = this.onChangeEmployee.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            employee: '',
            escalations: [],
            departements: [],
            createemployees: [],
            forms: []
        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/sendReclamation/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    d_danger: response.data.d_danger.reclamation_ddanger,
                    adresse: response.data.adresse,
                    description: response.data.description,
                    departement: response.data.departement.departement_name,
                    problemImage: response.data.problemImage,
                    user: response.data.user.email,
                })
                console.log("===========", response);
            })
            .catch((error) => {
                console.log(error);
            })
        axios.get('http://localhost:5000/loginEmployee/allemployees')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        createemployees: response.data,
                        employee: response.data[0]._id
                    })
                    console.log(response.data[0]._id)
                }
            })
    }
    onChangeEmployee = async (event) => {
        this.setState({
            employee: event.target.value
        });
    }
    onChangePosition(e) {
        this.setState({
            position: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const recEmp = {
            employee: this.state.employee,
            position: this.state.position,
        }
        console.log(recEmp);

        axios.patch('http://localhost:5000/sendReclamation/empPart/' + this.props.match.params.id, recEmp)
            .then(res => {
                console.log("======", res.data)
                this.notify("tc")
            }).catch((error)=> {
                this.setState({errorMessage: error.response.data.msg})
                this.notifyError('tc')
              })

        window.location = '/WorkingOnReclamation';

    }

    render() {
        return (
            <Page title="Reclamations" breadcrumbs={[{ name: 'Reclamations', active: true }]}>
                <div className="react-notification-alert-container">
                    <NotificationAlert ref="notificationAlert" />
                </div>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>Reclamations</CardHeader>
                            <CardBody>
                                <Alert color="info">
                                    <FormGroup row>
                                        <Label sm={2}><strong>The complainant:</strong></Label>
                                        <Col sm={10}>{this.state.user}</Col><br />
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm={2}><strong>Adresse:</strong></Label>
                                        <Col sm={10}>{this.state.adresse} </Col><br />
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm={2}><strong>Incident Picture:</strong></Label>
                                        <Col sm={10}> <img src= {'http://localhost:5000/uploads/'+this.state.problemImage}    alt="description" /><br /> </Col><br />
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm={2}><strong>Description:</strong></Label>
                                        <Col sm={10}> {this.state.description}<br /> </Col><br />
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm={2}><strong>Danger Degree:</strong></Label>
                                        <Col sm={10}> {this.state.d_danger}<br /> </Col><br />
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm={2}><strong>Department:</strong></Label>
                                        <Col sm={10}> {this.state.departement}<br /> </Col><br />
                                    </FormGroup>
                                    <Form onSubmit={this.onSubmit}>
                                        <FormGroup row>
                                            <Label sm={2}>  <strong  >Position:</strong></Label>
                                            <UncontrolledButtonDropdown className="m-1">
                                                <Input caret color="info" sm={10}
                                                    type="select" name="position"
                                                    id="position"
                                                    required
                                                    onChange={(event) => { this.onChangePosition(event); }} >
                                                    <option>Not Treated Yet</option>
                                                    <option>Working On</option>
                                                    <option>Done</option>
                                                </Input>
                                            </UncontrolledButtonDropdown>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label sm={2}><strong> Responsible:</strong></Label>
                                            <UncontrolledButtonDropdown className="m-1">
                                                <Input
                                                    type="select" name="employee"
                                                    id="employee"
                                                    required
                                                    value={this.state.employee}
                                                    onChange={(event) => { this.onChangeEmployee(event); }}>
                                                    {
                                                        this.state.createemployees.map((employee) => {
                                                            return (
                                                                <option
                                                                    key={employee.id}
                                                                    value={employee.id} >{employee.username}</option>
                                                            )
                                                        })
                                                    }
                                                </Input>
                                            </UncontrolledButtonDropdown>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label sm={10}></Label>
                                            <Button color="primary" type="submit">Submit</Button>
                                        </FormGroup>
                                    </Form>
                                </Alert>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>Additional Content</CardHeader>
                            <CardBody>
                                <Alert color="success">
                                    <Typography type="h4" className="alert-heading">
                                        Well done!
                </Typography>
                                    <Typography>
                                        Aww yeah, you successfully read this important alert message.
                                        This example text is going to run a bit longer so that you can
                                        see how spacing within an alert works with this kind of
                                        content.
                </Typography>
                                    <hr />
                                    <Typography className="mb-0">
                                        Whenever you need to, be sure to use margin utilities to keep
                                        things nice and tidy.
                </Typography>
                                </Alert>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Page>
        )
    }
}

