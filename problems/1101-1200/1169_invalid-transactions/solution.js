/**
 * @param {string[]} transactions
 * @return {string[]}
 */
var invalidTransactions = function (transactions) {
    var parsed = transactions.map(function (t) {
        return t.split(",");
    });
    var flags = new Array(parsed.length).fill(false);
    // An amount over the limit convicts on its own; otherwise the
    // transaction waits for a same-name partner in another city within
    // 60 minutes — which may appear anywhere in the array.
    for (var i = 0; i < parsed.length; i++) {
        if (Number(parsed[i][2]) > 1000) {
            flags[i] = true;
            continue;
        }
        for (var j = 0; j < parsed.length; j++) {
            if (i === j || parsed[j][0] !== parsed[i][0] || parsed[j][3] === parsed[i][3]) {
                continue;
            }
            if (Math.abs(Number(parsed[i][1]) - Number(parsed[j][1])) <= 60) {
                flags[i] = true;
                break;
            }
        }
    }
    var invalid = [];
    for (var i = 0; i < parsed.length; i++) {
        if (flags[i]) {
            invalid.push(transactions[i]);
        }
    }
    return invalid;
};
