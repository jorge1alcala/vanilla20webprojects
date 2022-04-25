const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');
const loader = document.getElementById('loader');
let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  //   console.log(user.name.first);

  //   console.log(user.picture.medium);
  const userData = {
    name: `${user.name.first} ${user.name.last}`,
    picture: `${user.picture.thumbnail}`,
    money: Math.floor(Math.random() * 1000000),
  };
  console.log(userData);
  addData(userData);
  updateDOM();
  loading();
}

function addData(obj) {
  data.push(obj);
  updateDOM();
}

function doubleMonay() {
  data = data.map(function (user) {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}
function loading() {
  loader.hidden = true;
}

function updateDOM(providedData = data) {
  // To clear the DOM
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
  providedData.forEach((user) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<img class="picture" src="${user.picture}"><strong>${
      user.name
    }</strong> ${formatMoney(user.money)}`;
    // event listener, check when each finish loading
    // element.addEventListener('load', loading);
    main.appendChild(element);
  });
  loading();
}

function formatMoney(num) {
  return '$' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMonay);
