// Provide a simpler way to write oneliner middleware that are only allowed to modify the request object
// Useful for configuring a shared context before a chain of route handlers

module.exports = function modifyRequest(modifier) {
  return async (req, res, next) => {
    await modifier(req);
    next(null);
  };
};
