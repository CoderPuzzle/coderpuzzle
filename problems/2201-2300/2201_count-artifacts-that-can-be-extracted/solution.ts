// Mark every excavated cell once in a boolean grid, then each rectangle test
// is a constant-time lookup per cell — dig is never rescanned.
function digArtifacts(n: number, artifacts: number[][], dig: number[][]): number {
    const dug: boolean[][] = Array.from({ length: n }, () => new Array(n).fill(false));
    for (const [r, c] of dig) {
        dug[r][c] = true;
    }
    let extracted = 0;
    for (const [r1, c1, r2, c2] of artifacts) {
        let complete = true;
        for (let r = r1; r <= r2 && complete; r++) {
            for (let c = c1; c <= c2; c++) {
                if (!dug[r][c]) {
                    complete = false;
                    break;
                }
            }
        }
        if (complete) {
            extracted++;
        }
    }
    return extracted;
}
