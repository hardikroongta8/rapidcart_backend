const db = require("../utils/db-config");
const { getUserProfile, generateAuthUrl } = require("../utils/google-auth-config");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt-config");

exports.googleAuthHandler = (req, res, next) => {
    res.header('Referrer-Policy', 'no-referrer-when-downgrade');
    const url = generateAuthUrl();
    res.json({url});
};

exports.logout = (req, res, next) => {
    res.clearCookie('refreshToken', {
        path: '/auth/regenerate_access_token'
    });
    res.clearCookie('accessToken');
    res.json({message: "Successfully logged out."});
};

exports.regenerateAccessToken = (req, res, next) => {
    const accessToken = generateAccessToken({googleId: req.user.googleId});
    res.cookie('accessToken', accessToken, {
        maxAge: 15*60*1000,
        sameSite: "none",
        secure: false,
        httpOnly: true
    });
    res.json({message: 'Successfully regenerated access token.'});
};

exports.googleCallbackHandler = async(req, res, next) => {
    const profile = await getUserProfile(req.query.code);

    const queryResults = await db.query(
        'select * from users where id = $1',
        [profile.id]
    );

    if(queryResults.rowCount == 0){
        await db.query(
            'insert into users (id, firstname, lastname, email) values ($1, $2, $3, $4) returning *', 
            [profile.id, profile.given_name, profile.family_name, profile.email]
        );
    }else{
        await db.query(
            'update users set firstname = $1, lastname = $2 where id = $3 returning *',
            [profile.given_name, profile.family_name, profile.id]
        );
    }

    const accessToken = generateAccessToken({googleId: profile.id});
    const refreshToken = generateRefreshToken({googleId: profile.id});

    res.cookie('refreshToken', refreshToken, {
        maxAge: 15*24*60*60*1000,
        sameSite: "none",
        path: "/auth/regenerate_access_token",
        secure: false,
        httpOnly: true,
        signed: true
    });

    res.cookie('accessToken', accessToken, {
        maxAge: 15*60*1000,
        sameSite: "none",
        secure: false,
        httpOnly: true
    });

    res.redirect(`http://localhost:3000`);
};