module.exports = {
  generateError: (status, message) => {
    return {
      status,
      message
    }
  }
}
