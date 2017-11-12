module.exports = fn => async (req, res, ...opts) => {
  try {
    await fn (req, res, opts)
  }
  catch (err) {
    console.log(err)
    const status = err.status || 500
    res.status(status).json({
      status,
      message: err.message,
      details: err.details || {}
    })
  }
}
