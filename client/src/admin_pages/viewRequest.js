import React, { useState, useEffect } from 'react';
import { withAdminAuth } from '../components/auth_components/withAdminAuth';
import withSidebar from '../components/withSidebar';
import { Card, Button, Loader, Dimmer } from 'semantic-ui-react';
import { actions, requestType, requestStatusQuery } from '../components/sub-componenets/numToString';
const axios = require('axios').default;

const ViewIssueRequest = () => {
  const [requestsCard, setRequestsCard] = useState([]);
  const [requestStatusQueryNumber, setRequestStatusQueryNumber] = useState(-1);
  const [gettingReq, setGettingReq] = useState(false);

  async function getRequests(typeOfRequest) {
    setGettingReq(true);
    setRequestStatusQueryNumber(typeOfRequest);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`
    }
    console.log(requestStatusQuery[typeOfRequest])
    const params = typeOfRequest === 5 ? {} : { [requestStatusQuery[typeOfRequest]]: true };
    const response = await axios.get(`${process.env.REACT_APP_BASE_URI}/book/issuereq`, {
      params,
      headers
    });
    response.data.forEach((resData) => { resData.isLoading = false });
    setRequestsCard(response.data);
    setGettingReq(false);
  }

  const cards = requestsCard.map((request, index) => {

    async function processRequest(toApprove) {
      let reqNow = request;
      reqNow.isLoading = true;
      setRequestsCard([...requestsCard.slice(-1, index), reqNow, ...requestsCard.slice(index + 1)]);
      try {
        const headers = { Authorization: `Bearer ${localStorage.getItem('auth_token')}` };
        if (toApprove) {
          if (request.status === 0) {
            const body = { approve: true };
            const response = await axios.patch(`${process.env.REACT_APP_BASE_URI}/book/${request._id}/issue`, body, { headers });
            Object.keys(response).forEach((key) => {
              reqNow[key] = response[key];
            });
          }
          else if (request.status === 3) {
            const response = await axios.patch(`${process.env.REACT_APP_BASE_URI}/book/${request._id}/return`, {}, { headers });
            Object.keys(response).forEach((key) => {
              reqNow[key] = response[key];
            });
          }
        } else {
          //reject 
          const body = { approve: false };
          const response = await axios.patch(`${process.env.REACT_APP_BASE_URI}/book/${request._id}/issue`, body, { headers });
          Object.keys(response).forEach((key) => {
            reqNow[key] = response[key];
          });
        }
      } catch (e) {
        if (e.response && e.response.data) {
          console.log(e.response.data.error)
        } else { console.log(e) }
      }
      reqNow.isLoading = false;
      setRequestsCard([...requestsCard.slice(-1, index), reqNow, ...requestsCard.slice(index + 1)]);
    }

    return (
      <Card fluid key={request._id}>
        <Card.Content>
          <Card.Header>Book Name: {request.book.name}</Card.Header>
          <Card.Description>
            <strong>{request.issuer.name}</strong> {` ${actions[request.status]} `} this book
          </Card.Description>
          <Card.Meta>{requestType[request.issueType]}</Card.Meta>
          <Card.Meta>{`${request.book.issued} out of ${request.book.copies} Copies currently issued`}</Card.Meta>
        </Card.Content>
        <Card.Content hidden={!((request.status === 0) || (request.status === 3))} extra>
          <div className='ui two buttons'>
            <Button loading={request.isLoading} disabled={request.isLoading} onClick={() => { processRequest(true) }} basic color='green'>
              Approve
            </Button>
            <Button loading={request.isLoading} disabled={request.isLoading} onClick={() => { processRequest(false) }} style={request.status === 3 ? { display: "none" } : {}} basic color='red'>
              Decline
            </Button>
          </div>
        </Card.Content>
      </Card>
    )
  })
  return (
    <>
      <h1>View Requests</h1>
      <Button loading={gettingReq} disabled = {gettingReq} onClick={() => getRequests(5)} primary>All Requests</Button>
      <Button loading={gettingReq} disabled = {gettingReq} onClick={() => getRequests(0)} color='yellow'>Issued Books</Button>
      <Button loading={gettingReq} disabled = {gettingReq} onClick={() => getRequests(1)} color='olive'>Returned</Button>
      <Button loading={gettingReq} disabled = {gettingReq} onClick={() => getRequests(2)} negative>Rejected Requests</Button>
      <Button loading={gettingReq} disabled = {gettingReq} onClick={() => getRequests(3)} color='green'>Pending Issue Requests</Button>
      <Button loading={gettingReq} disabled = {gettingReq} onClick={() => getRequests(4)} color='teal'>Pending Return Requests</Button>
      {
        requestsCard.length === 0 ? (requestStatusQueryNumber === -1) ? <h1>Select What Kind of request you'd like to see</h1> : <h1>No Requests To Show</h1> :
          <Card.Group style={{ marginLeft: '0%', marginTop: '0%' }}>{cards}</Card.Group>
      }
      {
        gettingReq ? <Dimmer active><Loader /></Dimmer> : null
      }
    </>
  )
}

export default withAdminAuth(withSidebar(ViewIssueRequest));