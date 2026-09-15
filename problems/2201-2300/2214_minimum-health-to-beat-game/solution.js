/**
 * @param {number[]} damage
 * @param {number} armor
 * @return {number}
 */
var minimumHealth = function (damage, armor) {
    // Total damage must be survived with health to spare, and the one armor
    // use erases min(armor, worst level) of it.
    let total = 0;
    let worst = 0;
    for (const hit of damage) {
        total += hit;
        if (hit > worst) {
            worst = hit;
        }
    }
    // total tops out at 1e5 * 1e5 = 1e10 < 2^53, so plain number addition
    // stays exact
    return total + 1 - Math.min(armor, worst);
};
