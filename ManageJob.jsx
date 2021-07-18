import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { DisplayJob } from './DisplayJob.jsx';
import DatePicker from 'react-datepicker';
import { Pagination,Dropdown,Search,Header,Select, Checkbox,Icon,Label,Container} from 'semantic-ui-react'
import { SelectionState } from 'draft-js';
import { filter } from 'lodash';
import { CheckBox } from '../../Form/CheckBox.jsx';

export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");

        //console.log(loader)
        this.state = {
            loadJobs: [],
            loaderData: loader,
            activePage: 1,
           
           
            sortBy: {
                
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
           totalPages: 20,
           activeIndex: "",
                    
        }
      
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handlerChangeDate=this.handlerChangeDate.bind(this);
       // this.paginate=this.paginate.bind(this);
       
    };
    handlerChangeDate(event,data)
    { 
      
       
        console.log("State Check",this.state);
        const {sortBy}=this.state 
        console.log(data.value);
        sortBy.date=data.value;
        
        this.setState({sortBy})
      
         
        this.init();
    }

  

   
   handleChange(e,data)
   {

     console.log("show",data)
     console.log("checked",data.checked);
     /* if(data.checked===false)
      {
          
console.log("No data")
      }
      else
       { */
     var {filter}=this.state 
    
        
      filter[data.label]=!this.state.filter[data.label]

      this.setState({filter})
       this.init();
      console.log(this.state.filter); 
    // }
    } ;

    
 
    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this
  
     // set loaderData.isLoading to false after getting data
        this.loadData(() =>
           this.setState({ loaderData })
        )
        
        
    }

    componentDidMount() {
        this.init();
        
        
        
    };
    paginate(activePage) {
        const data = Object.assign({}, this.state)
        data['activePage'] = activePage
        console.log(`activepage  ${this.state.activePage}`)
        this.setState({
            activePage: activePage
        })
        console.log(`activepage  ${this.state.activePage}`)
       // this.loadNewData(data); 
       this.init();

    }

  

    loadData(callback) {
        var link = 'http://servicetalent.azurewebsites.net/listing/listing/getSortedEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');
       // your ajax call and other logic goes here
          $.ajax({
            url: link,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: 'GET',
            contentType: 'application/json',
            data : {
             activePage: this.state.activePage,
            sortbyDate: this.state.sortBy.date,
            showActive: this.state.filter.showActive,
            showClosed: this.state.filter.showClosed,
            showDraft: this.state.filter.showDraft,
            showExpired: this.state.filter.showExpired,
            showUnexpired: this.state.filter.showUnexpired,
            },
            dataType: 'json',
            success: function (res) {
                this.setState({loadJobs : res.myJobs,
                  totalPages:Math.ceil(res.totalCount/6)
                  
                   });

                    console.log(this.state.totalPages)
    
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        })
    }

    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    };

 
    render() {
      
        const loadJobs = this.state.loadJobs;
        const filter=this.state.filter;
      
          
       
           console.log(loadJobs);
           const dateConst=[{ key: 'NewestFirst', text:'NewestFirst', value:'desc'},
                            { key: 'OldestFirst', text:'OldestFirst', value:'asce'}]

          const options = [{id: 1, text:'showActive',value:'showActive'},
                            {id: 2, text:'showClosed',value:'showClosed'},
                            {id: 3, text:'showDraft',value:'showClosed'},
            
                            {id: 4, text:'showExpired',value:'showExpired'},
            
                            {id: 5, text:'showUnexpired',value:'showUnexpired'}
                             ]


        return (
           

         <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
         <div class="ui left aligned container"><h2 class="ui header">List Of Jobs</h2>
           
         <Label> <Icon name='filter'/>Filter:</Label>
        
         <Dropdown item simple text="Choose Filter">
         <Dropdown.Menu>
          {options.map((option) => (
            <Dropdown.Item>
              <Checkbox label={option.text} 
               onChange={(event,data)=>this.handleChange(event,data)}  
               defaultChecked={this.state.filter[option.text]}
              />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

         
            
            
              <Label> <Icon name='calendar alternate outline'/>Sort by date:</Label>
               <Dropdown 
                
                options={dateConst} 
                onChange={(event,data)=>this.handlerChangeDate(event,data)}
              
                ></Dropdown> 

             

       <JobSummaryCard 
        loadJobs={loadJobs}></JobSummaryCard>
      <Container textAlign='rigth'>
      <Pagination className ="ui justify-content-center"  floated='right' 
         activePage={this.state.activePage}
         totalPages={this.state.totalPages}
         onPageChange={(event, data) => this.paginate(data.activePage)}
        />
    
    </Container>
   
         </div>

         
       
         </BodyWrapper>
        
        

        )
    }
}

