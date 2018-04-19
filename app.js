/**
 * Created by lei_sun on 2018/2/13.
 */
process.env.NODE_ENV = 'production';
process.env.RELEASE = true;
require('./server.release');