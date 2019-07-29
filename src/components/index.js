/**
 * 路由组件出口文件
 * yezi 2018年6月24日
 */
import Loadable from 'react-loadable';
import Loading from './widget/Loading';
import BasicTable from './tables/BasicTables';
import AdvancedTable from './tables/AdvancedTables';
import AsynchronousTable from './tables/AsynchronousTable';
import Dashboard from './dashboard/Dashboard';
import AuthBasic from './auth/Basic';
import RouterEnter from './auth/RouterEnter';
import UserManage from './Management/userManage';
import TeamManage from './Management/teamManage';
import ProjectManage from './Management/teamManage';

const WysiwygBundle = Loadable({ // 按需加载富文本配置
    loader: () => import('./ui/Wysiwyg'),
    loading: Loading,
});

export default {
    BasicTable, AdvancedTable, AsynchronousTable,
    Dashboard, AuthBasic, RouterEnter, WysiwygBundle,
    UserManage, TeamManage, ProjectManage
}
