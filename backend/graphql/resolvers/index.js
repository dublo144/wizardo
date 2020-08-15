const taskResolver = require('./taskResolver');
const authResolver = require('./authResolver');
const projectResolver = require('./projectResolver');

const rootResolver = {
  ...taskResolver,
  ...authResolver,
  ...projectResolver
};

module.exports = rootResolver;
