function countTasks(tasks: number[], shifts: number[]): number[] {
    const n = tasks.length;
    const pref: number[] = new Array(n);
    let acc = 0;
    for (let i = 0; i < n; i++) {
        acc += tasks[i];
        pref[i] = acc;
    }
    const total = acc;
    let done = 0;
    const out: number[] = [];
    for (const s of shifts) {
        // done is the cumulative work finished within the current pass;
        // reaching the total ends the pass and discards unused time.
        done += s;
        if (done >= total) {
            out.push(0);
            done = 0;
            continue;
        }
        // Right-biased search counts boundary landings as complete:
        // pref[i] <= done means task i is fully finished, and the next
        // task holds all partial work. Totals reach ~1e14, safely below
        // Number.MAX_SAFE_INTEGER.
        let lo = 0,
            hi = n;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (pref[mid] <= done) lo = mid + 1;
            else hi = mid;
        }
        out.push(n - lo);
    }
    return out;
}
