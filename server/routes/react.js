/**
 * Created by lei_sun on 2018/1/12.
 */
import express from 'express';
import projectConfig from '../config/project';
import version from '../config/version';

var router = express.Router();

router.get('/', function(req, res) {
    res.render('react', { version: version, serverPrefix: projectConfig.serverPrefix });
});

export default router;