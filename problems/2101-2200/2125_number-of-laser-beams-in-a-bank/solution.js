/**
 * @param {string[]} bank
 * @return {number}
 */
var numberOfBeams = function (bank) {
    let beams = 0;
    let previous = 0;
    for (const row of bank) {
        let devices = 0;
        for (const cell of row) {
            if (cell === "1") devices++;
        }
        if (devices > 0) {
            beams += previous * devices;
            previous = devices;
        }
    }
    return beams;
};
