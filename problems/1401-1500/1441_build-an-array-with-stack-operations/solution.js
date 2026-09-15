/**
 * @param {number[]} target
 * @param {number} n
 * @return {string[]}
 */
var buildArray = function (target, n) {
    const wanted = new Set(target);
    const last = target[target.length - 1];
    const operations = [];
    for (let value = 1; value <= last; value++) {
        operations.push("Push");
        if (!wanted.has(value)) {
            operations.push("Pop");
        }
    }
    return operations;
};
