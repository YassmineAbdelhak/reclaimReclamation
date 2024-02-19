/* import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Page from 'components/Page';
import Typography from 'components/Typography';
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
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
export default class AllReclamation extends Component {
    render(){
        return(
            <Alert color="info">
    <FormGroup row>
      <Label sm={2}><strong>The complainant:</strong></Label>
      <Col sm={10}>{props.user}</Col><br />
    </FormGroup>
    <FormGroup row>
      <Label sm={2}><strong>Adresse:</strong></Label>
      <Col sm={10}>{props.rec.adresse} </Col><br />
    </FormGroup>
    <FormGroup row>
      <Label sm={2}><strong>Incident Picture:</strong></Label>
      <Col sm={10}> <img src={props.rec.problemImage} alt="description" /><br /> </Col><br />
    </FormGroup>
    <FormGroup row>
      <Label sm={2}><strong>Description:</strong></Label>
      <Col sm={10}> {props.rec.description}<br /> </Col><br />
    </FormGroup>
    <FormGroup row>
      <Label sm={2}><strong>Danger Degree:</strong></Label>
      <Col sm={10}> {props.d_danger}<br /> </Col><br />
    </FormGroup>
    <FormGroup row>
      <Label sm={2}><strong>Department:</strong></Label>
      <Col sm={10}> {props.departement}<br /> </Col><br />
    </FormGroup>
    <FormGroup row>
      <Label sm={2}>  <strong  >Position:</strong></Label>
      <UncontrolledButtonDropdown className="m-1">
        <DropdownToggle caret color="info" sm={10} >Choose Reclamation Position</DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Not Treated Yet</DropdownItem>
          <DropdownItem>Working On</DropdownItem>
          <DropdownItem>Done</DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    </FormGroup>
    <FormGroup row>
      <Label sm={2}><strong> Responsible:</strong></Label>
      <UncontrolledButtonDropdown className="m-1">
        <DropdownToggle caret color="info" sm={10}>Choose the responsible employee</DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Another Action</DropdownItem>
          <DropdownItem>Another Action</DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    </FormGroup>
    <FormGroup row>
      <Label sm={10}></Label>
      <Button color="primary"><FontAwesomeIcon icon={faEdit} /> </Button>
    </FormGroup>
  </Alert>
        )
    }
} */