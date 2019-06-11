// eslint-disable
// this is an auto generated file. This will be overwritten

export const getPet = `query GetPet($id: ID!) {
  getPet(id: $id) {
    id
    name
    species
    race
    bornYear
    photos {
      items {
        id
        bucket
      }
      nextToken
    }
  }
}
`;
export const listPets = `query ListPets($filter: ModelPetFilterInput, $limit: Int, $nextToken: String) {
  listPets(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      species
      race
      bornYear
      photos {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getPhoto = `query GetPhoto($id: ID!) {
  getPhoto(id: $id) {
    id
    pet {
      id
      name
      species
      race
      bornYear
      photos {
        nextToken
      }
    }
    bucket
    fullsize {
      key
      width
      height
    }
    thumbnail {
      key
      width
      height
    }
  }
}
`;
export const listPhotos = `query ListPhotos(
  $filter: ModelPhotoFilterInput
  $limit: Int
  $nextToken: String
) {
  listPhotos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      pet {
        id
        name
        species
        race
        bornYear
      }
      bucket
      fullsize {
        key
        width
        height
      }
      thumbnail {
        key
        width
        height
      }
    }
    nextToken
  }
}
`;
export const getPhotoS3Info = `query GetPhotoS3Info($id: ID!) {
  getPhotoS3Info(id: $id) {
    key
    width
    height
  }
}
`;
export const listPhotoS3Infos = `query ListPhotoS3Infos(
  $filter: ModelPhotoS3InfoFilterInput
  $limit: Int
  $nextToken: String
) {
  listPhotoS3Infos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      key
      width
      height
    }
    nextToken
  }
}
`;
