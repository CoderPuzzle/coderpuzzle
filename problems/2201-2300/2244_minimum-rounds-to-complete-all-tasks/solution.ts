function minimumRounds(tasks: number[]): number {
    const counts = new Map<number, number>();
    for (const task of tasks) {
        counts.set(task, (counts.get(task) || 0) + 1);
    }
    let rounds = 0;
    for (const count of counts.values()) {
        if (count === 1) {
            return -1;
        }
        rounds += Math.ceil(count / 3);
    }
    return rounds;
}
