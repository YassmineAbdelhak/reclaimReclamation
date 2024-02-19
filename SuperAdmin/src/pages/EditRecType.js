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





export default class EditRecType extends Component {
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
  constructor(props) {
    super(props);
    this.onChangeReclamation_ddanger = this.onChangeReclamation_ddanger.bind(this);
    this.onChangeTimer = this.onChangeTimer.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      reclamation_ddanger: '',
      timer: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/manageEscalation/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          reclamation_ddanger: response.data.reclamation_ddanger,
          timer: response.data.timer
        })
      })
      .catch(function (error) {
        console.log(error);
      })
   console.log(this.state)
  }

  onChangeReclamation_ddanger(e) {
    this.setState({
      reclamation_ddanger: e.target.value
    })
  }

  onChangeTimer(e) {
    this.setState({
      timer: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      reclamation_ddanger: this.state.reclamation_ddanger,
      timer: this.state.timer
    }

    console.log(exercise);

    axios.patch('http://localhost:5000/manageEscalation/' + this.props.match.params.id, exercise)
      .then(res => {
        console.log(res.data)
        this.notify("tc")
      }).catch((error)=> {
        this.setState({errorMessage: error.response.data.msg})
        this.notifyError('tc')
      })

    window.location = '/reclamationType';
  }

  render() {
    return (
      <Page title="Reclamation Type" breadcrumbs={[{ name: 'Reclamation Type', active: true }]}>
        <div className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
        <Col xl={30} lg={12} md={12}>
          <Card>
            <CardHeader>Edit Reclamation Type</CardHeader>
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
                      onChange={this.onChangeReclamation_ddanger.bind(this)}
                      size="lg"
                    />
                  </Col>
                </FormGroup>
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
                      onChange={this.onChangeTimer.bind(this)}
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
        </Col>
      </Page>
    )
  }

}
