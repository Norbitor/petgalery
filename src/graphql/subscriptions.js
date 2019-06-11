// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreatePet = `subscription OnCreatePet {
  onCreatePet {
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
export const onUpdatePet = `subscription OnUpdatePet {
  onUpdatePet {
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
export const onDeletePet = `subscription OnDeletePet {
  onDeletePet {
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
export const onCreatePhoto = `subscription OnCreatePhoto {
  onCreatePhoto {
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
export const onUpdatePhoto = `subscription OnUpdatePhoto {
  onUpdatePhoto {
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
export const onDeletePhoto = `subscription OnDeletePhoto {
  onDeletePhoto {
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
export const onCreatePhotoS3Info = `subscription OnCreatePhotoS3Info {
  onCreatePhotoS3Info {
    key
    width
    height
  }
}
`;
export const onUpdatePhotoS3Info = `subscription OnUpdatePhotoS3Info {
  onUpdatePhotoS3Info {
    key
    width
    height
  }
}
`;
export const onDeletePhotoS3Info = `subscription OnDeletePhotoS3Info {
  onDeletePhotoS3Info {
    key
    width
    height
  }
}
`;
