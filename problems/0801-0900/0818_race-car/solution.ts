function racecar(target: number): number {
    const bound = 2 * target;
    // Encode (pos, speed) as an integer key: speed lives in [-2*bound, 2*bound].
    const span = 4 * bound + 1;
    const encode = (pos: number, speed: number): number => (pos + bound) * span + (speed + 2 * bound);
    const queue: Array<[number, number]> = [[0, 1]];
    const visited = new Set<number>();
    visited.add(encode(0, 1));
    let head = 0;
    let steps = 0;
    while (head < queue.length) {
        const levelEnd = queue.length;
        while (head < levelEnd) {
            const [pos, speed] = queue[head++];
            if (pos === target) return steps;
            // Accelerate.
            let np = pos + speed,
                ns = speed * 2;
            if (-bound <= np && np <= bound && !visited.has(encode(np, ns))) {
                visited.add(encode(np, ns));
                queue.push([np, ns]);
            }
            // Reverse.
            ns = speed > 0 ? -1 : 1;
            if (!visited.has(encode(pos, ns))) {
                visited.add(encode(pos, ns));
                queue.push([pos, ns]);
            }
        }
        steps += 1;
    }
    return -1;
}
