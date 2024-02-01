
document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("tasks");
    const newTaskInput = document.getElementById("new-task");
    const addTaskButton = document.getElementById("add-task");

    addTaskButton.addEventListener("click", function () {
        const taskText = newTaskInput.value.trim();
        if (taskText !== "") {
            const taskItem = document.createElement("li");
            taskItem.textContent = taskText;
            const markAsDoneButton = document.createElement("button");
            markAsDoneButton.textContent = "Mark as Done";
            markAsDoneButton.className = "mark-as-done"; // Use consistent class name
            taskItem.appendChild(markAsDoneButton);
            taskList.appendChild(taskItem);
            newTaskInput.value = "";
        }
    });

    // Toggle task's done status
    taskList.addEventListener("click", function (e) {
        if (e.target.classList.contains("mark-as-done")) {
            toggleTaskDone(e.target);
        }
    });

    // Function to toggle task's done status
    function toggleTaskDone(button) {
        button.parentElement.classList.toggle('task-done');
    }

    // Initialize the Google API Client
    gapi.load('client', function () {
        gapi.client.init({
            apiKey: 'AIzaSyCkQCMSh9Xx2PUwhdw6NarA-9eC2ZF-FOU',
            clientId: '306064738078-puq8267fhgkanvnja4sun6s3566qacab.apps.googleusercontent.com',
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
            scope: 'https://www.googleapis.com/auth/calendar.readonly'
        }).then(function () {
            // API is ready for use, you can add your calendar integration code here
            fetchCalendarEvents(); // Call the function to fetch and display calendar events
        }).catch(function (error) {
            console.error('Error initializing Google API Client:', error);
        });
    });

    // Function to fetch and display calendar events
    function fetchCalendarEvents() {
        gapi.client.calendar.events.list({
            'calendarId':'8b56fcef6786cefb44194b79e4fadd4e82748bf54bf6a13be89cb4d201d8333d@group.calendar.google.com', 
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        }).then(function (response) {
            const events = response.result.items;
            const eventList = document.getElementById('event-list');
            eventList.innerHTML = '';

            if (events.length > 0) {
                events.forEach(function (event) {
                    const eventItem = document.createElement('li');
                    const startDate = new Date(event.start.dateTime || event.start.date);
                    const endDate = new Date(event.end.dateTime || event.end.date);

                    eventItem.innerHTML = `<strong>${event.summary}</strong><br>
                        <em>${startDate.toLocaleString()} - ${endDate.toLocaleString()}</em><br>
                        ${event.description || 'No description available'}`;

                    eventList.appendChild(eventItem);
                });
            } else {
                eventList.innerHTML = '<li>No upcoming events found.</li>';
            }

            function createCourseInputs() {
                const numberOfCourses = document.getElementById('number-of-courses').value;
                const form = document.getElementById('course-details-form');
                form.innerHTML = ''; // Clear existing fields
            
                for (let i = 1; i <= numberOfCourses; i++) {
                    const fieldset = document.createElement('fieldset');
                    fieldset.className = 'course-fieldset';
            
                    const legend = document.createElement('legend');
                    legend.textContent = `Course ${i}`;
            
                    const titleLabel = document.createElement('label');
                    titleLabel.textContent = 'Course Title: ';
                    const titleInput = document.createElement('input');
                    titleInput.type = 'text';
                    titleInput.name = `course-title-${i}`;
                    titleInput.required = true;
            
                    const descLabel = document.createElement('label');
                    descLabel.textContent = 'Description: ';
                    const descInput = document.createElement('textarea');
                    descInput.name = `course-desc-${i}`;
            
                    fieldset.appendChild(legend);
                    fieldset.appendChild(titleLabel);
                    fieldset.appendChild(titleInput);
                    fieldset.appendChild(descLabel);
                    fieldset.appendChild(descInput);
            
                    form.appendChild(fieldset);
                }
            
                form.style.display = 'block';
            }
            
        });
    }
});
