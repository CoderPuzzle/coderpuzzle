function findLatestStep(arr: number[], m: number): number {
    const n = arr.length;
    // length[p] is meaningful only at the two ends of a 1-group: the
    // length of that group. Interior positions go stale once a group
    // grows past them, and are never read again.
    const length = new Array(n + 2).fill(0);
    // count[k] = how many groups currently have length exactly k.
    const count = new Array(n + 1).fill(0);
    let ans = -1;

    for (let step = 1; step <= n; step++) {
        const pos = arr[step - 1];
        const left = length[pos - 1];
        const right = length[pos + 1];
        const newLen = left + right + 1;
        length[pos - left] = newLen;
        length[pos + right] = newLen;
        if (left > 0) {
            count[left]--;
        }
        if (right > 0) {
            count[right]--;
        }
        count[newLen]++;
        if (count[m] > 0) {
            ans = step;
        }
    }

    return ans;
}
