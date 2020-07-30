const hot="http://220.167.111.216:4847/common-web/";
const userInfoUrl="http://h5.cnncw.cn:8073/";
let config={
  findAllTypeByCondition:hot+'a/volunteerActivity/findAllTypeByCondition',//1预算经费来源类型, 4服务对象, 2志愿者保障, 3招募要求
  findAreaNameAndValue:hot+'a/data/findAreaNameAndValue',//服务区域
  findAllServiceSort:hot+'a/data/findAllServiceSort',//服务类别
  uploadAll:'http://mz.dprm.info/a/material/uploadAll',//媒资地址
  saveVolunteer:hot+'a/H5/volunteer/saveVolunteer',//注册志愿者
  findAllPolitics:hot+'a/data/findAllPolitics',//政治面貌查询
  findAllNation:hot+'a/data/findAllNation',//查询所有民族
  findCityByName:hot+'a/data/findCityByName',//根据上级名称查询所有省市区
  findAllDegree:hot+'a/data/findAllDegree',//查询所有学历
  findAllEmpState:hot+'a/data/findAllEmpState',//查询所有从业状态
  findAllServiceType:hot+'a/data/findAllServiceType',//查询所有志愿者类别(领域或行业信息)
  findCityByPName:'http://10.143.132.203:9090/common-web/a/data/findCityByPName',//查省市县
  findTreeList:hot+'a/organization/findTreeList',//查询区域镇村
  findAppUserType:hot+'a/H5/volunteer/findAppUserType',//判断是否为志愿者 判断用户类型
  findVolunteerTeamPageList:hot+'a/H5/volunteerTeam/findVolunteerTeamPageList',//团队申请 团队列表
  findDetailVolunteerTeamById:hot+'a/H5/volunteerTeam/findDetailVolunteerTeamById',//团队申请 团队详情
  saveVolunteerTeamMember:hot+'a/H5/volunteerTeam/saveVolunteerTeamMember',//申请加入志愿团队信息
  findVolunteer:hot+'a/H5/volunteer/findVolunteer',//志愿者详情
  judgeAppUserIsTeamMember:hot+'a/H5/volunteerTeam/judgeAppUserIsTeamMember',//判断该成员是否是该团队的成员
  saveVolunteerTeam:hot+'a/H5/volunteerTeam/saveVolunteerTeam',//保存志愿团队信息
  findAllCoreCompetentUnitType:hot+'a/data/findAllCoreCompetentUnitType',//主管单位类型
  findHelpOrderPageList:hot+'a/H5/helpOrder/findHelpOrderPageList',//求助订单列表
  saveHelpOrder:hot+'a/H5/helpOrder/saveHelpOrder',//保存求助订单
  findDetailHelpOrderById:hot+'a/H5/helpOrder/findDetailHelpOrderById',//求助订单详情
  lianxinHelp:hot+'a/H5/lianxin/lianxinHelp',//帮助他
  getStatisticsByUserId:userInfoUrl+'a/userRelation/getStatisticsByUserId',//两微一端获取用户信息
  findPageList:hot+'a/H5/order/findPageList',//点单列表
  orderDianzhan:hot+'a/H5/order/orderDianzhan',//点单点赞
  getById:hot+'a/H5/order/getById',//点单详情
  wfindPageList:hot+'a/H5/lianxin/findPageList',//微心愿列表
  wgetById:hot+'a/H5/lianxin/getById',//微心愿详情
  findActivityPageByCondition:hot+'a/h5/volunteerActivity/findActivityPageByCondition',//志愿活动列表
  findActivityById:hot+'a/h5/volunteerActivity/findActivityById',//志愿活动详情
  findActivityJoinByActivityId:hot+'a/h5/volunteerActivity/findActivityJoinByActivityId',//查询志愿活动的志愿者
  join:hot+'a/h5/volunteerActivity/join',//志愿活动 参加
  // add:hot+'a/h5/volunteerActivity/add',//新增志愿者活动--表单提交
  add:hot+'a/volunteerActivity/add',//新增志愿者活动--表单提交
  findVolunteerTeamSceneryPageList:hot+'a/H5/volunteerTeam/findVolunteerTeamSceneryPageList',//根据团队主键id查询团队风采列表
  findTeamMemberByVolunteerTeamId:hot+'a/H5/volunteerTeam/findTeamMemberByVolunteerTeamId',//查找团队成员列表
  zsfindPageList:hot+'a/H5/practice/findPageList',//实践阵地列表
  zsgetById:hot+'a/H5/practice/getById',//实践站所详情 id
  findAcceptTask:hot+'a/H5/volunteer/findAcceptTask',//接收的任务
  findPublishTask:hot+'a/H5/volunteer/findPublishTask',//发布的任务
  pageSearchAll:hot+'a/position-activity/pageSearchByExample',//阵地活动
  zdhdx:hot+'a/position-activity/find',//阵地活动详情
  lainxinHelpSure:hot+'a/H5/lianxin/lainxinHelpSure',//微心愿确认完成
  updateAndSendMessage:hot+'a/H5/helpOrder/updateAndSendMessage',//困难求助确认完成
  lainxinCommentComment:hot+'a/H5/lianxin/lainxinCommentComment',//微心愿评论
  saveHelpOrderComment:hot+'a/H5/helpOrder/saveHelpOrderComment',//保存求助订单评论
  saveComment:hot+'a/H5/comment/saveComment',//通用评论模块

};

export {config};
