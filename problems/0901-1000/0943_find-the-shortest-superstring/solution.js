/**
 * @param {string[]} words
 * @return {string}
 */
var shortestSuperstring = function (words) {
    var k = words.length;
    var overlap = [];
    for (var i = 0; i < k; i++) {
        overlap.push(new Array(k).fill(0));
    }
    for (var a = 0; a < k; a++) {
        for (var b = 0; b < k; b++) {
            if (a === b) continue;
            var best = 0;
            var limit = Math.min(words[a].length, words[b].length);
            for (var size = 1; size <= limit; size++) {
                if (words[a].slice(words[a].length - size) === words[b].slice(0, size)) {
                    best = size;
                }
            }
            overlap[a][b] = best;
        }
    }

    function seqLess(x, y) {
        for (var q = 0; q < x.length; q++) {
            if (x[q] !== y[q]) return x[q] < y[q];
        }
        return false;
    }

    var total = 1 << k;
    var dpLen = [];
    var dpStr = [];
    var dpSeq = [];
    for (var m = 0; m < total; m++) {
        dpLen.push(new Array(k).fill(-1));
        dpStr.push(new Array(k).fill(null));
        dpSeq.push(new Array(k).fill(null));
    }
    for (var w = 0; w < k; w++) {
        dpLen[1 << w][w] = words[w].length;
        dpStr[1 << w][w] = words[w];
        dpSeq[1 << w][w] = [w];
    }

    for (var mask = 0; mask < total; mask++) {
        for (var j = 0; j < k; j++) {
            if (dpStr[mask][j] === null) continue;
            var curLen = dpLen[mask][j];
            var curStr = dpStr[mask][j];
            var curSeq = dpSeq[mask][j];
            for (var nxt = 0; nxt < k; nxt++) {
                if (((mask >> nxt) & 1) !== 0) continue;
                var candLen = curLen + words[nxt].length - overlap[j][nxt];
                var candStr = curStr + words[nxt].slice(overlap[j][nxt]);
                var candSeq = curSeq.concat([nxt]);
                var newMask = mask | (1 << nxt);
                if (
                    dpStr[newMask][nxt] === null ||
                    candLen < dpLen[newMask][nxt] ||
                    (candLen === dpLen[newMask][nxt] && seqLess(candSeq, dpSeq[newMask][nxt]))
                ) {
                    dpLen[newMask][nxt] = candLen;
                    dpStr[newMask][nxt] = candStr;
                    dpSeq[newMask][nxt] = candSeq;
                }
            }
        }
    }

    var full = total - 1;
    var bestJ = -1;
    for (var z = 0; z < k; z++) {
        if (dpStr[full][z] === null) continue;
        if (
            bestJ === -1 ||
            dpLen[full][z] < dpLen[full][bestJ] ||
            (dpLen[full][z] === dpLen[full][bestJ] && seqLess(dpSeq[full][z], dpSeq[full][bestJ]))
        ) {
            bestJ = z;
        }
    }
    return dpStr[full][bestJ];
};
