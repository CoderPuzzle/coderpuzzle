var maximumMEX = function (a) {
    let n = a.length,
        f = Array(n + 1).fill(0);
    for (const x of a) if (x <= n) f[x]++;
    let mex = 0;
    while (f[mex]) mex++;
    let out = [],
        i = 0;
    while (i < n) {
        out.push(mex);
        if (mex === 0) {
            if (a[i] <= n) f[a[i]]--;
            i++;
            continue;
        }
        let seen = Array(mex).fill(false),
            missing = mex,
            next = mex;
        while (missing) {
            let x = a[i++];
            if (x <= n) {
                f[x]--;
                if (f[x] === 0 && x < next) next = x;
            }
            if (x < mex && !seen[x]) {
                seen[x] = true;
                missing--;
            }
        }
        mex = next;
    }
    return out;
};
