/**
 * @param {number[][]} board
 * @return {number}
 */
var maximumValueSum = function (board) {
    const m = board.length;
    // Per row, only the three most valuable cells can ever matter: a rook
    // of an optimal placement sitting outside its row's top three swaps
    // into one of them — the three candidate columns face at most two
    // blocked ones, so some column is free and the swap never lowers the
    // sum.
    const tops = [];
    for (const row of board) {
        const cells = row.map((value, j) => [value, j]);
        cells.sort((a, b) => b[0] - a[0]);
        tops.push(cells.slice(0, 3));
    }

    // Row triples with one candidate each, pairwise-distinct columns.
    // Candidates are value-sorted, so combos run in decreasing partial-sum
    // order and a level is abandoned once even its best completion — the
    // other rows' top cells — cannot beat the answer. Sums reach
    // 3 * 10^9 in absolute value — exact under Number's 2^53 ceiling.
    let ans = -Infinity;
    for (let i = 0; i < m; ++i) {
        for (let j = i + 1; j < m; ++j) {
            const jTop = tops[j][0][0];
            for (let k = j + 1; k < m; ++k) {
                const kTop = tops[k][0][0];
                for (const [va, ca] of tops[i]) {
                    if (va + jTop + kTop <= ans) break;
                    for (const [vb, cb] of tops[j]) {
                        if (cb === ca) continue;
                        if (va + vb + kTop <= ans) break;
                        for (const [vc, cc] of tops[k]) {
                            if (cc === ca || cc === cb) continue;
                            if (va + vb + vc > ans) ans = va + vb + vc;
                            break;
                        }
                    }
                }
            }
        }
    }
    return ans;
};
