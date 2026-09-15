var maxTotal = function (a, s) {
    let ans = 0,
        i = 0;
    while (i < a.length) {
        if (s[i] === "0") {
            i++;
            continue;
        }
        let l = i,
            sum = 0,
            m = Infinity;
        while (i < a.length && s[i] === "1") {
            sum += a[i];
            m = Math.min(m, a[i]);
            i++;
        }
        if (l === 0) ans += sum;
        else ans += sum + a[l - 1] - Math.min(m, a[l - 1]);
    }
    return ans;
};
