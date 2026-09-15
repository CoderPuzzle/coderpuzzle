function maxTaskAssign(tasks: number[], workers: number[], pills: number, strength: number): number {
    tasks.sort((left, right) => left - right);
    workers.sort((left, right) => left - right);

    const feasible = (count: number): boolean => {
        const available: number[] = [];
        let front = 0;
        let taskIndex = 0;
        let pillsLeft = pills;
        for (let workerIndex = workers.length - count; workerIndex < workers.length; workerIndex++) {
            const worker = workers[workerIndex];
            while (taskIndex < count && tasks[taskIndex] <= worker + strength) {
                available.push(tasks[taskIndex++]);
            }
            if (front >= available.length) return false;
            if (available[front] <= worker) {
                front++;
            } else {
                if (pillsLeft === 0) return false;
                pillsLeft--;
                available.pop();
            }
        }
        return true;
    };

    let low = 0;
    let high = Math.min(tasks.length, workers.length) + 1;
    while (low + 1 < high) {
        const middle = Math.floor((low + high) / 2);
        if (feasible(middle)) low = middle;
        else high = middle;
    }
    return low;
}
