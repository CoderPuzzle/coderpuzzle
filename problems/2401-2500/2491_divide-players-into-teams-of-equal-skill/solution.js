/**
 * @param {number[]} skill
 * @return {number}
 */
var dividePlayers = function (skill) {
    // The team total is fixed: the sum of all skills split evenly over
    // n / 2 teams. If the sum does not divide, no pairing can be even.
    // Otherwise the sorted array forces the weakest and strongest into
    // a team, which the two pointers check and price in one pass.
    // The answer is at most (n / 2) * 1000 * 1000 = 5e10 < 2^53, so the
    // plain-number accumulation stays exact.
    const n = skill.length;
    const teams = n / 2;
    const total = skill.reduce((a, b) => a + b, 0);
    if (total % teams !== 0) {
        return -1;
    }
    const target = total / teams;

    skill.sort((a, b) => a - b);
    let chemistry = 0;
    let i = 0;
    let j = n - 1;
    while (i < j) {
        if (skill[i] + skill[j] !== target) {
            return -1;
        }
        chemistry += skill[i] * skill[j];
        i++;
        j--;
    }
    return chemistry;
};
