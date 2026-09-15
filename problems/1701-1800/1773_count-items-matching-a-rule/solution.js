/**
 * @param {string[][]} items
 * @param {string} ruleKey
 * @param {string} ruleValue
 * @return {number}
 */
var countMatches = function (items, ruleKey, ruleValue) {
    // The three rule keys are exactly the three columns of every item, so
    // the key resolves once to a column index and the loop below compares
    // one fixed field of each row.
    const index = { type: 0, color: 1, name: 2 }[ruleKey];
    let matches = 0;
    for (const item of items) {
        if (item[index] === ruleValue) {
            matches++;
        }
    }
    return matches;
};
