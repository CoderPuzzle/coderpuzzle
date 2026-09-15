/**
 * @param {number} n
 * @param {number[][]} reservedSeats
 * @return {number}
 */
var maxNumberOfFamilies = function (n, reservedSeats) {
    const LEFT = 0b0000011110; // seats 2-5
    const RIGHT = 0b0111100000; // seats 6-9
    const MIDDLE = 0b0001111000; // seats 4-7
    const masks = new Map();
    for (const [row, seat] of reservedSeats) {
        masks.set(row, (masks.get(row) ?? 0) | (1 << (seat - 1)));
    }
    let groups = 2 * (n - masks.size);
    for (const mask of masks.values()) {
        if ((mask & (LEFT | RIGHT)) === 0) {
            groups += 2;
        } else if ((mask & LEFT) === 0 || (mask & MIDDLE) === 0 || (mask & RIGHT) === 0) {
            groups += 1;
        }
    }
    return groups;
};
