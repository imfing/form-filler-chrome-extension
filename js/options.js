var storage = chrome.storage.local;

var editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
  mode: "application/json",
  lineNumbers: true,
  lineWrapping: true
});

function updateEditor() {
  storage.get(['data'], result => {
    editor.setValue(result.data)
  })
}

function init() {
  storage.get(null, function (items) {
    if (Object.keys(items).length == 0) {
      storage.set({ "data": '{\n  "name": "example"\n}' }, () => { updateEditor() })
    } else {
      updateEditor()
    }
  })
}

init();

var saveButton = document.getElementById("save");
saveButton.onclick = function() {
  let v = editor.doc.getValue()

  storage.set({ "data": v}, () => { 
    updateEditor()
  })

  console.log(v)
}