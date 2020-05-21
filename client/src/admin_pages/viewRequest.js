import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { withSidebar } from '../components/withSidebar';
import { Card } from 'semantic-ui-react';
const axios = require('axios').default;

const ViewIssueRequest = () => {
  const [requestsCard, setRequestsCard] = useState([])
  useEffect(() => {
    async function getRequests() {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
      }
      const response = await axios.get(`${process.env.REACT_APP_BASE_URI}/book/issuereq`, {
        headers
      });
      setRequestsCard(response.data);
    }
    getRequests();
  },[])
  const cards = requestsCard.map((request) => {
    return (
      <Card fluid key={request._id}>
        {request._id}
      </Card>
    )
  })
  return (
    <>
      <div>View Requests</div>
      {requestsCard.length === 0 ? <h1>No Requests To Show</h1> : cards}
    </>
  )
}

export default withSidebar(ViewIssueRequest);