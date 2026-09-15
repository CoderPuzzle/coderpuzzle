/**
 * @param {string} board
 * @param {string} hand
 * @return {number}
 */
var findMinStep = function (board, hand) {
    // Memoized search over (row, remaining hand). Only balls inserted
    // directly alongside a same-colored run are tried: a ball dropped
    // between foreign colors cannot join a removal before its neighbors
    // merge, so deferring its insertion to that merge never costs more.
    const colors = "RYBGW";
    const counts = [0, 0, 0, 0, 0];
    for (const ch of hand) {
        counts[colors.indexOf(ch)] += 1;
    }
    const memo = new Map();
    const impossible = 100; // above any answer: the hand holds at most 5 balls

    // The cascade as a pure function: one pass drops every maximal run of
    // three or more, the loop settles the joins that their removal opens up.
    function clean(row) {
        let removed = true;
        while (removed) {
            removed = false;
            const kept = [];
            let i = 0;
            while (i < row.length) {
                let j = i;
                while (j < row.length && row[j] === row[i]) {
                    j += 1;
                }
                if (j - i < 3) {
                    kept.push(row.slice(i, j));
                } else {
                    removed = true;
                }
                i = j;
            }
            row = kept.join("");
        }
        return row;
    }

    // Row + "|" + the five hand counts keys the memo; the counts stay
    // single-digit (the hand holds at most 5 balls), so the concatenation
    // is unambiguous.
    function solve(row, remaining) {
        if (row === "") {
            return 0;
        }
        const key = row + "|" + remaining.join("");
        if (memo.has(key)) {
            return memo.get(key);
        }
        let best = impossible;
        let i = 0;
        while (i < row.length) {
            let j = i;
            while (j < row.length && row[j] === row[i]) {
                j += 1;
            }
            const color = colors.indexOf(row[i]);
            if (remaining[color] > 0) {
                // One canonical gap per run: sliding the ball along the run
                // it joins produces the identical next row.
                remaining[color] -= 1;
                best = Math.min(best, solve(clean(row.slice(0, i) + row[i] + row.slice(i)), remaining) + 1);
                remaining[color] += 1;
            }
            i = j;
        }
        memo.set(key, best);
        return best;
    }

    const best = solve(board, counts);
    return best < impossible ? best : -1;
};
