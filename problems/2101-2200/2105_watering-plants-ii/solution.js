/**
 * @param {number[]} plants
 * @param {number} capacityA
 * @param {number} capacityB
 * @return {number}
 */
var minimumRefill = function (plants, capacityA, capacityB) {
    let left = 0;
    let right = plants.length - 1;
    let remainingA = capacityA;
    let remainingB = capacityB;
    let refills = 0;

    while (left < right) {
        if (remainingA < plants[left]) {
            remainingA = capacityA;
            refills++;
        }
        remainingA -= plants[left];

        if (remainingB < plants[right]) {
            remainingB = capacityB;
            refills++;
        }
        remainingB -= plants[right];
        left++;
        right--;
    }

    if (left === right && Math.max(remainingA, remainingB) < plants[left]) {
        refills++;
    }
    return refills;
};
