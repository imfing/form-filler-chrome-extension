const storage = chrome.storage.local;

function getLocalData(key) {
  return new Promise(resolve => {
    storage.get([key], function (result) {
      resolve(result)
    })
  })
}

const loadData = async function () {
  const res = await getLocalData('data');
  console.log(res)
  return JSON.parse(res['data']);
}

// Create context menu
function createMenu(data) {
  let menuContainer = document.createElement("div")
  menuContainer.setAttribute("id", "formMenu");
  menuContainer.style.display = "None";

  let menu = document.createElement("ul");
  for (const [key, value] of Object.entries(data)) {
    let item = document.createElement("li")
    item.innerHTML = key
    menu.appendChild(item);
  }

  menuContainer.appendChild(menu)

  return menuContainer;
}

loadData().then(data => {
  var menu = createMenu(data)
  document.body.appendChild(menu)

  document.body.addEventListener("click", () => {
    document.getElementById("formMenu").style.display = "None";
  }, false)

  setInterval(function () {
    var inputs = document.querySelectorAll('input,textarea')

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].oncontextmenu = function (event) {
        event.preventDefault();

        var ctxMenu = document.getElementById("formMenu");
        ctxMenu.style.display = "block";
        ctxMenu.style.left = (event.pageX + 5) + "px";
        ctxMenu.style.top = (event.pageY) + "px";

        var menu = ctxMenu.firstChild;
        Array.from(menu.children).forEach((child, index) => {
          child.onclick = function (e) {
            // e.stopPropagation()
            let key = child.innerHTML;
            event.target.value = data[key];
          }
        })
      }
    }
  }, 1000);
});

// Load custom CSS
var style = document.createElement('link');
style.rel = 'stylesheet';
style.type = 'text/css';
style.href = chrome.extension.getURL('css/menu.css');
(document.head || document.documentElement).appendChild(style);