/**
 * Created by Taryn on 2019/7/30.
 * 接口地址配置文件
 */

//easy-mock模拟数据接口地址
const EASY_MOCK = 'https://www.easy-mock.com/mock';
const MOCK_AUTH = EASY_MOCK + '/597b5ed9a1d30433d8411456/auth'; // 权限接口地址
export const MOCK_AUTH_ADMIN = MOCK_AUTH + '/admin'; // 管理员权限接口
export const MOCK_AUTH_VISITOR = MOCK_AUTH + '/visitor' // 访问权限接口

// github授权
export const GIT_OAUTH = 'https://github.com/login/oauth';
// github用户
export const GIT_USER = 'https://api.github.com/user';

// bbc top news
export const NEWS_BBC = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=429904aa01f54a39a278a406acf50070';

const URL = 'https://api.bangneedu.com';
export const USER_LOGIN = URL + '/login';
export const USER_PROFILE = URL + '/user';
export const ALL_USERS = URL + '/allUser';
export const CP_TEAM = URL + '/cpMatching';
export const CP_ADMIN = URL + '/cpAdmin';
export const PROJECTS = URL + '/project';
export const UPLOAD = URL + '/upload';
export const PROJECT_TASK = URL + '/projectTask';
export const STUDY_PATH = URL + '/learningPath';
export const STUDY_PATH_DETAILS = URL + '/learningPathDetails';
export const SCHEDULE = URL + '/schedule';
export const COMMODITY = URL + '/commodity';
export const ORDERS = URL + '/orderForm';
export const PROJECTWORK = URL + '/projectWork';
export const PROJECT_TEAM = URL + '/projectTeam';
export const ARTICLES = URL + '/article';
export const BANNER = URL + '/carouselImage';
export const GROUP = URL + '/learningPathTeam';
export const CLOCK = URL + '/punchTheClock';
export const TAG = URL + '/tag';
