var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var spanClose = document.createElement("SPAN");
    var txtClose = document.createTextNode("\u00D7");
    spanClose.className = "close";
    spanClose.appendChild(txtClose);

    var spanEdit = document.createElement("SPAN");
    var txtEdit = document.createTextNode("✎");
    spanEdit.className = "edit";
    spanEdit.appendChild(txtEdit);

    myNodelist[i].appendChild(spanClose);
    myNodelist[i].appendChild(spanEdit);
}

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTaskList() {
    const taskList = document.getElementById("myUL");
    taskList.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const listItem = document.createElement("li");
        const taskName = task.name;
        const taskDate = task.date;

        listItem.innerHTML = taskName + (taskDate ? " (" + taskDate + ")" : "") +
            " <span class='edit'>✎</span>" + "<span class='close'>\u00D7</span>";

        taskList.appendChild(listItem);
    }
}
document.addEventListener("DOMContentLoaded", function() {
    renderTaskList();
});


var close = document.getElementsByClassName("close");
for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    }
}


var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

function searchTasks() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('wyszukaj');
    filter = input.value.toLowerCase();
    ul = document.getElementById('myUL');
    li = ul.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
        const elem = li[i];
        let txtValue = elem.textContent.toLowerCase();
        txtValue = txtValue.replace("✎", "").replace("\u00D7", "");
        if (txtValue.includes(filter)) {
            elem.innerHTML = txtValue;
            elem.innerHTML = elem.textContent.replace(filter, "<span style='background-color: yellow'>" + filter + "</span>");
            elem.appendChild(createEditSpan());
            var spanClose = document.createElement("SPAN");
            var txtClose = document.createTextNode("\u00D7");
            spanClose.className = "close";
            spanClose.appendChild(txtClose);
            elem.appendChild(spanClose);
            spanClose.onclick = function() {
                var div = this.parentElement;
                div.style.display = "none";
            };

            elem.addEventListener("click", function() {
                editTask(elem);
            });
            elem.style.display = "block";
        }
        else {
            elem.style.display = "none";
        }
    }
}

function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var dateValue = document.getElementById("myDate").value;

    if (inputValue !== '') {
        var task = {
            name: inputValue,
            date: dateValue
        };

        tasks.push(task);

        localStorage.setItem("tasks", JSON.stringify(tasks));

        renderTaskList();

        document.getElementById("myInput").value = "";
        document.getElementById("myDate").value = "";

    } else {
        alert("You must write something!");
    }
}

function createEditSpan() {
    var spanEdit = document.createElement("SPAN");
    var txtEdit = document.createTextNode("✎");
    spanEdit.className = "edit";
    spanEdit.appendChild(txtEdit);

    return spanEdit;
}

function editTask(listItem) {
    var taskText = listItem.innerText.trim();
    var taskParts = taskText.split(/ - (.+)?/);
    var oldName = taskParts[0];
    var oldDate = taskParts[1] || '';
    oldName = oldName.replace("✎", "").replace("\u00D7", "").replace("\n\n", "");
    oldDate = oldDate.replace("✎", "").replace("\u00D7", "").replace("\n\n", "");

    var inputName = document.createElement("input");
    inputName.type = "text";
    inputName.value = oldName;

    var inputDate = document.createElement("input");
    inputDate.type = "date";
    inputDate.value = oldDate;

    var saveButton = document.createElement("button");
    saveButton.innerHTML = "Save";
    saveButton.onclick = function(e) {
        e.preventDefault();
        saveEditedTask(listItem, inputName, inputDate);
    };

    var cancelButton = document.createElement("button");
    cancelButton.innerHTML = "Cancel";
    cancelButton.onclick = function(e) {
        e.preventDefault();
        cancelEditTask(listItem, oldName, oldDate);
    };

    // Clear the existing content of the listItem
    listItem.innerHTML = '';

    // Add the input fields and buttons to the listItem
    listItem.appendChild(inputName);
    listItem.appendChild(inputDate);
    listItem.appendChild(saveButton);
    listItem.appendChild(cancelButton);

    // Set focus on the input field after adding it to the DOM
    inputName.focus();

    // Prevent the listItem from toggling the 'checked' class when clicked during editing
    listItem.removeEventListener("click", editTask);

    // Prevent the input fields from triggering the parent's click event
    inputName.addEventListener("click", function (e) {
        e.stopPropagation();
    });

    inputDate.addEventListener("click", function (e) {
        e.stopPropagation();
    });

    saveButton.addEventListener("click", function (e) {
        e.stopPropagation();
        saveEditedTask(listItem, inputName, inputDate);
    });

    cancelButton.addEventListener("click", function (e) {
        e.stopPropagation();
        cancelEditTask(listItem, oldName, oldDate);
    });
}




function saveEditedTask(listItem, inputName, inputDate) {
    var newName = inputName.value;
    var newDate = inputDate.value;

    if (newName !== '') {
        var newText = newName;
        if (newDate !== '') {
            newText += " - " + newDate;
        }

        var index = Array.from(listItem.parentNode.children).indexOf(listItem);
        tasks[index].name = newName;
        tasks[index].date = newDate;

        localStorage.setItem("tasks", JSON.stringify(tasks));

        listItem.innerHTML = newText;
        listItem.appendChild(createEditSpan());
        listItem.appendChild(createCloseSpan());

        listItem.addEventListener("click", function() {
            editTask(listItem);
        });

        listItem.querySelector(".edit").addEventListener("click", function(e) {
            e.stopPropagation(); // Prevents the "edit" click from triggering the parent's click event
            editTask(listItem);
        });

        listItem.querySelector(".close").addEventListener("click", function(e) {
            e.stopPropagation(); // Prevents the "close" click from triggering the parent's click event
            var div = this.parentElement;
            div.style.display = "none";
        });
    } else {
        alert("Task name cannot be empty!");
    }
}


function cancelEditTask(listItem, oldName, oldDate) {
    listItem.innerHTML = oldName + (oldDate ? " - " + oldDate : '');
    listItem.appendChild(createEditSpan());
    listItem.appendChild(createCloseSpan());

    listItem.addEventListener("click", function() {
        editTask(listItem);
    });
}

function createCloseSpan() {
    var spanClose = document.createElement("SPAN");
    var txtClose = document.createTextNode("\u00D7");
    spanClose.className = "close";
    spanClose.appendChild(txtClose);
    spanClose.onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    };
    return spanClose;
}




