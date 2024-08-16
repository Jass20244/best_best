const axios = require('axios');
const querystring = require('querystring');

exports.redirectToUpstox = (req, res) => {
  const url = `https://api.upstox.com/login/oauth/authorize?client_id=${process.env.UPSTOX_API_KEY}&redirect_uri=${process.env.REDIRECT_URL}&response_type=code`;
  res.redirect(url);
};

exports.handleOAuthCallback = async (req, res) => {
  const code = req.query.code;

  try {
    const response = await axios.post('https://api.upstox.com/login/oauth/token', querystring.stringify({
      code: code,
      client_id: process.env.UPSTOX_API_KEY,
      client_secret: process.env.UPSTOX_API_SECRET,
      redirect_uri: process.env.REDIRECT_URL,
      grant_type: 'authorization_code'
    }));

    const { access_token, refresh_token } = response.data;

    // Store tokens in the database
    res.json({ success: true, access_token, refresh_token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
