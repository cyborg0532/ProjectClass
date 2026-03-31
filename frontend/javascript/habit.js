document.addEventListener("DOMContentLoaded", () => {

    let habits = window.loadData('dlm_habits', []);

    const input = document.getElementById("habit-input");
    const addBtn = document.getElementById("add-habit-btn");
    const table = document.getElementById("habits-table-body");

    function init() {
        habits.forEach(h => {
            if (!h.days) {
                h.days = new Array(7).fill(false);
            }
        });
    }

    function percent(days) {
        let count = days.filter(d => d).length;
        return Math.round((count / 7) * 100);
    }

    function render() {
        table.innerHTML = "";

        habits.forEach((h, i) => {

            let tr = document.createElement("tr");

            let days = h.days.map((d, j) => {
                return `
                    <td>
                        <input type="checkbox" data-i="${i}" data-d="${j}" ${d ? "checked" : ""}>
                    </td>
                `;
            }).join("");

            tr.innerHTML = `
                <td class="habit-name">${h.title}</td>
                ${days}
                <td class="percentage">${percent(h.days)}%</td>
                <td>
                    <button class="delete-btn" data-i="${i}">Delete</button>
                </td>
            `;

            table.appendChild(tr);
        });

        window.saveData('dlm_habits', habits);
    }

    init();
    render();

    addBtn.addEventListener("click", () => {
        let val = input.value.trim();
        if (!val) return;

        habits.push({
            title: val,
            days: new Array(7).fill(false)
        });

        input.value = "";
        render();
    });

    table.addEventListener("click", (e) => {

        let i = e.target.dataset.i;

        if (i === undefined) return;

        if (e.target.type === "checkbox") {
            let d = e.target.dataset.d;
            habits[i].days[d] = e.target.checked;
            render();
        }

        if (e.target.classList.contains("delete-btn")) {
            habits.splice(i, 1);
            render();
        }
    });

});