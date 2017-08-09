import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'lyf.jpg',
    name: '赵灵儿'
  }
];

const Users = [];

for (let i = 0; i <100; i++) {
  //根据模板模拟生成数据并将数据存入users中
  Users.push(Mock.mock({
    // 随机生成一个 GUID
    id: Mock.Random.guid(),
    // 随机生成一个常见的中文姓名
    name: Mock.Random.cname(),
    // 返回一个随机的中国城市
    addr: Mock.mock('@county(true)'),
    // 返回一个在18-60之间的整数
    'age|18-60': 1,
    // 返回一个随机的日期字符串
    birth: Mock.Random.date(),
    // 返回一个随机的整数
    sex: Mock.Random.integer(0, 1)
  }));
}

export { LoginUsers, Users };