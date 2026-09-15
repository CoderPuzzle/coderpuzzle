/**
 * @param {string[]} names
 * @return {string[]}
 */
var getFolderNames = function (names) {
    const used = new Set();
    const nextK = new Map();
    const result = [];
    for (const name of names) {
        if (!used.has(name)) {
            used.add(name);
            if (!nextK.has(name)) {
                nextK.set(name, 1);
            }
            result.push(name);
            continue;
        }
        const base = name;
        let k = nextK.get(base) || 1;
        let candidate = `${base}(${k})`;
        while (used.has(candidate)) {
            k++;
            candidate = `${base}(${k})`;
        }
        used.add(candidate);
        nextK.set(base, k + 1);
        if (candidate.endsWith(")")) {
            const idx = candidate.lastIndexOf("(");
            if (idx > 0) {
                const digits = candidate.slice(idx + 1, -1);
                if (/^\d+$/.test(digits)) {
                    const stem = candidate.slice(0, idx);
                    const val = parseInt(digits, 10) + 1;
                    if ((nextK.get(stem) || 0) < val) {
                        nextK.set(stem, val);
                    }
                }
            }
        }
        result.push(candidate);
    }
    return result;
};
