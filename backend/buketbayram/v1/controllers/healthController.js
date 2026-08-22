exports.getHealth = async (req, res) => {
  try {
    res.status(200).json({
      status: true,
      message: req.t('health.ready'),
      data: {
        service: 'buketbayram-api',
        version: 'v1',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: req.t('errors.server_error')
    });
  }
};
