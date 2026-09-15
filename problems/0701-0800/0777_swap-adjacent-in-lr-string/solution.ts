// Walk both strings with two pointers, skipping the X's. The i-th letter of
// start must be the i-th letter of result — L's and R's never cross and
// never change kind — and each must move legally: an L only ever moves left
// onto an X, an R only right onto an X.
function canTransform(start: string, result: string): boolean {
    let i = 0;
    let j = 0;
    const n = start.length;
    const m = result.length;
    while (true) {
        while (i < n && start[i] === "X") {
            i++;
        }
        while (j < m && result[j] === "X") {
            j++;
        }
        if (i === n || j === m) {
            return i === n && j === m;
        }
        if (start[i] !== result[j]) {
            return false;
        }
        if (start[i] === "L" && j > i) {
            return false; // this L would have to move right
        }
        if (start[i] === "R" && j < i) {
            return false; // this R would have to move left
        }
        i++;
        j++;
    }
}
