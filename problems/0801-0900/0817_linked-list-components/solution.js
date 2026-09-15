/**
 * @param {ListNode} head
 * @param {number[]} nums
 * @return {number}
 */
var numComponents = function (head, nums) {
    // O(1) membership tests: the set holds every value of nums once.
    const wanted = new Set(nums);
    let components = 0;
    let previousIn = false;
    for (let node = head; node !== null; node = node.next) {
        const currentIn = wanted.has(node.val);
        // A component starts exactly where membership turns on: this
        // node is in nums and its predecessor was not. The initial
        // false flag folds the head into the same rule — no predecessor.
        if (currentIn && !previousIn) {
            components += 1;
        }
        previousIn = currentIn;
    }
    return components;
};
