/**
 * @param {number} m
 * @param {number} n
 * @param {number[]} horizontalCut
 * @param {number[]} verticalCut
 * @return {number}
 */
var minimumCost = function (m, n, horizontalCut, verticalCut) {
    // A cut costs its base price times the pieces it crosses: one more
    // for every opposite-direction cut already made. An exchange argument
    // (swapping adjacent opposite cuts never helps unless the pricier one
    // goes first) makes "expensive cuts early" the optimal schedule.
    const hcuts = [...horizontalCut].sort((a, b) => b - a);
    const vcuts = [...verticalCut].sort((a, b) => b - a);
    let i = 0,
        j = 0;
    let hMade = 0,
        vMade = 0;
    let total = 0;
    // Two-pointer merge: always take the head with the larger base cost,
    // while its multiplier (opposite cuts made + 1) is still small.
    while (i < hcuts.length && j < vcuts.length) {
        // Ties (>=) may go to the horizontal head: equal base costs are
        // interchangeable in the exchange argument.
        if (hcuts[i] >= vcuts[j]) {
            total += hcuts[i] * (vMade + 1);
            i++;
            hMade++;
        } else {
            total += vcuts[j] * (hMade + 1);
            j++;
            vMade++;
        }
    }
    // One direction is drained, so the other's multiplier is now fixed.
    while (i < hcuts.length) {
        total += hcuts[i] * (vMade + 1);
        i++;
    }
    while (j < vcuts.length) {
        total += vcuts[j] * (hMade + 1);
        j++;
    }
    return total;
};
