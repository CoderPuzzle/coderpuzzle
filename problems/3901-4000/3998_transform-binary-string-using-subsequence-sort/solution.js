var transformStr = function (s, qs) {
    const total = [...s].filter((x) => x === "1").length;
    return qs.map((q) => {
        let need = total - [...q].filter((x) => x === "1").length,
            wild = [...q].filter((x) => x === "?").length;
        if (need < 0 || need > wild) return false;
        const one = Array(q.length).fill(false);
        for (let i = q.length - 1; i >= 0 && need; i--)
            if (q[i] === "?") {
                one[i] = true;
                need--;
            }
        let a = 0,
            b = 0;
        for (let i = 0; i < q.length; i++) {
            a += s[i] === "1";
            b += q[i] === "1" || one[i];
            if (b > a) return false;
        }
        return true;
    });
};
