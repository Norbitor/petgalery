import Amplify from 'aws-amplify'
import aws_exports from './aws-exports'
import { withAuthenticator } from 'aws-amplify-react';
import { Connect } from 'aws-amplify-react';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { Form, Grid, Header, Input, List, Segment } from 'semantic-ui-react';
import {v4 as uuid} from 'uuid';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';

import React from 'react';
import { Component } from 'react';
import './App.css';

Amplify.configure(aws_exports);

function makeComparator(key, order='asc') {
  return (a, b) => {
    if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0; 

    const aVal = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
    const bVal = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (aVal > bVal) comparison = 1;
    if (aVal < bVal) comparison = -1;

    return order === 'desc' ? (comparison * -1) : comparison;
  };
}

class S3ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { uploading: false }
  }
  onChange = async (e) => {
    const file = e.target.files[0];
    const fileName = uuid();
    this.setState({uploading: true});
    const result = await Storage.put(
      fileName, 
      file, 
      {
        customPrefix: { public: 'uploads/' },
        metadata: { petid: this.props.petId }
      }
    );
    console.log('Uploaded file: ', result);
    this.setState({uploading: false});
  }
  render() {
    return (
      <div>
        <Form.Button
          onClick={() => document.getElementById('add-image-file-input').click()}
          disabled={this.state.uploading}
          icon='file image outline'
          content={ this.state.uploading ? 'Uploading...' : 'Add Image' }
        />
        <input
          id='add-image-file-input'
          type="file"
          accept='image/*'
          onChange={this.onChange}
          style={{ display: 'none' }}
        />
      </div>
    );
  }
}

const GetPet = `query GetPet($id: ID!) {
  getPet(id: $id) {
    id
    name
  }
}
`;

class PetsDetailsLoader extends React.Component {
  render() {
    return (
      <Connect query={graphqlOperation(GetPet, { id: this.props.id })}>
        {({ data, loading, errors }) => {
          if (loading) { return <div>Loading...</div>; }
          if (errors.length > 0) { return <div>{JSON.stringify(errors)}</div>; }
          if (!data.getPet) return;
          return <PetDetails pet={data.getPet} />;
        }}
      </Connect>
    );
  }
}
class PetDetails extends Component {
  render() {
    if (!this.props.pet) return 'Loading pet...';
    return (
      <Segment>
        <Header as='h3'>{this.props.pet.name}</Header>
        <S3ImageUpload petId={this.props.pet.id}/>        
        <p>TODO: Show photos for this pet</p>
      </Segment>
    )
  }
}
class PetsList extends React.Component {
  petItems() {
    return this.props.pets.sort(makeComparator('name')).map(pet =>
      <List.Item key={pet.id}>
        <NavLink to={`/pets/${pet.id}`}>{pet.name}</NavLink>
      </List.Item>
    );
  }

  render() {
    return (
      <Segment>
        <Header as='h3'>My Pets</Header>
        <List divided relaxed>
          {this.petItems()}
        </List>
      </Segment>
    );
  }
}

const ListPets = `query ListPets {
  listPets(limit: 9999) {
    items {
      id
      name
    }
  }
}`;

class PetsListLoader extends React.Component {
  onNewPet = (prevQuery, newData) => {
    let updatedQuery = Object.assign({}, prevQuery);
    updatedQuery.listPets.items = prevQuery.listPets.items.concat([newData.onCreatePet]);
    return updatedQuery;
  }
  render() {
    return (
      <Connect query={graphqlOperation(ListPets)}
                subscription={graphqlOperation(SubscribeToNewPets)} 
                onSubscriptionMsg={this.onNewPet}
                 >
        
        {({ data, loading, errors }) => {
          if (loading) { return <div>Loading...</div> }
          if (errors.length > 0) { return <div>{JSON.stringify(errors)}</div>; }
          if (!data.listPets) return;
          return <PetsList pets={data.listPets.items} />;
        }}
      </Connect>
    )
  }
}

class NewPet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      petName: '',
      petSpecies: '',
      race: '',
      bornYear: ''
     };
   }

  handleChange = (event) => {
    let change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }

//, race:"$race", bornYear:"$born"
  handleSubmit = async (event) => {
    event.preventDefault();
    const NewPet = `mutation NewPet($name: String!, $species: String!, $race: String, $bornYear: Int) {
      createPet(input: {name: $name, species: $species, race: $race, bornYear: $bornYear}) {
        id
        name
      }
    }`;

    const result = await API.graphql(graphqlOperation(NewPet, { name: this.state.petName, species: this.state.petSpecies, race: this.state.petSpecies, bornYear: this.state.bornYear}));
    console.info(`Created pet with id ${result.data.createPet.id}`);
  }

  render() {
    return (
      <Segment>
        <Header as='h3'>Add a new pet</Header>
         <Input
          type='text'
          placeholder='New Pet Name'
          icon='plus'
          iconPosition='left'
          
          name='petName'
          value={this.state.petName}
          onChange={this.handleChange}
         />
          <Input
          type='text'
          placeholder='New Pet Species'
          icon='plus'
          iconPosition='left'
         
          name='petSpecies'
          value={this.state.petSpecies}
          onChange={this.handleChange}
         />
        <Input
          type='text'
          placeholder='New Pet Race'
          icon='plus'
          iconPosition='left'
          
          name='petRace'
          value={this.state.petRace}
          onChange={this.handleChange}
         />
        <Input
          type='nuber'
          placeholder='New Pet birth date'
          icon='plus'
          iconPosition='left'
          action={{ content: 'Create', onClick: this.handleSubmit }}
          name='bornYear'
          value={this.state.bornYear}
          onChange={this.handleChange}
         />
        </Segment>
      )
   }
}


const SubscribeToNewPets = `
  subscription OnCreatePet {
    onCreatePet {
      id
      name
    }
  }
`;

class App extends Component {
  render() {
    return (
      <Router>
        <Grid padded>
          <Grid.Column>
            <Route path="/" exact component={NewPet}/>
            <Route path="/" exact component={PetsListLoader}/>
            <Route
              path="/pets/:petId"
              render={ () => <div><NavLink to='/'>Back to Pets list</NavLink></div> }
            />
            <Route
              path="/pets/:petId"
              render={ props => <PetsDetailsLoader id={props.match.params.petId}/> }
            />
          </Grid.Column>
        </Grid>
      </Router>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true });
