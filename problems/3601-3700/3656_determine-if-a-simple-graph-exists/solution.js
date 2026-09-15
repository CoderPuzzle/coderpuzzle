var simpleGraphExists = function (degrees) {
    degrees.sort((left, right) => right - left);
    const n = degrees.length;
    const pre = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        pre[i + 1] = pre[i] + degrees[i];
    }
    const total = pre[n];
    // An odd degree sum can never pair up into edges.
    if (total % 2 !== 0) {
        return false;
    }
    // big tracks how many entries still exceed k; it only moves left.
    let big = n;
    for (let k = 0; k <= n; k++) {
        while (big > 0 && degrees[big - 1] <= k) {
            big--;
        }
        const spared = k * Math.max(big - k, 0) + total - pre[Math.max(big, k)];
        if (pre[k] > k * (k - 1) + spared) {
            return false;
        }
    }
    return true;
};
