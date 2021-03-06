export default {
    menus: [ // 菜单相关路由
        { key: '/app/dashboard/index', title: '首页', icon: 'mobile', component: 'Dashboard'},
        {
            key: '/app/manage', title: '管理', icon: 'appstore',
            subs: [
                { key: '/app/dashboard/users', title: '用户管理', icon: 'user', component: 'UserManage' },
                { key: '/app/dashboard/cp_teams', title: 'CP管理', icon: 'user-add', component: 'CPTeamManage' },
                { key: '/app/dashboard/projects', title: '项目管理', icon: 'project', component: 'ProjectManage'},
                { key: '/app/dashboard/studyPath', title: '路径管理', icon: 'stock', component: 'StudyPathManage'},
                { key: '/app/dashboard/schedule', title: '日程管理', icon: 'calendar', component: 'ScheduleManage'},
                { key: '/app/dashboard/homework', title: '作业管理', icon: 'code', component: 'MissionHomework'},
                { key: '/app/dashboard/articles', title: '文章管理', icon: 'folder', component: 'ArticleManage'},
                { key: '/app/dashboard/teams', title: '组队管理', icon: 'team', component: 'TeamManage' },
                { key: '/app/dashboard/groups', title: '自学团管理', icon: 'usergroup-add', component: 'GroupManage' },
                { key: '/app/dashboard/banners', title: '轮播图管理', icon: 'picture', component: 'BannerManage' },
                { key: '/app/dashboard/clocks', title: '打卡管理', icon: 'carry-out', component: 'ClockManage' },
                { key: '/app/dashboard/tags', title: '标签管理', icon: 'crown', component: 'TagManage' },
            ]
        },
        {
            key: '/app/mall', title: '商城', icon: 'shop',
            subs: [
                { key: '/app/dashboard/shop', title: '兑换商品', icon: 'shopping', component: 'ShopItems' },
                { key: '/app/dashboard/addShopItem', title: '添加商品', icon: 'folder-add', component: 'CreateShopItem' },
                { key: '/app/dashboard/orders', title: '所有订单', icon: 'book', component: 'Orders' },
            ]
        },
        { key: '/app/dashboard/upload', title: '上传', icon: 'upload', component: 'UploadImage'},
        // {
        //     key: '/app/ui', title: 'UI', icon: 'scan',
        //     subs: [
        //         { key: '/app/ui/buttons', title: '按钮', component: 'Buttons'},
        //         { key: '/app/ui/icons', title: '图标', component: 'Icons'},
        //         { key: '/app/ui/spins', title: '加载中', component: 'Spins'},
        //         { key: '/app/ui/modals', title: '对话框', component: 'Modals'},
        //         { key: '/app/ui/notifications', title: '通知提醒框', component: 'Notifications'},
        //         { key: '/app/ui/tabs', title: '标签页', component: 'Tabs'},
        //         { key: '/app/ui/banners', title: '轮播图', component: 'Banners'},
        //         { key: '/app/ui/wysiwyg', title: '富文本', component: 'WysiwygBundle'},
        //         { key: '/app/ui/drags', title: '拖拽', component: 'Drags'},
        //         { key: '/app/ui/gallery', title: '画廊', component: 'Gallery'},
        //         { key: '/app/ui/map', title: '地图', component: 'MapUi'},
        //     ],
        // },
        // {
        //     key: '/app/animation', title: '动画', icon: 'rocket',
        //     subs: [
        //         { key: '/app/animation/basicAnimations', title: '基础动画', component: 'BasicAnimations'},
        //         { key: '/app/animation/exampleAnimations', title: '动画案例', component: 'ExampleAnimations'},
        //     ],
        // },
        {
            key: '/app/table', title: '表格', icon: 'copy',
            subs: [
                { key: '/app/table/basicTable', title: '基础表格', component: 'BasicTable'},
                { key: '/app/table/advancedTable', title: '高级表格', component: 'AdvancedTable'},
                { key: '/app/table/asynchronousTable', title: '异步表格', component: 'AsynchronousTable'},
            ],
        },
        // {
        //     key: '/app/form', title: '表单', icon: 'edit',
        //     subs: [
        //         { key: '/app/form/basicForm', title: '基础表单', component: 'BasicForm'},
        //     ],
        // },
        // {
        //     key: '/app/chart', title: '图表', icon: 'area-chart',
        //     subs: [
        //         { key: '/app/chart/echarts', title: 'echarts', component: 'Echarts' },
        //         { key: '/app/chart/recharts', title: 'recharts', component: 'Recharts' },
        //     ],
        // },
        // {
        //     key: '/subs4', title: '页面', icon: 'switcher',
        //     subs: [
        //         { key: '/login', title: '登录' },
        //         { key: '/404', title: '404' },
        //     ],
        // },
        // {
        //     key: '/app/auth', title: '权限管理', icon: 'safety',
        //     subs: [
        //         { key: '/app/auth/basic', title: '基础演示', component: 'AuthBasic' },
        //         { key: '/app/auth/routerEnter', title: '路由拦截', component: 'RouterEnter', auth: 'auth/testPage' },
        //     ],
        // },
        // {
        //     key: '/app/cssModule', title: 'cssModule', icon: 'star', component: 'Cssmodule'
        // },
        // {
        //     key: '/app/extension', title: '功能扩展', icon: 'bars',
        //     subs: [
        //         { key: '/app/extension/queryParams', title: '问号形式参数', component: 'QueryParams', query: '?param1=1&param2=2' },
        //     ],
        // },
    ],
    others: [] // 非菜单相关路由
}
