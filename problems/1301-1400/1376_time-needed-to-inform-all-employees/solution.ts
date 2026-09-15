function numOfMinutes(n: number, headID: number, manager: number[], informTime: number[]): number {
    // arrival[i] = minutes until employee i starts spreading the news.
    const arrival = new Array<number>(n).fill(-1);
    arrival[headID] = 0;
    const resolve = (start: number): number => {
        if (arrival[start] >= 0) return arrival[start];
        const chain: number[] = [];
        let current = start;
        while (arrival[current] < 0) {
            chain.push(current);
            current = manager[current];
        }
        for (let k = chain.length - 1; k >= 0; k--) {
            const boss = manager[chain[k]];
            arrival[chain[k]] = arrival[boss] + informTime[boss];
        }
        return arrival[start];
    };
    let best = 0;
    for (let employee = 0; employee < n; employee++) {
        best = Math.max(best, resolve(employee));
    }
    return best;
}
