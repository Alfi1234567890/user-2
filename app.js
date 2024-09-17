// Simple login functionality
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Callback function for login validation
    validateLogin(username, password, (isValid) => {
        if (isValid) {
            // Redirect to main page
            window.location.href = "main.html";
        } else {
            document.getElementById('error').textContent = "Invalid login credentials!";
        }
    });
});

// Login validation function using callback
function validateLogin(username, password, callback) {
    if (username === "admin" && password === "12345") {
        callback(true);
    } else {
        callback(false);
    }
}

// On the main page, fetch todos from API and track completed tasks
if (window.location.pathname.includes('main.html')) {
    const todoList = document.getElementById('todoList');
    let completedCount = 0;

    // Fetch todos from API
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(todos => {
            todos.forEach(todo => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center';

                const label = document.createElement('label');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'me-2';
                checkbox.checked = todo.completed;

                // Mark checkbox functionality
                checkbox.addEventListener('change', function () {
                    if (this.checked) {
                        completedCount++;
                    } else {
                        completedCount--;
                    }
                    // Promise for completed tasks check
                    checkCompletedTasks(completedCount).then(message => {
                        if (message) {
                            alert(message);
                        }
                    });
                });

                label.appendChild(checkbox);
                label.appendChild(document.createTextNode(todo.title));
                li.appendChild(label);
                todoList.appendChild(li);
            });
        });

    // Promise to show alert when 5 tasks are completed
    function checkCompletedTasks(count) {
        return new Promise((resolve) => {
            if (count === 5) {
                resolve("Congrats. 5 Tasks have been Successfully Completed");
            } else {
                resolve(null);
            }
        });
    }
}

// Logout functionality
document.getElementById('logout')?.addEventListener('click', function () {
    window.location.href = "index.html";
});
