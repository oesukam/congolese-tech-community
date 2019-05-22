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

router.route('/facebook')
    .get(passport.authenticate('facebook'));

router.route('/facebook/redirect').get(passport.authenticate('facebook', { scope: ['email'] }), Auth.socialAuth);

router.route('/github')
    .get(passport.authenticate('github'));

router.route('/github/redirect').get(passport.authenticate('github'), Auth.socialAuth);

export default router;
