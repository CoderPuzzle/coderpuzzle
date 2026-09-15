function shortestSuperstring(words: string[]): string {
    const k = words.length;
    const overlap: number[][] = [];
    for (let i = 0; i < k; i++) overlap.push(new Array(k).fill(0));
    for (let i = 0; i < k; i++) {
        for (let j = 0; j < k; j++) {
            if (i === j) continue;
            let best = 0;
            const limit = Math.min(words[i].length, words[j].length);
            for (let size = 1; size <= limit; size++) {
                if (words[i].slice(words[i].length - size) === words[j].slice(0, size)) {
                    best = size;
                }
            }
            overlap[i][j] = best;
        }
    }

    function seqLess(x: number[], y: number[]): boolean {
        for (let q = 0; q < x.length; q++) {
            if (x[q] !== y[q]) return x[q] < y[q];
        }
        return false;
    }

    const total = 1 << k;
    const dpLen: number[][] = [];
    const dpStr: (string | null)[][] = [];
    const dpSeq: (number[] | null)[][] = [];
    for (let m = 0; m < total; m++) {
        dpLen.push(new Array(k).fill(-1));
        dpStr.push(new Array(k).fill(null));
        dpSeq.push(new Array(k).fill(null));
    }
    for (let i = 0; i < k; i++) {
        dpLen[1 << i][i] = words[i].length;
        dpStr[1 << i][i] = words[i];
        dpSeq[1 << i][i] = [i];
    }

    for (let mask = 0; mask < total; mask++) {
        for (let j = 0; j < k; j++) {
            if (dpStr[mask][j] === null) continue;
            const curLen = dpLen[mask][j];
            const curStr = dpStr[mask][j] as string;
            const curSeq = dpSeq[mask][j] as number[];
            for (let nxt = 0; nxt < k; nxt++) {
                if (((mask >> nxt) & 1) !== 0) continue;
                const candLen = curLen + words[nxt].length - overlap[j][nxt];
                const candStr = curStr + words[nxt].slice(overlap[j][nxt]);
                const candSeq = curSeq.concat([nxt]);
                const newMask = mask | (1 << nxt);
                const exLen = dpLen[newMask][nxt];
                if (
                    dpStr[newMask][nxt] === null ||
                    candLen < exLen ||
                    (candLen === exLen && seqLess(candSeq, dpSeq[newMask][nxt] as number[]))
                ) {
                    dpLen[newMask][nxt] = candLen;
                    dpStr[newMask][nxt] = candStr;
                    dpSeq[newMask][nxt] = candSeq;
                }
            }
        }
    }

    const full = total - 1;
    let bestJ = -1;
    for (let j = 0; j < k; j++) {
        if (dpStr[full][j] === null) continue;
        if (
            bestJ === -1 ||
            dpLen[full][j] < dpLen[full][bestJ] ||
            (dpLen[full][j] === dpLen[full][bestJ] &&
                seqLess(dpSeq[full][j] as number[], dpSeq[full][bestJ] as number[]))
        ) {
            bestJ = j;
        }
    }
    return dpStr[full][bestJ] as string;
}
