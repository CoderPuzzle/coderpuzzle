/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
var minimumTimeToInitialState = function (word, k) {
    const n = word.length;
    const fail = new Array(n).fill(0);
    let length = 0;
    for (let i = 1; i < n; i++) {
        const c = word[i];
        while (length && word[length] !== c) {
            length = fail[length - 1];
        }
        if (word[length] === c) {
            length++;
        }
        fail[i] = length;
    }
    const isBorder = new Uint8Array(n + 1);
    for (let cut = fail[n - 1]; cut > 0; cut = fail[cut - 1]) {
        isBorder[cut] = 1;
    }
    let t = 1;
    while (t * k < n && !isBorder[n - t * k]) {
        t++;
    }
    return t;
};
