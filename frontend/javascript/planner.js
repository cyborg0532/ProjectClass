document.addEventListener("DOMContentLoaded", () => {
    let planners = window.loadData('dlm_planners', []);
    const plannerInput = document.getElementById("planner-input");
    const addplannerBtn = document.getElementById("add-planner-btn");
    const plannersList = document.getElementById("planners-list");

    if (plannersList) {
        function renderplanners() {
            plannersList.innerHTML = ""; 
            
            planners.forEach((planner, index) => {
                const li = document.createElement("li");
                li.className = "list-item fade-in"; 
                li.innerHTML = `
                    <div class="item-left">
                        <input type="checkbox" ${planner.completed ? "checked" : ""} data-index="${index}">
                        <span>${planner.text}</span>
                    </div>
                    <button class="danger" data-index="${index}">Delete</button>
                `;
                plannersList.appendChild(li);
            });
        }
        renderplanners();

        addplannerBtn.addEventListener("click", () => {
            const text = plannerInput.value.trim(); 
            
            if (text) {
                planners.push({ text: text });
                
                window.saveData('dlm_planners', planners);
                plannerInput.value = ""; 
                renderplanners(); 
            }
        });

        
        plannersList.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") {
                const index = e.target.getAttribute("data-index");
                if (index === null) return;
                
                planners.splice(index, 1);
                
                window.saveData('dlm_planners', planners);
                renderplanners();
            }
        });
    }
});