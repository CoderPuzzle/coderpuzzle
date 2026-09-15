var getSum = function (a) {
    const n = a.length,
        d1 = Array(n).fill(0),
        d2 = Array(n).fill(0);
    let l = 0,
        r = -1;
    for (let i = 0; i < n; i++) {
        let k = i > r ? 1 : Math.min(d1[l + r - i], r - i + 1);
        while (i - k >= 0 && i + k < n && a[i - k] === a[i + k]) k++;
        d1[i] = k;
        if (i + k - 1 > r) {
            l = i - k + 1;
            r = i + k - 1;
        }
    }
    l = 0;
    r = -1;
    for (let i = 0; i < n; i++) {
        let k = i > r ? 0 : Math.min(d2[l + r - i + 1], r - i + 1);
        while (i - k - 1 >= 0 && i + k < n && a[i - k - 1] === a[i + k]) k++;
        d2[i] = k;
        if (i + k - 1 > r) {
            l = i - k;
            r = i + k - 1;
        }
    }
    const p = [0];
    for (const x of a) p.push(p.at(-1) + x);
    let ans = 0;
    for (let i = 0; i < n; i++) {
        ans = Math.max(ans, p[i + d1[i]] - p[i - d1[i] + 1], p[i + d2[i]] - p[i - d2[i]]);
    }
    return ans;
};
