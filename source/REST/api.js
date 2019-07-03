export const api = {
    async fetchTasks(MAIN_URL, TOKEN) {
        const response = await fetch(MAIN_URL, {
            method: 'GET',
            headers: {
                Authorization: TOKEN,
            },
        });

        const { status } = response;

        if (status !== 200) {
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

        const { status } = response;

        if (status !== 200) {
            return;
        }

        const { data } = await response.json();

        return data;
    },
};
