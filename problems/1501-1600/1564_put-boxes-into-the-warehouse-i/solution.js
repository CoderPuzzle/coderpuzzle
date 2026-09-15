/**
 * @param {number[]} boxes
 * @param {number[]} warehouse
 * @return {number}
 */
var maxBoxesInWarehouse = function (boxes, warehouse) {
    // A box entering from room 0 can only ever reach room i if every room
    // 0..i also let it through, so the height that actually matters at
    // position i is the prefix minimum of warehouse[0..i].
    const n = warehouse.length;
    const effective = new Array(n);
    let runningMin = warehouse[0];
    for (let i = 0; i < n; i++) {
        runningMin = Math.min(runningMin, warehouse[i]);
        effective[i] = runningMin;
    }

    // effective is non-increasing outward-to-inward, so read it from the
    // back (deepest room, smallest allowance) forward. Match it against
    // boxes sorted ascending: the smallest remaining box is the best fit
    // for the tightest remaining room.
    const sortedBoxes = [...boxes].sort((a, b) => a - b);
    let placed = 0;
    let j = 0;
    for (let i = n - 1; i >= 0; i--) {
        if (j >= sortedBoxes.length) break;
        if (sortedBoxes[j] <= effective[i]) {
            placed++;
            j++;
        }
    }
    return placed;
};
