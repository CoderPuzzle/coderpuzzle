function findCrossingTime(n: number, k: number, time: number[][]): number {
    // Priority is static per worker: least efficient = larger left+right,
    // ties to the larger index. Encoded as min-key (-eff, -i).
    const lessKey = (a: number[], b: number[]) => a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]);
    const lessReady = (a: number[], b: number[]) => a[0] < b[0];
    const left: number[][] = [];
    for (let i = 0; i < k; i++) {
        pushHeap(left, [-(time[i][0] + time[i][2]), -i], lessKey);
    }
    const right: number[][] = []; // boxed workers waiting on the right bank
    const pending: number[][] = []; // [readyTime, join-side 1=right 0=left, i]
    let cur = 0; // instant the bridge becomes free again
    let sent = 0;
    let delivered = 0;
    let ans = 0;
    while (delivered < n) {
        while (pending.length > 0 && pending[0][0] <= cur) {
            const done = popHeap(pending, lessReady);
            const effI = -(time[done[2]][0] + time[done[2]][2]);
            pushHeap(done[1] === 1 ? right : left, [effI, -done[2]], lessKey);
        }
        if (right.length > 0) {
            // A boxed worker on the right bank always has priority.
            const i = -popHeap(right, lessKey)[1];
            cur += time[i][2];
            delivered++;
            if (cur > ans) ans = cur; // the box reaches the left bank here
            if (delivered === n) break; // the final put never delays anything
            pushHeap(pending, [cur + time[i][3], 0, i], lessReady);
        } else if (left.length > 0 && sent < n) {
            const i = -popHeap(left, lessKey)[1];
            cur += time[i][0];
            sent++;
            pushHeap(pending, [cur + time[i][1], 1, i], lessReady);
        } else {
            // Nobody can cross yet: jump to the next readiness instant.
            cur = pending[0][0];
        }
    }
    return ans;
}

function pushHeap(arr: number[][], item: number[], less: (a: number[], b: number[]) => boolean): void {
    arr.push(item);
    siftUp(arr, arr.length - 1, less);
}

function popHeap(arr: number[][], less: (a: number[], b: number[]) => boolean): number[] {
    const top = arr[0];
    arr[0] = arr[arr.length - 1];
    arr.pop();
    if (arr.length > 0) siftDown(arr, 0, less);
    return top;
}

function siftUp(arr: number[][], start: number, less: (a: number[], b: number[]) => boolean): void {
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

function siftDown(arr: number[][], start: number, less: (a: number[], b: number[]) => boolean): void {
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
