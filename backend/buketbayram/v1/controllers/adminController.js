exports.getStatus = async (req, res) => {
  try {
    res.status(200).json({
      status: true,
      message: req.t('admin.authorized'),
      data: {
        user: req.user
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
