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
import UserManage from './Management/Team/userManage';
import TeamManage from './Management/Team/teamManage';
import ProjectManage from './Management/Project/projectManage';
import MissionManage from './Management/Project/missionManage';
import CreateProjectForm from './Management/Project/createProjectForm';
import CreateMissionForm from './Management/Project/createMissionForm';
import StudyPathManage from './Management/StudyPath/StudyPathManage';
import CreateStudyPathForm from './Management/StudyPath/createStudyPathForm'
import StudyPathTasks from './Management/StudyPath/StudyPathTasks';
import CreateStudyPathTaskForm from './Management/StudyPath/createStudyPathTaskForm';
import ScheduleManage from './Management/Schedule/ScheduleManage';
import CreateScheduleForm from './Management/Schedule/CreateScheduleForm';
import UploadImage from './pages/UploadImage';
import ShopItems from './Shop/ShopItems'
import CreateShopItem from './Shop/CreateShopItem';
import Orders from "./Shop/Orders";
import MissionHomework from "./Management/Project/MissionHomework";

const WysiwygBundle = Loadable({ // 按需加载富文本配置
    loader: () => import('./ui/Wysiwyg'),
    loading: Loading,
});

export default {
    BasicTable, AdvancedTable, AsynchronousTable, Dashboard, WysiwygBundle,
    UserManage, TeamManage, ProjectManage, MissionManage,
    CreateProjectForm, CreateMissionForm, StudyPathManage,
    CreateStudyPathForm, StudyPathTasks, CreateStudyPathTaskForm,
    ScheduleManage, CreateScheduleForm, UploadImage,
    ShopItems, CreateShopItem, Orders, MissionHomework
}
