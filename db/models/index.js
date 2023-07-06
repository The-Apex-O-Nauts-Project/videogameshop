

module.exports = {
  ...require("./user"),
  ...require("./product"),
  ...require("./carts"),
  ...require("./cartItem")
};

// then, in your API, you'll require the appropriate model
// and use its database connectors
// ie User.getUserById(), where user.js had a module.exports
// that looked like this: module.exports = { getUserById, ... }
