var numberOfPairs = function (a, b, qs) {
    const S = 225,
        B = Math.ceil(b.length / S),
        lazy = Array(B).fill(0),
        fs = [];
    function rebuild(z) {
        let l = z * S,
            r = Math.min(b.length, l + S);
        if (lazy[z]) {
            for (let i = l; i < r; i++) b[i] += lazy[z];
            lazy[z] = 0;
        }
        let m = new Map();
        for (let i = l; i < r; i++) m.set(b[i], (m.get(b[i]) || 0) + 1);
        fs[z] = m;
    }
    for (let z = 0; z < B; z++) rebuild(z);
    let af = new Map();
    for (const x of a) af.set(x, (af.get(x) || 0) + 1);
    let out = [];
    for (const q of qs) {
        if (q[0] === 1) {
            let [_, l, r, v] = q,
                L = Math.floor(l / S),
                R = Math.floor(r / S);
            if (L === R) {
                rebuild(L);
                for (let i = l; i <= r; i++) b[i] += v;
                rebuild(L);
            } else {
                rebuild(L);
                for (let i = l; i < (L + 1) * S; i++) b[i] += v;
                rebuild(L);
                rebuild(R);
                for (let i = R * S; i <= r; i++) b[i] += v;
                rebuild(R);
                for (let z = L + 1; z < R; z++) lazy[z] += v;
            }
        } else {
            let z = 0;
            for (const [x, c] of af) for (let j = 0; j < B; j++) z += c * (fs[j].get(q[1] - x - lazy[j]) || 0);
            out.push(z);
        }
    }
    return out;
};
