/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */
var suggestedProducts = function (products, searchWord) {
    // lexicographic order makes every shared prefix a contiguous run
    const sorted = products.slice().sort();
    const result = [];
    let prefix = "";
    for (const ch of searchWord) {
        // grow the prefix one typed character at a time
        prefix += ch;
        // lower bound: where the run of words >= prefix begins
        let lo = 0,
            hi = sorted.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (sorted[mid] < prefix) lo = mid + 1;
            else hi = mid;
        }
        // first three of the run; stop at the first word not sharing the
        // prefix — cost is independent of run length
        const suggestions = [];
        for (let i = lo; i < sorted.length && suggestions.length < 3; i++) {
            if (sorted[i].startsWith(prefix)) suggestions.push(sorted[i]);
            else break;
        }
        result.push(suggestions);
    }
    return result;
};
