const os = require('os');
console.log("시스템의 host name : %s " , os.hostname());
console.log("시스템의 메모리 : %d ",os.freemem(),os.totalmem());
console.log("시스템의 CPU 정보 \n");
console.dir(os.cpus());
console.log("시스템의 네트워크 인터페이스 정보\n");
console.dir(os.networkInterfaces());

/* 실행결과 
시스템의 host name : DESKTOP-B85OHSN 
시스템의 메모리 : 1525297152  8502087680
시스템의 CPU 정보

[
  {
    model: 'Intel(R) Core(TM) i5-6500 CPU @ 3.20GHz',
    speed: 3192,
    times: {
      user: 9751187,
      nice: 0,
      sys: 14451734,
      idle: 232414609,
      irq: 488968
    }
  },
  {
    model: 'Intel(R) Core(TM) i5-6500 CPU @ 3.20GHz',
    speed: 3192,
    times: {
      user: 13785015,
      nice: 0,
      sys: 18060765,
      idle: 224771531,
      irq: 95390
    }
  },
  {
    model: 'Intel(R) Core(TM) i5-6500 CPU @ 3.20GHz',
    speed: 3192,
    times: {
      user: 11378781,
      nice: 0,
      sys: 14629390,
      idle: 230609125,
      irq: 80406
    }
  },
  {
    model: 'Intel(R) Core(TM) i5-6500 CPU @ 3.20GHz',
    speed: 3192,
    times: {
      user: 11800265,
      nice: 0,
      sys: 14013562,
      idle: 230803484,
      irq: 65078
    }
  }
]
시스템의 네트워크 인터페이스 정보

{
  '이더넷': [
    {
      address: 'fe80::d4bb:27be:af91:f657',
      netmask: 'ffff:ffff:ffff:ffff::',
      family: 'IPv6',
      mac: '24:f5:aa:ea:2c:47',
      internal: false,
      cidr: 'fe80::d4bb:27be:af91:f657/64',
      scopeid: 13
    },
    {
      address: '192.168.0.45',
      netmask: '255.255.255.0',
      family: 'IPv4',
      mac: '24:f5:aa:ea:2c:47',
      internal: false,
      cidr: '192.168.0.45/24'
    }
  ],
  'Loopback Pseudo-Interface 1': [
    {
      address: '::1',
      netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
      family: 'IPv6',
      mac: '00:00:00:00:00:00',
      internal: true,
      cidr: '::1/128',
      scopeid: 0
    },
    {
      address: '127.0.0.1',
      netmask: '255.0.0.0',
      family: 'IPv4',
      mac: '00:00:00:00:00:00',
      internal: true,
      cidr: '127.0.0.1/8'
    }
  ]
}*/