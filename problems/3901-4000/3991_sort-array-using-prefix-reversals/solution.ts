function sortArray(nums: number[], pre: number[]): number {
    const target = [...nums].sort((a, b) => a - b).join(",");
    const start = nums.join(",");
    if (start === target) return 0;
    const queue: number[][] = [nums];
    const distance = new Map<string, number>([[start, 0]]);
    for (let head = 0; head < queue.length; head++) {
        const state = queue[head];
        const key = state.join(",");
        const current = distance.get(key)!;
        for (const length of pre) {
            const next = [...state.slice(0, length).reverse(), ...state.slice(length)];
            const nextKey = next.join(",");
            if (nextKey === target) return current + 1;
            if (!distance.has(nextKey)) {
                distance.set(nextKey, current + 1);
                queue.push(next);
            }
        }
    }
    return -1;
}
