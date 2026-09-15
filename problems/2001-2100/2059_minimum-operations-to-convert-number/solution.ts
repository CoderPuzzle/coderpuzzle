function minimumOperations(nums: number[], start: number, goal: number): number {
    const distance = new Array<number>(1001).fill(-1);
    distance[start] = 0;
    const queue = [start];

    for (let head = 0; head < queue.length; ++head) {
        const value = queue[head];
        const nextDistance = distance[value] + 1;
        for (const number of nums) {
            for (const candidate of [value + number, value - number, value ^ number]) {
                if (candidate === goal) return nextDistance;
                if (candidate >= 0 && candidate <= 1000 && distance[candidate] === -1) {
                    distance[candidate] = nextDistance;
                    queue.push(candidate);
                }
            }
        }
    }
    return -1;
}
