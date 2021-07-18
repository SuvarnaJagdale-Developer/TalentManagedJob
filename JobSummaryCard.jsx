import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Popup } from 'semantic-ui-react';
import moment from 'moment';
import { Button, Card, Image,Icon,Label } from 'semantic-ui-react'

export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
        this.selectJob = this.selectJob.bind(this);
         const {loadJobs}= props;
    }

    selectJob(id) {
        var cookies = Cookies.get('talentAuthToken');
        //url: 'http://servicetalent.azurewebsites.net/listing/listing/closeJob',
        
    }

    clickedClose()
    {

         alert("Check ");

    }


     componentDidMount() {
      let expired = moment().isAfter(this.props.loadJobs.expiryDate);
      this.setState({
          expired: expired
      })
  };
 
    render() {
      console.log(this.props.loadJobs);
      var loadJob = this.props.loadJobs;
    
     
       console.log(loadJob[0]);
      
           return(
            
            <Card.Group itemsPerRow={2}>
              
              {
                 loadJob.map((job)=>
               
                 <Card className="fluid">
                      
                 <Card.Content >
                 <Card.Header >{job.title}</Card.Header>
                 <Card.Meta >{job.location.country}   {job.location.city} </Card.Meta>

                  <Label as='a' icon="user" content='0' color='black' ribbon='right'/>
                 
                   
                   
                 <Card.Description >{job.summary}
                 </Card.Description>
               
               
              </Card.Content>
              <Card.Content extra>
            
              <Button.Group basic floated='right' basic color='blue'>
               <Button><i class="ban icon"></i>close</Button>
               <Button><i class="edit outline icon"></i>Edit</Button>
               <Button ><i class="copy outline icon"></i>Copy</Button>
              </Button.Group>
              <div>
              <Button negative>Expired</Button>
             </div>


      </Card.Content>
     
            </Card>
            
            )}
          </Card.Group>
       
                     
               )

         
             
  
          }
      }    
    