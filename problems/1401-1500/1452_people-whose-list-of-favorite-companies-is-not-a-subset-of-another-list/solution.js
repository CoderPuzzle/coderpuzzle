/**
 * @param {string[][]} favoriteCompanies
 * @return {number[]}
 */
var peopleIndexes = function (favoriteCompanies) {
    const sets = favoriteCompanies.map((companies) => new Set(companies));
    const result = [];
    for (let i = 0; i < sets.length; i++) {
        const small = sets[i];
        let covered = false;
        for (let j = 0; j < sets.length && !covered; j++) {
            if (i === j || sets[j].size <= small.size) {
                continue;
            }
            covered = favoriteCompanies[i].every((company) => sets[j].has(company));
        }
        if (!covered) {
            result.push(i);
        }
    }
    return result;
};
