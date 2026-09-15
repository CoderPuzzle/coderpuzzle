function sumSubarrayMins(arr: number[]): number {
    const MOD = 1000000007;
    const n = arr.length;
    const left: number[] = new Array(n);
    const right: number[] = new Array(n);
    let stack: number[] = [];
    // left[i]: index of the previous strictly smaller element (pops >=),
    // with -1 letting the dominance span reach the left border.
    for (let i = 0; i < n; i++) {
        while (stack.length && arr[stack[stack.length - 1]] >= arr[i]) {
            stack.pop();
        }
        left[i] = stack.length ? stack[stack.length - 1] : -1;
        stack.push(i);
    }
    stack = [];
    // right[i]: next smaller-or-equal element (pops only >). The
    // asymmetry attributes tied minima to the leftmost position, so
    // no subarray is counted twice; n spans to the right border.
    for (let i = n - 1; i >= 0; i--) {
        while (stack.length && arr[stack[stack.length - 1]] > arr[i]) {
            stack.pop();
        }
        right[i] = stack.length ? stack[stack.length - 1] : n;
        stack.push(i);
    }
    // arr[i] is the minimum exactly when the subarray's endpoints lie in
    // (left[i], i] x [i, right[i]) — that product counts them all.
    let total = 0;
    for (let i = 0; i < n; i++) {
        total += arr[i] * (i - left[i]) * (right[i] - i);
        total %= MOD;
    }
    return total;
}
