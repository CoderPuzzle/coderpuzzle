function canMakeSubsequence(s: string, t: string): boolean {
    const m = s.length;
    const n = t.length;
    const pref = new Array<number>(m + 1).fill(n + 1);
    pref[0] = 0;
    for (let i = 0; i < m; i++) {
        let j = pref[i];
        while (j < n && s[i] !== t[j]) j++;
        pref[i + 1] = j < n ? j + 1 : n + 1;
    }
    if (pref[m] <= n) return true;

    const suf = new Array<number>(m + 1).fill(-1);
    suf[m] = n;
    for (let i = m - 1; i >= 0; i--) {
        let j = suf[i + 1] - 1;
        while (j >= 0 && s[i] !== t[j]) j--;
        suf[i] = j;
    }

    for (let i = 0; i < m; i++) {
        if (pref[i] < suf[i + 1]) return true;
    }
    return false;
}
