var events = [];
function resetEvents() {
    events.length = 0;
}
function addEvent(func) {
    events.push(func); // when the function returns true, the event stops running
}

function updateEvents() {
    for (var i = 0; i < events.length; i++) {
        if (events[i]()) {
            events.splice(i, 1);
            i--;
        }
    }
}