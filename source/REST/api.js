export const api = {
    async fetchTasks(MAIN_URL, TOKEN) {
        const response = await fetch(MAIN_URL, {
            method: 'GET',
            headers: {
                Authorization: TOKEN,
            },
        });

        if (response.status !== 200) {
            return;
        }

        const { data: tasks } = await response.json();

        return tasks;
    },

    async updateTask(MAIN_URL, TOKEN, updatedTask) {
        const response = await fetch(MAIN_URL, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                Authorization: TOKEN,
            },
            body: JSON.stringify([updatedTask]),
        });

        if (response.status !== 200) {
            return;
        }

        const { data } = await response.json();

        return data;
    },

    async removeTask(MAIN_URL, TOKEN, taskId) {
        const response = await fetch(`${MAIN_URL}/${taskId}`, {
            method: 'DELETE',
            headers: {
                Authorization: TOKEN,
            },
        });

        if (response.status !== 204) {
            return;
        }

        return true;
    },

    async createTask(MAIN_URL, TOKEN, newTaskMessage) {
        const response = await fetch(MAIN_URL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: TOKEN,
            },
            body: JSON.stringify({ message: newTaskMessage }),
        });

        if (response.status !== 200) {
            return;
        }

        const { data } = await response.json();

        return data;
    },
    async completeAllTasks(MAIN_URL, TOKEN, notCompletedTasks) {
        const tasks = notCompletedTasks.map(async task => {
            const newtask = await fetch(MAIN_URL, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: TOKEN,
                },
                body: JSON.stringify([task]),
            });
            return newtask;
        });

        const response = await Promise.all(tasks);

        const data = response.map(async response => {
            if (response.status !== 200) {
                throw new Error();
            }
            const x = await response.json();
            //console.log(x);
            return x;
        });
        Promise.all(data).then(data => console.log(data));
    },
};
