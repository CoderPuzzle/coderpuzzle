/**
 * @param {number} initialEnergy
 * @param {number} initialExperience
 * @param {number[]} energy
 * @param {number[]} experience
 * @return {number}
 */
var minNumberOfHours = function (initialEnergy, initialExperience, energy, experience) {
    // Energy only ever drains, so one shortfall computation covers
    // every fight; experience grows after each win, so top up just
    // enough whenever the next opponent is not strictly weaker.
    let hours = 0;
    let e = initialEnergy;
    let x = initialExperience;
    for (let i = 0; i < energy.length; ++i) {
        if (x <= experience[i]) {
            hours += experience[i] + 1 - x;
            x = experience[i] + 1;
        }
        x += experience[i];
        e -= energy[i];
    }
    if (e <= 0) {
        hours += 1 - e;
    }
    return hours;
};
