/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
    // Start with the widest possible container, one pointer at each end.
    let left = 0,
        right = height.length - 1;
    let best = 0;
    while (left < right) {
        // Area = width x the shorter wall: water above it would spill.
        const area = (right - left) * Math.min(height[left], height[right]);
        if (area > best) best = area;
        // Moving the taller wall inward can never help -- the area stays
        // capped by the shorter wall while the width falls -- so the
        // shorter wall's current pair is the best it can ever be part of
        // and it is safe to discard. Ties move right, equally correct.
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return best;
};
