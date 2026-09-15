/**
 * @param {number} n
 * @return {number}
 */
var numberOfMatches = function (n) {
    // Play the rounds exactly as the statement prescribes: while more than
    // one team remains, the round plays Math.floor(teams / 2) matches — an
    // even field plays n / 2, an odd one (n - 1) / 2, both the floor half —
    // and advances that many winners plus the bye team, i.e.
    // Math.floor(teams / 2) + (teams % 2). n = 1 never enters the loop and
    // answers 0.
    let teams = n;
    let matches = 0;
    while (teams > 1) {
        matches += Math.floor(teams / 2);
        teams = Math.floor(teams / 2) + (teams % 2);
    }
    return matches;
};
