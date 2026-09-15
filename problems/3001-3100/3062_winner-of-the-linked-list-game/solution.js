/**
 * @param {ListNode} head
 * @return {string}
 */
var gameResult = function (head) {
    // The two values of a pair can never be equal: every even-indexed
    // value is even and every odd-indexed value is odd. One strict
    // comparison therefore always awards exactly one point per pair.
    let evenWins = 0;
    let oddWins = 0;
    for (let node = head; node !== null; node = node.next.next) {
        if (node.val > node.next.val) {
            evenWins++;
        } else {
            oddWins++;
        }
    }
    if (evenWins > oddWins) {
        return "Even";
    }
    if (oddWins > evenWins) {
        return "Odd";
    }
    return "Tie";
};
