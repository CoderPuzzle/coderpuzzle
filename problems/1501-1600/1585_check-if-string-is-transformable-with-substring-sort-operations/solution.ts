// 1-indexed Fenwick tree over the n original positions of s, tracking
// which positions of one particular digit are still unconsumed.
class FenwickTree {
    private size: number;
    private tree: number[];

    constructor(size: number) {
        this.size = size;
        this.tree = new Array(size + 1).fill(0);
    }

    add(index: number, delta: number): void {
        index += 1;
        while (index <= this.size) {
            this.tree[index] += delta;
            index += index & -index;
        }
    }

    prefixCount(index: number): number {
        let total = 0;
        while (index > 0) {
            total += this.tree[index];
            index -= index & -index;
        }
        return total;
    }
}

function isTransformable(s: string, t: string): boolean {
    const n = s.length;
    if (t.length !== n) return false;

    // queue[d]: original positions in s carrying digit d, oldest first.
    const queue: number[][] = Array.from({ length: 10 }, () => []);
    for (let index = 0; index < n; index++) {
        queue[s.charCodeAt(index) - 48].push(index);
    }
    const head = new Array(10).fill(0);

    // fenwick[d] marks which occurrences of digit d are still unconsumed,
    // so a prefix query answers "how many remaining digit-d positions sit
    // left of index x".
    const fenwick: FenwickTree[] = Array.from({ length: 10 }, () => new FenwickTree(n));
    for (let index = 0; index < n; index++) {
        fenwick[s.charCodeAt(index) - 48].add(index, 1);
    }

    for (let i = 0; i < n; i++) {
        const digit = t.charCodeAt(i) - 48;
        if (head[digit] >= queue[digit].length) return false;
        const pos = queue[digit][head[digit]];
        head[digit]++;
        // any remaining strictly-smaller digit still left of pos
        // permanently blocks it: sorting only lets pos move left past
        // digits strictly greater than it, never past a smaller one.
        let blocked = 0;
        for (let smaller = 0; smaller < digit; smaller++) {
            blocked += fenwick[smaller].prefixCount(pos);
        }
        if (blocked !== 0) return false;
        fenwick[digit].add(pos, -1);
    }

    return true;
}
