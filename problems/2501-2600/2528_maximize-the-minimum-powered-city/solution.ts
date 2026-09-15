function maxPower(stations: number[], r: number, k: number): number {
    const n = stations.length;
    // power[i] = initial number of power stations serving city i
    const diff: number[] = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        const s = stations[i];
        const left = Math.max(0, i - r);
        const right = Math.min(n - 1, i + r);
        diff[left] += s;
        diff[right + 1] -= s;
    }
    const power: number[] = [];
    let cur = 0;
    for (let i = 0; i < n; i++) {
        cur += diff[i];
        power.push(cur);
    }

    const feasible = (target: number): boolean => {
        const extra: number[] = new Array(n + 1).fill(0);
        let cur2 = 0;
        let used = 0;
        for (let i = 0; i < n; i++) {
            cur2 += extra[i];
            const have = power[i] + cur2;
            if (have < target) {
                const need = target - have;
                used += need;
                if (used > k) {
                    return false;
                }
                const right = Math.min(n - 1, i + r);
                extra[right + 1] -= need;
                cur2 += need;
            }
        }
        return used <= k;
    };

    // each new station raises any single city's power by at most 1,
    // so the answer never exceeds min(power) + k
    let minPower = Infinity;
    for (const p of power) {
        if (p < minPower) {
            minPower = p;
        }
    }
    let lo = 0;
    let hi = minPower + k;
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
