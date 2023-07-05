
const controller = {
  index: (req, res) => {
    const api = req.params.api || false;
    if (!api) {
      return res.render('home')
    }
    return res.json('home')
  }
};
module.exports = controller;
