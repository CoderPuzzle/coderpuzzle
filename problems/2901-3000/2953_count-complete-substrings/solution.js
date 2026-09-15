/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
var countCompleteSubstrings = function (word, k) {
    const n = word.length;
    const vals = new Array(n);
    for (let i = 0; i < n; i++) {
        vals[i] = word.charCodeAt(i) - 97;
    }
    let total = 0;
    let start = 0;
    while (start < n) {
        let end = start + 1;
        while (end < n && Math.abs(vals[end] - vals[end - 1]) <= 2) {
            end++;
        }
        const segLen = end - start;
        for (let m = 1; m <= 26; m++) {
            const len = m * k;
            if (len > segLen) {
                break;
            }
            const cnt = new Array(26).fill(0);
            let bad = 0;
            for (let i = start; i < start + len; i++) {
                const old = cnt[vals[i]];
                if (old + 1 === k) {
                    if (old !== 0) {
                        bad--;
                    }
                } else if (old === 0 || old === k) {
                    bad++;
                }
                cnt[vals[i]] = old + 1;
            }
            if (bad === 0) {
                total++;
            }
            let left = start;
            for (let right = start + len; right < end; right++) {
                const old = cnt[vals[right]];
                if (old + 1 === k) {
                    if (old !== 0) {
                        bad--;
                    }
                } else if (old === 0 || old === k) {
                    bad++;
                }
                cnt[vals[right]] = old + 1;
                const oldLeft = cnt[vals[left]];
                const newCnt = oldLeft - 1;
                cnt[vals[left]] = newCnt;
                if (newCnt === k) {
                    bad--;
                } else if (newCnt === 0) {
                    if (k > 1) {
                        bad--;
                    }
                } else if (newCnt + 1 === k) {
                    bad++;
                }
                left++;
                if (bad === 0) {
                    total++;
                }
            }
        }
        start = end;
    }
    return total;
};
