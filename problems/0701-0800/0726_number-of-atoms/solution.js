/**
 * @param {string} formula
 * @return {string}
 */
var countOfAtoms = function (formula) {
    // Scan the formula once with an explicit stack of count maps. '('
    // opens a fresh map; an element name — one uppercase letter plus any
    // lowercase run — lands its count (implicit 1) in the top map; ')'
    // pops the top map, reads the optional trailing multiplier, and
    // folds every atom into the parent scaled by it. The bottom map left
    // at the end holds the totals, written in sorted name order with
    // counts of 1 omitted.
    const stack = [new Map()];
    const n = formula.length;
    const readCount = (i) => {
        let j = i;
        while (j < n && formula[j] >= "0" && formula[j] <= "9") {
            j++;
        }
        return j === i ? [1, i] : [Number(formula.slice(i, j)), j];
    };
    let i = 0;
    while (i < n) {
        const c = formula[i];
        if (c === "(") {
            stack.push(new Map());
            i++;
        } else if (c === ")") {
            const [mult, j] = readCount(i + 1);
            const group = stack.pop();
            const top = stack[stack.length - 1];
            for (const [name, cnt] of group) {
                top.set(name, (top.get(name) ?? 0) + cnt * mult);
            }
            i = j;
        } else {
            let j = i + 1;
            while (j < n && formula[j] >= "a" && formula[j] <= "z") {
                j++;
            }
            const name = formula.slice(i, j);
            const [cnt, k] = readCount(j);
            const top = stack[stack.length - 1];
            top.set(name, (top.get(name) ?? 0) + cnt);
            i = k;
        }
    }
    const counts = stack[0];
    const names = [...counts.keys()].sort();
    let out = "";
    for (const name of names) {
        const cnt = counts.get(name);
        out += name + (cnt > 1 ? String(cnt) : "");
    }
    return out;
};
