const {OAuth2Client} = require('google-auth-library');

const redirectUrl = `http://localhost:${process.env.PORT}/auth/google/callback`;

const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    redirectUrl
);

exports.generateAuthUrl = () => {
    const emailScopeUrl = 'https://www.googleapis.com/auth/userinfo.email';
    const profileScopeUrl = 'https://www.googleapis.com/auth/userinfo.profile';

    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: `${profileScopeUrl} ${emailScopeUrl} openid`,
        prompt: 'consent'
    });

    return authUrl;
};

exports.getUserProfile = async(code) => {
    const tokenResponse = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokenResponse.tokens);
    
    const user = oAuth2Client.credentials;
    const res = await fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${user.access_token}`
    );
    
    const data = await res.json();
    return {...data, id: data.sub};
};