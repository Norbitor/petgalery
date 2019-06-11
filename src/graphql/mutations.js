// eslint-disable
// this is an auto generated file. This will be overwritten

export const createPet = `mutation CreatePet($input: CreatePetInput!) {
  createPet(input: $input) {
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
export const updatePet = `mutation UpdatePet($input: UpdatePetInput!) {
  updatePet(input: $input) {
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
export const deletePet = `mutation DeletePet($input: DeletePetInput!) {
  deletePet(input: $input) {
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
export const createPhoto = `mutation CreatePhoto($input: CreatePhotoInput!) {
  createPhoto(input: $input) {
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
export const updatePhoto = `mutation UpdatePhoto($input: UpdatePhotoInput!) {
  updatePhoto(input: $input) {
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
export const deletePhoto = `mutation DeletePhoto($input: DeletePhotoInput!) {
  deletePhoto(input: $input) {
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
export const createPhotoS3Info = `mutation CreatePhotoS3Info($input: CreatePhotoS3InfoInput!) {
  createPhotoS3Info(input: $input) {
    key
    width
    height
  }
}
`;
export const updatePhotoS3Info = `mutation UpdatePhotoS3Info($input: UpdatePhotoS3InfoInput!) {
  updatePhotoS3Info(input: $input) {
    key
    width
    height
  }
}
`;
export const deletePhotoS3Info = `mutation DeletePhotoS3Info($input: DeletePhotoS3InfoInput!) {
  deletePhotoS3Info(input: $input) {
    key
    width
    height
  }
}
`;
