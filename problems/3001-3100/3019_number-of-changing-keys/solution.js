/**
 * @param {string} s
 * @return {number}
 */
var countKeyChanges = function (s) {
    const keys = s.toLowerCase();
    let changes = 0;
    for (let i = 1; i < keys.length; i++) {
        if (keys[i] !== keys[i - 1]) {
            changes++;
        }
    }
    return changes;
};
