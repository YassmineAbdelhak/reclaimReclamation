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
} from 'reactstrap';

export default class AddDepartement extends Component {
    notify = place => {
        var options = {};
        options = {
          place: place,
          message: (
            <div>
              <div>
                Department Updated Successfully
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
        this.onChangeDepartement_name = this.onChangeDepartement_name.bind(this);
        this.onChangeBoss = this.onChangeBoss.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            departement_name: '',
            boss: '',
            departements: [],
            createemployees: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/manageDepartements/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    departement_name: response.data.departement_name
                })
            })
            .catch(function (error) {
                console.log(error);
            })
        axios.get('http://localhost:5000/loginEmployee/allemployees')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        createemployees: response.data
                    })
                }
            }).catch((error) => {
                console.log(error)
            })
    }
    onChangeBoss = async (event) => {
        this.setState({
            boss: event.target.value
        });
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
            boss: this.state.boss
        }
        console.log(department);

        axios.patch('http://localhost:5000/manageDepartements/' + this.props.match.params.id, department)
            .then(res => {
                console.log(res.data)
                this.notify("tc")
                window.location = '/addDepartement';
            }).catch((error)=> {
                this.setState({errorMessage: error.response.data.msg})
                this.notifyError('tc')
              })


    }
    render() {
        return (
            <Page title="Departements" breadcrumbs={[{ name: 'Departements', active: true }]}>
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
                                                this.state.createemployees.map((boss) => {
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
                </Col>
            </Page>
        )
    }
}


