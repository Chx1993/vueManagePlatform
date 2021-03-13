import Mock from 'mockjs'

let List = []
const count = 1000
let typelist = ['联通', '移动', '电信', '铁通']
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    sortnum: i + 1,
    username: Mock.Random.cname(),
    address: Mock.mock('@county(true)'),
    createTime: Mock.Random.datetime(),
    updateTime: Mock.Random.now(),
    ip: Mock.mock('@ip'),
    region: Mock.mock('@region'),
    areaId: /\d{7}/,
    email: Mock.Random.email(),
    'isp|1': typelist
  }))
}

let users = {
  code:0,
  data:[
    {
      id:1,
      usertitle: '管理员',
      username: 'admin',
      password: '123456',
      roles: ['admin'],
      token: 'admin',
      avatar: '../../static/img/avatar.png'
    },{
      id:2,
      usertitle: '编辑',
      username: 'editor',
      password: '112233',
      roles: ['editor'],
      token: 'editor',
      avatar:'../../static/img/avatar.png'
    },
  ]
}

export default {
  // 用户登录
  login: config => {
    let data = JSON.parse(config.body);

    let flag = false;
    let localToken='';
    let localName='';

    for(let value of users.data){
      if((data.username === value.username)&&(data.username === value.username)){
        console.log('密码正确')
        flag = !flag
        localToken = value.token
        localName = value.username
      }
    }
    if(flag){
      flag = !flag
      return {
        code: 200,
        data: {
          userInfo: {
            token: localToken,
            name: localName,
          },
          status: 'success'
        }
      }    
    }else {
      return {
        code: -1,
        data: {
          msg: "用户名错误",
          status: 'fail'
        }
      }
    }
  },
  // 用户登出
  logout: config => {
    return {
      code: 200,
      data: {
        userList: ""
      }
    }
  },
  // 获取登录用户信息
  getUserInfo: config => {
    let data = JSON.parse(config.body);
    let flag = false;
    let localroles='';
    let localName='';
    let localAvatar='';

      
    for(let value of users.data){
      if (data.token === value.token) {
        console.log('密码正确')
        flag = !flag
        localroles = value.roles;
        localName = value.username;
        localAvatar = value.avatar;
      }
    }

    if(flag){
      flag = !flag
      return {
        code: 200,
        data: {
          userInfo: {
            roles: localroles,
            name: localName,
            avatar: localAvatar,
          }
        }
      }
    }else {
      console.log('data',data)
      console.log('value',value)
      console.log('后台验证到token过期')
      return {
        code: 401,
        data: {
          userInfo: {
            
          }
        }
      }
    }
  },

  /**
   * 获取用户列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getUserList: config => {
    const {
      limit,
      page
    } = JSON.parse(config.body);
    let mockList = List;
    const userList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 200,
      data: {
        total: mockList.length,
        userList: userList
      }
    }
  }
}
