/**
 * @param {number[]} changed
 * @return {number[]}
 */
var findOriginalArray = function (changed) {
    if (changed.length % 2 === 1) {
        return [];
    }

    changed.sort((a, b) => a - b);
    const counts = new Map();
    for (const value of changed) {
        counts.set(value, (counts.get(value) ?? 0) + 1);
    }

    const original = [];
    for (const value of changed) {
        const remaining = counts.get(value);
        if (remaining === 0) {
            continue;
        }
        counts.set(value, remaining - 1);
        const doubled = value * 2;
        const doubledRemaining = counts.get(doubled) ?? 0;
        if (doubledRemaining === 0) {
            return [];
        }
        counts.set(doubled, doubledRemaining - 1);
        original.push(value);
    }
    return original;
};
