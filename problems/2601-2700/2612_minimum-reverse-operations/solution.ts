function minReverseOperations(n: number, p: number, banned: number[], k: number): number[] {
    // Alive positions of one parity as jump pointers over slots
    // (position / 2): first returns the smallest alive slot >= pos,
    // removing a slot fuses it into its successor.
    const first = (parent: number[], pos: number): number => {
        while (parent[pos] !== pos) {
            parent[pos] = parent[parent[pos]];
            pos = parent[pos];
        }
        return pos;
    };
    const answer: number[] = new Array(n).fill(-1);
    const parent: number[][] = [0, 1].map((parity) => {
        const size = Math.floor((n + 1 - parity) / 2);
        const nodes = new Array(size + 1);
        for (let i = 0; i <= size; i++) {
            nodes[i] = i;
        }
        return nodes;
    });
    const consume = (position: number): void => {
        const slot = position >> 1;
        parent[position & 1][slot] = slot + 1;
    };
    consume(p);
    for (const b of banned) {
        consume(b);
    }
    const queue: number[] = [p];
    answer[p] = 0;
    for (let head = 0; head < queue.length; head++) {
        const x = queue[head];
        const left = Math.max(0, x - k + 1);
        const right = Math.min(x, n - k);
        if (left > right) {
            continue;
        }
        const lo = 2 * left + k - 1 - x;
        const hi = 2 * right + k - 1 - x;
        const parity = lo & 1;
        const step = lo >> 1;
        for (let slot = first(parent[parity], step); 2 * slot + parity <= hi; slot = first(parent[parity], slot + 1)) {
            const y = 2 * slot + parity;
            answer[y] = answer[x] + 1;
            queue.push(y);
            parent[parity][slot] = slot + 1;
        }
    }
    return answer;
}
