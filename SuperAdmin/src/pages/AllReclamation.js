/* eslint-disable jsx-a11y/href-no-hash */
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Page from 'components/Page';
import Typography from 'components/Typography';
import jwt from "jsonwebtoken";
import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Input,
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
const Reclamations = props => (
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
      <Col sm={10}> <img src={'http://localhost:5000/uploads/' + props.rec.problemImage} alt="description" /><br /> </Col><br />
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
      <Col sm={10} >{props.rec.position}</Col>
    </FormGroup>
    <FormGroup row>
      <Label sm={10}></Label>
      <Button color="primary"><Link to={"/updateRec/" + props.id}><FontAwesomeIcon icon={faEdit} color="white" /> </Link> </Button>
    </FormGroup>
  </Alert>
)
export default class AllReclamation extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      escalations: [],
      departements: [],
      forms: [],
      id: null
    }
  }
  componentDidMount() {
    let token = localStorage.getItem("token")
    let decoded = jwt.decode(token)
    console.log('----------------------', decoded)
    this.setState({ id: decoded.user.id })
    this.setState({ departement: decoded.user.departement })
    axios.get('http://localhost:5000/sendReclamation/allReclamation')
      .then(response => {
        this.setState({ forms: response.data, originalList: response.data })
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  }
  inputChange = (e) => {
    this.setState({ searchText: e.target.value });
  };
  search = () => {
    if (this.state.searchText.length > 0) {
      let list = this.state.originalList.filter((l) => {
        return l.adresse
          .toLowerCase()
          .includes(this.state.searchText.toLowerCase());
      });
      this.setState({ forms: list });
    } else {
      this.setState({ forms: this.state.originalList });
    }
  };
  reclamationList() {
    return this.state.forms.map(currentrec => {
      if ((currentrec.departement._id == this.state.departement) && (currentrec.position == "Not Treated Yet")) {
        return <Reclamations rec={currentrec} user={currentrec.user.email} /* employee={currentrec.employee.username} */ departement={currentrec.departement.departement_name} d_danger={currentrec.d_danger.reclamation_ddanger} id={currentrec._id} key={currentrec._id} />;

      }
    })
  }

  render() {

    return (
      <Page title="Reclamations" breadcrumbs={[{ name: 'Reclamations', active: true }]}>
        <Row>
          <Col>
            <FormGroup row>
              <Col sm={10}>
                <Input
                  type="text"
                  name="search_employee"
                  placeholder="Seach for Reclamation..."
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
            <Card>
              <CardHeader>Reclamations</CardHeader>
              <CardBody>
                {this.reclamationList()}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    )
  }
}

