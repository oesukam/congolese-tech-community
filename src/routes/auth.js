import express from 'express';
import passport from '../config/passport';
import Auth from '../controllers/auth';

const router = express.Router();

router.route('/google')
    .get(passport.authenticate(
        'google',
        {
            scope:
                ['email',
                    'profile'],
        },
    ));

router.route('/google/redirect').get(passport.authenticate('google'), Auth.socialAuth);

export default router;
