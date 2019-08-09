/**
 * 路由组件出口文件
 * doonnoop 2019年8月8日
 */
import Loadable from 'react-loadable';
import Loading from './widget/Loading';
import BasicTable from './tables/BasicTables';
import AdvancedTable from './tables/AdvancedTables';
import AsynchronousTable from './tables/AsynchronousTable';
import Dashboard from './dashboard/Dashboard';
import UserManage from './Management/userManage';
import TeamManage from './Management/teamManage';
import ProjectManage from './Management/projectManage';
import MissionManage from './Management/missionManage';
import CreateProjectForm from './Management/createProjectForm';
import CreateMissionForm from './Management/createMissionForm';
import StudyPathManage from './Management/StudyPathManage';
import CreateStudyPathForm from './Management/createStudyPathForm'
import StudyPathTasks from './Management/StudyPathTasks';
import CreateStudyPathTaskForm from './Management/createStudyPathTaskForm'

const WysiwygBundle = Loadable({ // 按需加载富文本配置
    loader: () => import('./ui/Wysiwyg'),
    loading: Loading,
});

export default {
    BasicTable, AdvancedTable, AsynchronousTable, Dashboard, WysiwygBundle,
    UserManage, TeamManage, ProjectManage, MissionManage,
    CreateProjectForm, CreateMissionForm, StudyPathManage,
    CreateStudyPathForm, StudyPathTasks, CreateStudyPathTaskForm
}
