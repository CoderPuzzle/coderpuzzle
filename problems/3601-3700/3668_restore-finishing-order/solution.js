/**
 * @param {number[]} order
 * @param {number[]} friends
 * @return {number[]}
 */
var recoverOrder = function (order, friends) {
    // The roster is capped at eight ids, so a Set answers every membership
    // test in O(1) expected time; the ids stay exact numbers as set keys.
    const wanted = new Set(friends);
    // Scanning order left to right makes the kept ids emerge already in
    // finishing order -- no sorting step is needed.
    return order.filter((racer) => wanted.has(racer));
};
