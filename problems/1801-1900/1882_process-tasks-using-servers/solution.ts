function assignTasks(servers: number[], tasks: number[]): number[] {
    // Two binary heaps: free keyed by (weight, index), busy keyed by
    // release time. Drain finished servers, wait for the earliest if
    // needed, then hand the task to the smallest free server. Values
    // stay far below 2^53, so plain numbers are exact.
    const lessFree = (a: [number, number], b: [number, number]) => a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]);
    const free: Array<[number, number]> = [];
    for (let i = 0; i < servers.length; i++) {
        free.push([servers[i], i]);
    }
    for (let c = (free.length >> 1) - 1; c >= 0; c--) {
        siftDown(free, c, lessFree);
    }
    const busy: Array<[number, number, number]> = [];
    const ans = new Array<number>(tasks.length);
    let cur = 0;
    for (let j = 0; j < tasks.length; j++) {
        cur = Math.max(cur, j);
        while (busy.length > 0 && busy[0][0] <= cur) {
            const done = busy[0];
            busy[0] = busy[busy.length - 1];
            busy.pop();
            if (busy.length > 0) {
                siftDown(busy, 0, (x, y) => x[0] < y[0]);
            }
            free.push([done[1], done[2]]);
            siftUp(free, free.length - 1, lessFree);
        }
        if (free.length === 0) {
            cur = busy[0][0];
            while (busy.length > 0 && busy[0][0] <= cur) {
                const done = busy[0];
                busy[0] = busy[busy.length - 1];
                busy.pop();
                if (busy.length > 0) {
                    siftDown(busy, 0, (x, y) => x[0] < y[0]);
                }
                free.push([done[1], done[2]]);
                siftUp(free, free.length - 1, lessFree);
            }
        }
        const pick = free[0];
        free[0] = free[free.length - 1];
        free.pop();
        if (free.length > 0) {
            siftDown(free, 0, lessFree);
        }
        busy.push([cur + tasks[j], pick[0], pick[1]]);
        siftUp(busy, busy.length - 1, (x, y) => x[0] < y[0]);
        ans[j] = pick[1];
    }
    return ans;
}

function siftUp<T>(arr: T[], start: number, less: (a: T, b: T) => boolean): void {
    let c = start;
    while (c > 0) {
        const p = (c - 1) >> 1;
        if (!less(arr[c], arr[p])) break;
        const t = arr[p];
        arr[p] = arr[c];
        arr[c] = t;
        c = p;
    }
}

function siftDown<T>(arr: T[], start: number, less: (a: T, b: T) => boolean): void {
    const n = arr.length;
    let p = start;
    for (;;) {
        const l = 2 * p + 1;
        const r = l + 1;
        let s = p;
        if (l < n && less(arr[l], arr[s])) s = l;
        if (r < n && less(arr[r], arr[s])) s = r;
        if (s === p) break;
        const t = arr[p];
        arr[p] = arr[s];
        arr[s] = t;
        p = s;
    }
}
