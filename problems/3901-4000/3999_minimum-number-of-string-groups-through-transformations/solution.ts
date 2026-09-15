function minimumGroups(words: string[]): number {
    function booth(s: string): string {
        if (!s) return s;
        const z = s + s,
            n = s.length;
        let i = 0,
            j = 1,
            k = 0;
        while (i < n && j < n && k < n) {
            if (z[i + k] === z[j + k]) {
                k++;
                continue;
            }
            if (z[i + k] > z[j + k]) {
                i = i + k + 1;
                if (i === j) i++;
            } else {
                j = j + k + 1;
                if (i === j) j++;
            }
            k = 0;
        }
        const p = Math.min(i, j);
        return z.slice(p, p + n);
    }
    const q = new Set();
    for (const w of words) {
        const even = [],
            odd = [];
        for (let i = 0; i < w.length; i++)
            if (i % 2) odd.push(w[i]);
            else even.push(w[i]);
        const a = even.join(""),
            b = odd.join("");
        q.add(booth(a) + "#" + booth(b));
    }
    return q.size;
}
