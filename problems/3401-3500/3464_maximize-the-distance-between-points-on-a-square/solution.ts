function maxDistance(side: number, points: number[][], k: number): number {
    const L = 4 * side;

    const perimeter = (x: number, y: number): number => {
        if (y === 0) return x;
        if (x === side) return side + y;
        if (y === side) return 2 * side + (side - x);
        // x === 0
        return 3 * side + (side - y);
    };

    const n = points.length;
    const coords: number[] = points.map((p) => perimeter(p[0], p[1])).sort((a, b) => a - b);
    const arr: number[] = new Array(2 * n);
    for (let i = 0; i < n; i++) {
        arr[i] = coords[i];
        arr[i + n] = coords[i] + L;
    }

    const feasible = (d: number): boolean => {
        if (d === 0) return true;
        const total = 2 * n;
        const nxt: number[] = new Array(total);
        for (let j = 0; j < total; j++) {
            const target = arr[j] + d;
            let lo = j + 1,
                hi = total;
            while (lo < hi) {
                const mid = Math.floor((lo + hi) / 2);
                if (arr[mid] < target) lo = mid + 1;
                else hi = mid;
            }
            nxt[j] = lo;
        }
        for (let i = 0; i < n; i++) {
            let cnt = 1;
            let cur = i;
            let ok = true;
            for (let t = 0; t < k - 1; t++) {
                const j = nxt[cur];
                if (j >= i + n) {
                    ok = false;
                    break;
                }
                cur = j;
                cnt++;
            }
            if (ok && cnt === k) {
                if (arr[cur] + d <= arr[i] + L) {
                    return true;
                }
            }
        }
        return false;
    };

    let lo = 0,
        hi = 2 * side;
    while (lo < hi) {
        const mid = lo + Math.floor((hi - lo + 1) / 2);
        if (feasible(mid)) {
            lo = mid;
        } else {
            hi = mid - 1;
        }
    }
    return lo;
}
