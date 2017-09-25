var newRoute = [];

dataTemplate = [
  {
    from: 1,
    to: 2
  },
  {
    from: 2,
    to: 3
  },
  {
    from: 0,
    to: 1
  },
  {
    from: 4,
    to: 5
  },
  {
    from: 3,
    to: 4
  },
  {
    from: 5,
    to: 6
  },
  {
    from: 6,
    to: 7
  },
  {
    from: 8,
    to: 9
  },
  {
    from: 7,
    to: 8
  }
];

function shuffle(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}

for (let k = 0; k <= 10; k++) {
  console.log("<--------------START-------------->");

  var data = dataTemplate.slice();

  var newRoute = [];

  shuffle(data);

  console.dir(data);

  newRoute.push(data.shift());

  var duration = data.length;

  while (newRoute.length <= duration) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].from == newRoute[newRoute.length - 1].to) {
        newRoute.push(data[i]);
        data.splice(i, 1);
      } else if (data[i].to == newRoute[0].from) {
        newRoute.unshift(data[i]);
        data.splice(i, 1);
      }
    }
  }

  console.log(newRoute);

  console.log("<--------------END-------------->");
}

console.log(newRoute);
