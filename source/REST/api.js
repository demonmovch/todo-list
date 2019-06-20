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
};
