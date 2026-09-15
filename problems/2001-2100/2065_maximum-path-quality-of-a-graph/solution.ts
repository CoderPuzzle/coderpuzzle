function maximalPathQuality(values: number[], edges: number[][], maxTime: number): number {
    const graph: Array<Array<[number, number]>> = Array.from({ length: values.length }, () => []);
    for (const [left, right, travelTime] of edges) {
        graph[left].push([right, travelTime]);
        graph[right].push([left, travelTime]);
    }

    const visits = new Array<number>(values.length).fill(0);
    visits[0] = 1;
    let best = values[0];

    const search = (node: number, elapsed: number, quality: number): void => {
        if (node === 0) {
            best = Math.max(best, quality);
        }
        for (const [neighbor, travelTime] of graph[node]) {
            const nextTime = elapsed + travelTime;
            if (nextTime > maxTime) {
                continue;
            }
            const firstVisit = visits[neighbor] === 0;
            visits[neighbor]++;
            search(neighbor, nextTime, quality + (firstVisit ? values[neighbor] : 0));
            visits[neighbor]--;
        }
    };

    search(0, 0, values[0]);
    return best;
}
