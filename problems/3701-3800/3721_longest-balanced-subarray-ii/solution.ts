class SegTree {
    private n: number;
    private mn: number[];
    private mx: number[];
    private lazy: number[];

    constructor(values: number[]) {
        this.n = values.length;
        this.mn = new Array(4 * this.n).fill(0);
        this.mx = new Array(4 * this.n).fill(0);
        this.lazy = new Array(4 * this.n).fill(0);
        this._build(1, 0, this.n - 1, values);
    }

    private _build(node: number, nl: number, nr: number, values: number[]): void {
        if (nl === nr) {
            this.mn[node] = this.mx[node] = values[nl];
            return;
        }
        const mid = (nl + nr) >> 1;
        this._build(node * 2, nl, mid, values);
        this._build(node * 2 + 1, mid + 1, nr, values);
        this.mn[node] = Math.min(this.mn[node * 2], this.mn[node * 2 + 1]);
        this.mx[node] = Math.max(this.mx[node * 2], this.mx[node * 2 + 1]);
    }

    private _push(node: number): void {
        const z = this.lazy[node];
        if (z !== 0) {
            for (const c of [node * 2, node * 2 + 1]) {
                this.mn[c] += z;
                this.mx[c] += z;
                this.lazy[c] += z;
            }
            this.lazy[node] = 0;
        }
    }

    addRange(ql: number, qr: number, delta: number): void {
        this._add(1, 0, this.n - 1, ql, qr, delta);
    }

    private _add(node: number, nl: number, nr: number, ql: number, qr: number, delta: number): void {
        if (ql <= nl && nr <= qr) {
            this.mn[node] += delta;
            this.mx[node] += delta;
            this.lazy[node] += delta;
            return;
        }
        this._push(node);
        const mid = (nl + nr) >> 1;
        if (ql <= mid) {
            this._add(node * 2, nl, mid, ql, qr, delta);
        }
        if (qr > mid) {
            this._add(node * 2 + 1, mid + 1, nr, ql, qr, delta);
        }
        this.mn[node] = Math.min(this.mn[node * 2], this.mn[node * 2 + 1]);
        this.mx[node] = Math.max(this.mx[node * 2], this.mx[node * 2 + 1]);
    }

    rightmostZero(ql: number, qr: number): number {
        return this._rightmost(1, 0, this.n - 1, ql, qr);
    }

    private _rightmost(node: number, nl: number, nr: number, ql: number, qr: number): number {
        if (qr < nl || nr < ql) {
            return -1;
        }
        if (ql <= nl && nr <= qr) {
            if (this.mn[node] > 0 || this.mx[node] < 0) {
                return -1;
            }
            if (nl === nr) {
                return nl;
            }
            this._push(node);
            const mid = (nl + nr) >> 1;
            const res = this._rightmost(node * 2 + 1, mid + 1, nr, ql, qr);
            if (res !== -1) {
                return res;
            }
            return this._rightmost(node * 2, nl, mid, ql, qr);
        }
        this._push(node);
        const mid = (nl + nr) >> 1;
        const res = this._rightmost(node * 2 + 1, mid + 1, nr, ql, qr);
        if (res !== -1) {
            return res;
        }
        return this._rightmost(node * 2, nl, mid, ql, qr);
    }
}

function longestBalanced(nums: number[]): number {
    const n = nums.length;
    // first occurrence of each value (seeds balance(0, r)) and the next
    // occurrence of each position (tells where a value stops mattering).
    const first = new Map<number, number>();
    const nxt: number[] = new Array(n).fill(n);
    const last = new Map<number, number>();
    for (let i = n - 1; i >= 0; i--) {
        const v = nums[i];
        if (last.has(v)) {
            nxt[i] = last.get(v)!;
        }
        last.set(v, i);
    }
    for (let i = 0; i < n; i++) {
        if (!first.has(nums[i])) {
            first.set(nums[i], i);
        }
    }
    // Seed balance(0, r): each value contributes its sign to every right
    // end at or after its first occurrence, via O(log n) range adds.
    const tree = new SegTree(new Array(n).fill(0));
    for (const [v, p] of first) {
        tree.addRange(p, n - 1, v & 1 ? 1 : -1);
    }
    let best = 0;
    for (let l = 0; l < n; l++) {
        const r = tree.rightmostZero(l, n - 1);
        if (r !== -1) {
            best = Math.max(best, r - l + 1);
        }
        const v = nums[l];
        const s = v & 1 ? 1 : -1;
        if (nxt[l] > l) {
            tree.addRange(l, nxt[l] - 1, -s);
        }
    }
    return best;
}
