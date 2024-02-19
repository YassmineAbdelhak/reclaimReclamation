import Page from 'components/Page';
import React, { Component } from 'react';
import axios from 'axios';
export default class Role extends Component {
  EMPLOYEE='EMPLOYEE'
  ADMIN='ADMIN'
  /* componentDidMount() {
    let token = localStorage.getItem("token")
    let decoded = jwt.decode(token)
    console.log('----------------------',decoded)
    this.setState({id : decoded.user.id})
    this.setState({departement : decoded.user.departement})
    this.setState({position : decoded.user.position})
    this.getPosition(decoded.position)
  }
  getPosition = (p)=>{
      if(p == ADMIN){
          //test
      }
  } */
}
