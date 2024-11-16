class Dashboard {
    constructor() {
        this.taskForm = document.getElementById('taskForm');
        this.taskList = document.getElementById('taskList');
        this.logoutBtn = document.getElementById('logoutBtn');

        this.initializeEventListeners();
        this.loadTasks();
    }

    initializeEventListeners() {
        this.taskForm.addEventListener('submit', (e) => this.handleTaskSubmit(e));
        this.logoutBtn.addEventListener('click', () => this.handleLogout());
    }

    async loadTasks() {
        try {
            const tasks = await API.getTasks();
            this.renderTasks(tasks.results);
        } catch (error) {
            alert('Failed to load tasks');
            if (error.message.includes('401')) {
                window.location.href = 'index.html';
            }
        }
    }

    async handleTaskSubmit(e) {
        e.preventDefault();
        
        const taskData = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            priority: document.getElementById('priority').value,
            deadline: document.getElementById('deadline').value,
            status: 'yet-to-start'
        };

        try {
            await API.createTask(taskData);
            this.taskForm.reset();
            this.loadTasks();
        } catch (error) {
            alert(error.message);
        }
    }

    handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = 'index.html';
    }

    renderTasks(tasks) {
        this.taskList.innerHTML = tasks.map(task => `
            <div class="card mb-3 border-${this.getPriorityColor(task.priority)}">
                <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="badge bg-${this.getStatusColor(task.status)}">${task.status}</span>
                        <small class="text-muted">Due: ${new Date(task.deadline).toLocaleDateString()}</small>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getPriorityColor(priority) {
        const colors = {
            low: 'success',
            medium: 'warning',
            high: 'danger'
        };
        return colors[priority] || 'secondary';
    }

    getStatusColor(status) {
        const colors = {
            'yet-to-start': 'secondary',
            'in-progress': 'primary',
            'completed': 'success',
            'hold': 'warning'
        };
        return colors[status] || 'secondary';
    }
}

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});