function countDistinct(s: string): number {
    // Suffix automaton: each state v other than the root owns exactly the
    // len[v] - len[link[v]] substrings in its endpos equivalence class, and
    // every distinct substring belongs to exactly one class, so the answer is
    // the sum of those class sizes. Clones created while splitting a
    // transition are ordinary states and count the same way.
    const n = s.length;
    const states = 2 * n;
    const length = new Array<number>(states).fill(0);
    const link = new Array<number>(states).fill(-1);
    // 0 doubles as "no transition": no edge ever points at the root.
    const trans: number[][] = [];
    for (let i = 0; i < states; i++) {
        trans.push(new Array<number>(26).fill(0));
    }
    let size = 1;
    let last = 0;
    for (let i = 0; i < n; i++) {
        const c = s.charCodeAt(i) - 97;
        const cur = size++;
        length[cur] = length[last] + 1;
        let p = last;
        while (p !== -1 && trans[p][c] === 0) {
            trans[p][c] = cur;
            p = link[p];
        }
        if (p === -1) {
            link[cur] = 0;
        } else {
            const q = trans[p][c];
            if (length[p] + 1 === length[q]) {
                link[cur] = q;
            } else {
                // q is too deep to be cur's suffix link: copy it as a
                // shallower clone, redirect the family's transitions, then
                // hang both q and cur under the clone.
                const clone = size++;
                length[clone] = length[p] + 1;
                link[clone] = link[q];
                trans[clone] = trans[q].slice();
                while (p !== -1 && trans[p][c] === q) {
                    trans[p][c] = clone;
                    p = link[p];
                }
                link[q] = clone;
                link[cur] = clone;
            }
        }
        last = cur;
    }
    let answer = 0;
    for (let v = 1; v < size; v++) {
        answer += length[v] - length[link[v]];
    }
    return answer;
}
