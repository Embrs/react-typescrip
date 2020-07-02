import { Post } from 'plugins/api/instance';
import apiRouter from 'plugins/api/router';

const SignIn = (param: object) => Post(apiRouter.SIGNIN, param, null);

export default { SignIn };
