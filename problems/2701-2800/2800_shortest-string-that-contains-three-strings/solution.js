/**
 * @param {string} a
 * @param {string} b
 * @param {string} c
 * @return {string}
 */
var minimumString = function (a, b, c) {
    // A word already contained in another never extends a superstring,
    // so it is dropped (duplicates collapse with it).
    const unique = [...new Set([a, b, c])];
    const words = unique.filter((w) => !unique.some((t) => t !== w && t.includes(w)));
    if (words.length === 1) {
        return words[0];
    }

    // Largest k whose x-suffix equals y's prefix; k = 0 (plain
    // concatenation) always works as the fallback.
    const merge = (x, y) => {
        const limit = Math.min(x.length, y.length);
        for (let k = limit; k > 0; k--) {
            if (x.endsWith(y.slice(0, k))) {
                return x + y.slice(k);
            }
        }
        return x + y;
    };

    let best = "";
    for (let i = 0; i < words.length; i++) {
        for (let j = 0; j < words.length; j++) {
            if (j === i) {
                continue;
            }
            // Chain the words in the order i -> j -> (the remaining one);
            // every optimal superstring lines up its words in some such
            // order with each pair joined on their full overlap.
            let cur = merge(words[i], words[j]);
            for (let k = 0; k < words.length; k++) {
                if (k !== i && k !== j) {
                    cur = merge(cur, words[k]);
                }
            }
            if (best === "" || cur.length < best.length || (cur.length === best.length && cur < best)) {
                best = cur;
            }
        }
    }
    return best;
};
