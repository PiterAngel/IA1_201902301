function reflex_agent(location, state) {
    if (state == "DIRTY") return "CLEAN";
    else if (location == "A") return Math.random() < 0.5 ? "RIGHT" : "LEFT"; // Aleatoriedad en la decisión
    else if (location == "B") return Math.random() < 0.5 ? "LEFT" : "RIGHT"; // Aleatoriedad en la decisión
}

function test(states, visitedStates) {
    var currentState = states.join(",");

    // Check if the current state is new
    if (!visitedStates.has(currentState)) {
        visitedStates.add(currentState);
        document.getElementById("log").value += `🌟 Nuevo estado alcanzado: ${currentState} (${visitedStates.size}/8)\n`;
    }

    // Log the current location and action
    var location = states[0];
    var state = states[0] == "A" ? states[1] : states[2];
    var otherRoomState = states[0] == "A" ? states[2] : states[1];
    var action_result = reflex_agent(location, state);

    // Add dynamic log messages for actions
    let actionMessage = "";
    if (action_result === "CLEAN") {
        actionMessage = `🧹 Limpieza realizada en la habitación ${location}.`;
    } else if (action_result === "RIGHT") {
        actionMessage = `➡️ Moviéndose hacia la habitación B.`;
    } else if (action_result === "LEFT") {
        actionMessage = `⬅️ Moviéndose hacia la habitación A.`;
    }

    document.getElementById("log").value += `📍 Habitación: ${location} | Realizando: ${action_result} | Otro estado: ${otherRoomState}\n${actionMessage}\n`;

    // Perform the action
    if (action_result == "CLEAN") {
        if (location == "A") states[1] = "CLEAN";
        else if (location == "B") states[2] = "CLEAN";
    } else if (action_result == "RIGHT") states[0] = "B";
    else if (action_result == "LEFT") states[0] = "A";

    // Simulate rooms getting dirty randomly
    if (Math.random() < 0.3) {
        states[1] = "DIRTY";
        document.getElementById("log").value += `⚠️ ¡La habitación A se ensució nuevamente!\n`;
    }
    if (Math.random() < 0.3) {
        states[2] = "DIRTY";
        document.getElementById("log").value += `⚠️ ¡La habitación B se ensució nuevamente!\n`;
    }

    // Check if all 8 states have been visited
    if (visitedStates.size === 8) {
        document.getElementById("log").value += `✅ ¡Cada estado posible ha sido visitado! Finalizando ejecución.\n`;
        return; // Stop the execution
    }

    // Continue testing after a delay
    setTimeout(function () {
        test(states, visitedStates);
    }, 2000);
}

// Estado inicial aleatorio
var states = [
    "A",
    Math.random() < 0.5 ? "DIRTY" : "CLEAN",
    Math.random() < 0.5 ? "DIRTY" : "CLEAN"
];
var visitedStates = new Set();
test(states, visitedStates);
