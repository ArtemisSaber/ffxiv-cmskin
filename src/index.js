import { Message } from './components';
import dva from 'dva';
import createLoading from 'dva-loading';
import createHistory from 'history/createBrowserHistory';
import './index.scss';
import Console from './utils/console';
import Baidu from './utils/baiduPush';
import Debug from './utils/debug';

window.debug = false;

const ERROR_MSG_DURATION = 3; // 3 秒

// 1. Initialize
const app = dva({
  history: createHistory(),
  onError(e) {
    Message.error(e.message, ERROR_MSG_DURATION);
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/setting'));
app.model(require('./models/updateActData'));
app.model(require('./models/event'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

// 6. Other
if (process.env.NODE_ENV === 'development') {
  Debug();
} else {
  Console();
  Baidu();
}

window.changyan.api.config({
  appid: 'cytjdgeJ7',
  conf: 'prod_e0ae268a3629c862b8790af46e93c5cb',
});
