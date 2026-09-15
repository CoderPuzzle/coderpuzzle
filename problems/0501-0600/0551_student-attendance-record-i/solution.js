/**
 * @param {string} s
 * @return {boolean}
 */
var checkRecord = function (s) {
    // Both criteria are about totals the record reveals day by day — how
    // many absences have piled up, and how long the current streak of
    // consecutive lates has grown — so one sweep decides everything.
    let absents = 0;
    let lates = 0;
    for (let i = 0; i < s.length; ++i) {
        const day = s.charAt(i);
        if (day === "A") {
            absents++;
            // An absent day is not a late day, so it also ends any
            // running streak of consecutive lates.
            lates = 0;
        } else if (day === "L") {
            lates++;
        } else {
            lates = 0;
        }
        // Fail the moment either criterion is breached — no later day
        // can repair a second absence or a third consecutive late.
        if (absents >= 2 || lates >= 3) {
            return false;
        }
    }
    return true;
};
