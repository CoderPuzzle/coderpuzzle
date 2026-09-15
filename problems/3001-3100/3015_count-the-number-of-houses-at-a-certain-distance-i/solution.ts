function countOfPairs(n: number, x: number, y: number): number[] {
    const adjacency: number[][] = Array.from({ length: n + 1 }, () => []);
    for (let house = 1; house < n; house++) {
        adjacency[house].push(house + 1);
        adjacency[house + 1].push(house);
    }
    if (x !== y) {
        adjacency[x].push(y);
        adjacency[y].push(x);
    }

    const result = new Array<number>(n).fill(0);
    for (let source = 1; source <= n; source++) {
        // Breadth-first distances from source over the chain plus the
        // extra street; every other house lands at distance >= 1.
        const distance = new Array<number>(n + 1).fill(-1);
        distance[source] = 0;
        const queue: number[] = [source];
        for (let head = 0; head < queue.length; head++) {
            const house = queue[head];
            for (const neighbor of adjacency[house]) {
                if (distance[neighbor] < 0) {
                    distance[neighbor] = distance[house] + 1;
                    queue.push(neighbor);
                }
            }
        }
        for (let target = 1; target <= n; target++) {
            // Skip the source itself: its distance-zero pair belongs to
            // no bucket.
            if (distance[target] > 0) {
                result[distance[target] - 1]++;
            }
        }
    }
    return result;
}
