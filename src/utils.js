export const FILE_TYPES = {
  REMOTE: 'REMOTE',
  LOCAL: 'LOCAL',
  BASE64: 'BASE64',
};

export const getFileType = ({ uri } = {}) => {
  if (!uri) {
    return null;
  }

  if (uri.match(/^https?:\/\//)) {
    return FILE_TYPES.REMOTE;
  }

  if (uri.match(/^bundle-assets:\/\//)) {
    return FILE_TYPES.LOCAL;
  }

  if (uri.match(/^data:application\/pdf;base64/)) {
    return FILE_TYPES.BASE64;
  }

  return null;
};

export const isRequestSuccessful = ({ respInfo }) => [200, 304].includes(respInfo.status);
