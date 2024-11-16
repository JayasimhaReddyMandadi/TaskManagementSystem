const API_BASE_URL = 'http://127.0.0.1:8000/api';

class API {
    static async login(credentials) {
        try {
            const response = await fetch(`${API_BASE_URL}/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Login failed');
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    static async register(userData) {
        try {
            const response = await fetch(`${API_BASE_URL}/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
    
            if (!response.ok) {
                const error = await response.json();
                // Handle different types of error responses
                if (typeof error === 'object') {
                    const errorMessages = Object.values(error).flat().join(', ');
                    throw new Error(errorMessages);
                }
                throw new Error('Registration failed');
            }
    
            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    static async getTasks() {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/tasks/list/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    static async createTask(taskData) {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/tasks/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(taskData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(Object.values(error).flat().join(', '));
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    }
}