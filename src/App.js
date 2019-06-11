import Amplify from 'aws-amplify'
import aws_exports from './aws-exports'
import { withAuthenticator } from 'aws-amplify-react';
import { Connect } from 'aws-amplify-react';
import { graphqlOperation } from 'aws-amplify';
import { Grid, Header, Input, List, Segment } from 'semantic-ui-react';

import React from 'react';
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

class PetsList extends React.Component {
  petItems() {
    return this.props.pets.sort(makeComparator('name')).map(pet =>
        <li key={pet.id}>
          {pet.name}
        </li>
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
  render() {
    return (
      <Connect query={graphqlOperation(ListPets)}>
        {({ data, loading, errors }) => {
          if (loading) { return <div>Loading...</div> }
          if (!data.listPets) return;
          return <PetsList pets={data.listPets.items} />;
        }}
      </Connect>
    )
  }
}

function App() {
  return (
    <Grid padded>
      <Grid.Column>
        Ala ma kota
        <PetsListLoader />
      </Grid.Column>
    </Grid>
  );
}

export default withAuthenticator(App, { includeGreetings: true });
