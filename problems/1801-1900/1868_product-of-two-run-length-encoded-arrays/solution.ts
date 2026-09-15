function findRLEArray(encoded1: number[][], encoded2: number[][]): number[][] {
    // Walk both encodings with running remainders; each step consumes
    // min(remaining1, remaining2) positions and emits one product run, and
    // merging into the previous run when the product repeats. Values stay
    // exact: products top out at 10^4 * 10^4 = 10^8.
    const out: number[][] = [];
    let i = 0;
    let j = 0;
    let rem1 = encoded1[0][1];
    let rem2 = encoded2[0][1];
    for (;;) {
        const take = Math.min(rem1, rem2);
        const val = encoded1[i][0] * encoded2[j][0];
        if (out.length > 0 && out[out.length - 1][0] === val) {
            out[out.length - 1][1] += take;
        } else {
            out.push([val, take]);
        }
        rem1 -= take;
        rem2 -= take;
        if (rem1 === 0) {
            i++;
            if (i === encoded1.length) {
                break;
            }
            rem1 = encoded1[i][1];
        }
        if (rem2 === 0) {
            j++;
            if (j === encoded2.length) {
                break;
            }
            rem2 = encoded2[j][1];
        }
    }
    return out;
}
