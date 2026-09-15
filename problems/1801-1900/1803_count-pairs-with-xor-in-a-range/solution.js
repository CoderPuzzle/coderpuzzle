/**
 * @param {number[]} nums
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var countPairs = function (nums, low, high) {
    function pairsLe(k) {
        var BITS = 16;
        var maxNodes = nums.length * BITS + 2;
        var count = new Int32Array(maxNodes);
        var child = new Int32Array(maxNodes * 2); // 0 = none, root = 1
        var nodes = 1;
        var total = 0;
        for (var i = 0; i < nums.length; i++) {
            var x = nums[i];
            // Query the trie of previously inserted numbers.
            var node = 1;
            for (var b = BITS - 1; b >= 0 && node !== 0; b--) {
                var xb = (x >>> b) & 1;
                if ((k >>> b) & 1) {
                    var c = child[node * 2 + xb];
                    if (c !== 0) {
                        total += count[c];
                    }
                    node = child[node * 2 + (1 - xb)];
                } else {
                    node = child[node * 2 + xb];
                }
            }
            if (node !== 0) {
                total += count[node];
            }
            // Insert x.
            count[1] += 1;
            node = 1;
            for (var b2 = BITS - 1; b2 >= 0; b2--) {
                var d = (x >>> b2) & 1;
                var nxt = child[node * 2 + d];
                if (nxt === 0) {
                    nodes += 1;
                    nxt = nodes;
                    child[node * 2 + d] = nxt;
                }
                node = nxt;
                count[node] += 1;
            }
        }
        return total;
    }
    var below = low > 0 ? pairsLe(low - 1) : 0;
    return pairsLe(high) - below;
};
