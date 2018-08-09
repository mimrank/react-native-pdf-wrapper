export default {
  config: jest.fn(() => ({
    fetch: jest.fn(() => ({
      respInfo: {
        status: 200,
      },
    })),
  })),
  fs: {
    cp: jest.fn(),
    dirs: {
      CacheDir: '/path/to/cache/dir',
    },
    unlink: jest.fn(),
    writeFile: jest.fn(),
  },
};
