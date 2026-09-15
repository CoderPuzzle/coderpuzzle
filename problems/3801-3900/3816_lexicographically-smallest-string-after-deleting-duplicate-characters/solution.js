/**
 * @param {string} s
 * @return {string}
 */
var lexSmallestAfterDeletion = function (s) {
    // A letter occurring once can never be deleted, and any letter can be
    // deleted down to a single occurrence, so the reachable strings are
    // exactly the subsequences that keep every distinct letter. Build the
    // smallest one letter by letter: take the smallest letter whose
    // earliest remaining occurrence still leaves every not-yet-taken
    // letter an occurrence after it.
    const pos = Array.from({ length: 26 }, () => []);
    for (let i = 0; i < s.length; i++) {
        pos[s.charCodeAt(i) - 97].push(i);
    }
    const todo = [];
    for (let c = 0; c < 26; c++) {
        if (pos[c].length > 0) {
            todo.push(c);
        }
    }
    const ptr = new Array(26).fill(0);
    const out = [];
    let p = -1;
    const n = s.length;
    while (todo.length > 0) {
        // Two smallest last-occurrence deadlines among needed letters.
        let m1 = n;
        let m2 = n;
        let d1 = -1;
        for (const c of todo) {
            const lc = pos[c][pos[c].length - 1];
            if (lc < m1) {
                m2 = m1;
                m1 = lc;
                d1 = c;
            } else if (lc < m2) {
                m2 = lc;
            }
        }
        for (let c = 0; c < 26; c++) {
            const lst = pos[c];
            let j = ptr[c];
            while (j < lst.length && lst[j] <= p) {
                j++;
            }
            ptr[c] = j;
            if (j === lst.length) {
                continue;
            }
            // Taking occurrence q must not strand a needed letter.
            const q = lst[j];
            const lim = c === d1 ? m2 : m1;
            if (q < lim) {
                out.push(String.fromCharCode(97 + c));
                p = q;
                const k = todo.indexOf(c);
                if (k >= 0) {
                    todo.splice(k, 1);
                }
                break;
            }
        }
    }
    return out.join("");
};
