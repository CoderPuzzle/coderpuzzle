function minDominoRotations(tops: number[], bottoms: number[]): number {
    // For candidate value x, one pass decides whether every domino can
    // show x on some face, and if so, the cheaper of "rotate x onto every
    // top" vs "rotate x onto every bottom".
    function check(x: number): number {
        let rotationsTop = 0;
        let rotationsBottom = 0;
        for (let i = 0; i < tops.length; i++) {
            if (tops[i] !== x && bottoms[i] !== x) {
                return -1;
            } else if (tops[i] !== x) {
                rotationsTop++;
            } else if (bottoms[i] !== x) {
                rotationsBottom++;
            }
        }
        return Math.min(rotationsTop, rotationsBottom);
    }

    // Only tops[0] or bottoms[0] can ever fill a whole row, since the
    // very first domino must already carry the value on one face.
    const result = check(tops[0]);
    if (result !== -1 || tops[0] === bottoms[0]) {
        return result;
    }
    return check(bottoms[0]);
}
