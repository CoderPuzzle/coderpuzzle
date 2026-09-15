// Each group must land in a disjoint, in-order window of nums, and the
// earliest window always dominates: shifting a group onto its first
// still-legal occurrence never causes an overlap and only lengthens the
// suffix left for the groups behind it. So walk the groups in order with a
// cursor pos into nums, take the first start >= pos whose window compares
// equal element by element, advance the cursor past it, and fail as soon
// as a group has no window left.
function canChoose(groups: number[][], nums: number[]): boolean {
    let pos = 0;
    for (const group of groups) {
        const size = group.length;
        let start = pos;
        let found = false;
        while (start + size <= nums.length) {
            let i = 0;
            while (i < size && nums[start + i] === group[i]) {
                i += 1;
            }
            if (i === size) {
                found = true;
                break;
            }
            start += 1;
        }
        if (!found) {
            return false;
        }
        pos = start + size;
    }
    return true;
}
