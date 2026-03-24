
        // function toggleMenu() {
        //     document.querySelector('.hamburger').classList.toggle('open');
            
        //     document.querySelector('.menu').classList.toggle('open');
        //      document.querySelector('.menu').style.display == "flex";

        // }




  document.querySelector(".today-task").addEventListener("click", () => {
    const newTask = document.createElement("li");
    newTask.innerHTML = '<input type="checkbox" id="option1" name="option1" value="Value"><input type="text" placeholder="New Task">';
    newTask.style.display = "grid";
    newTask.style.gridTemplateColumns = "repeat(3, 1fr) ";
    newTask.style.width = "10rem";
    newTask.style.border = "1px solid #ccc";
    document.querySelector("#todo").appendChild(newTask);
  });




// start here


document.addEventListener("DOMContentLoaded", () => {
    const habits = window.loadData('dlm_habits', []);
    const tasks = window.loadData('dlm_tasks', []);
    const profile = window.loadData('dlm_profile', { name: 'User', goal: 'Stay productive!', bio: '' });

    const greetingEl = document.getElementById("greeting-message");
    const dateEl = document.getElementById("current-date");
    
    if (greetingEl && dateEl) {
        // Set Date
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = `Today is ${today.toLocaleDateString(undefined, options)}`;

      
        const hour = today.getHours();
        let greeting = "Good Evening";
        if (hour < 12) greeting = "Good Morning";
        else if (hour < 18) greeting = "Good Afternoon";
        
        greetingEl.textContent = `${greeting}, ${profile.name}!`;

      
        const totalHabitsEl = document.getElementById("total-habits");
        const completedHabitsEl = document.getElementById("completed-habits");
        const totalTasksEl = document.getElementById("total-tasks");

        if (totalHabitsEl) totalHabitsEl.textContent = habits.length;
        if (completedHabitsEl) {
            const completed = habits.filter(h => h.completed).length;
            completedHabitsEl.textContent = completed;
        }
        if (totalTasksEl) totalTasksEl.textContent = tasks.length;
    }
});