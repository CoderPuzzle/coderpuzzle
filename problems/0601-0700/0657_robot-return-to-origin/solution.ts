// Vertical and horizontal movement never interact, so the plane splits
// into two independent lines: the U/D balance and the L/R balance. One
// sweep with two counters captures all there is to check.
function judgeCircle(moves: string): boolean {
    let vertical = 0;
    let horizontal = 0;
    for (let i = 0; i < moves.length; ++i) {
        const ch = moves[i];
        if (ch === "U") {
            vertical++;
        } else if (ch === "D") {
            vertical--;
        } else if (ch === "L") {
            horizontal--;
        } else {
            horizontal++;
        }
    }
    // The robot is home exactly when both counters cancel to zero; a
    // leftover on either axis leaves it displaced no matter how the
    // moves were ordered.
    return vertical === 0 && horizontal === 0;
}
