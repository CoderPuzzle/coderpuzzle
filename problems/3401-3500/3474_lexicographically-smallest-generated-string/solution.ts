function generateString(str1: string, str2: string): string {
    // 'T' windows pin their characters outright: stamp str2 into each
    // one, refusing the instance when two stamps disagree.
    const n = str1.length;
    const m = str2.length;
    const total = n + m - 1;
    const word: (string | null)[] = new Array(total).fill(null);
    const covered: boolean[] = new Array(total).fill(false);
    for (let i = 0; i < n; ++i) {
        if (str1[i] === "T") {
            for (let j = 0; j < m; ++j) {
                const p = i + j;
                if (word[p] !== null && word[p] !== str2[j]) return "";
                word[p] = str2[j];
                covered[p] = true;
            }
        }
    }
    // Every other position takes 'a', the smallest character available.
    for (let p = 0; p < total; ++p) {
        if (word[p] === null) word[p] = "a";
    }
    // Repair 'F' windows left to right: one that accidentally equals
    // str2 must differ somewhere, and bumping its rightmost free slot
    // from 'a' to 'b' is the smallest change that late in the string.
    for (let i = 0; i < n; ++i) {
        if (str1[i] === "F" && word.slice(i, i + m).join("") === str2) {
            let j = i + m - 1;
            while (j >= i && covered[j]) --j;
            if (j < i) return ""; // fully pinned window that still matches
            word[j] = "b";
        }
    }
    return word.join("");
}
