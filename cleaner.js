function reflex_agent(location, state) {
    if (state == "DIRTY") return "CLEAN";
    else if (location == "A") return Math.random() < 0.5 ? "RIGHT" : "LEFT"; // Aleatoriedad en la decisión
    else if (location == "B") return Math.random() < 0.5 ? "LEFT" : "RIGHT"; // Aleatoriedad en la decisión
}

function test(states, visitedStates) {
    var currentState = states.join(",");

    if (!visitedStates.has(currentState)) {
        visitedStates.add(currentState);
        document.getElementById("log").value += `Nuevo estado: ${currentState} (${visitedStates.size})\n`;
    }

    var location = states[0];
    var state = states[0] == "A" ? states[1] : states[2];
    var otherRoomState = states[0] == "A" ? states[2] : states[1];
    var action_result = reflex_agent(location, state);
    document.getElementById("log").value += `Ubicación: ${location} | Acción: ${action_result} | Otro estado: ${otherRoomState}\n`;

    if (action_result == "CLEAN") {
        if (location == "A") states[1] = "CLEAN";
        else if (location == "B") states[2] = "CLEAN";
    } else if (action_result == "RIGHT") states[0] = "B";
    else if (action_result == "LEFT") states[0] = "A";

    // Ensuciar habitaciones con probabilidad
    if (Math.random() < 0.3) {
        states[1] = "DIRTY";
        document.getElementById("log").value += `¡La habitación A se ensució!\n`;
    }
    if (Math.random() < 0.3) { 
        states[2] = "DIRTY";
        document.getElementById("log").value += `¡La habitación B se ensució!\n`;
    }

    if (visitedStates.size === 8) {
        document.getElementById("log").value += `¡Cada estado posible ha sido visitado!\n`;
        return; 
    }

    setTimeout(function() { test(states, visitedStates); }, 2000);
}

// Estado inicial aleatorio
var states = [
    "A", 
    Math.random() < 0.5 ? "DIRTY" : "CLEAN", 
    Math.random() < 0.5 ? "DIRTY" : "CLEAN"
];
var visitedStates = new Set();
test(states, visitedStates);
