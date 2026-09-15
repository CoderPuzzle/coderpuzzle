function longestCommonSubpath(n: number, paths: number[][]): number {
    const k = paths.length;
    // Every sequence is glued into one text, closed by its own separator.
    // Separators sit strictly above every value in the text and are
    // pairwise distinct, so a separator can never line up with a value —
    // or with another separator — and a match between suffixes of two
    // sequences stops exactly at the sequence ends instead of leaking across
    // a boundary. The first separator sits just past the largest value in
    // play: the statement bounds values below n, and the measured maximum
    // keeps even an out-of-bounds value from colliding.
    let hi = -1;
    for (const p of paths) {
        for (const v of p) {
            if (v > hi) hi = v;
        }
    }
    const base = Math.max(n, hi + 1);
    const text: number[] = [];
    const owner: number[] = [];
    for (let i = 0; i < k; i++) {
        for (const v of paths[i]) {
            text.push(v);
            owner.push(i);
        }
        text.push(base + i);
        owner.push(-1);
    }
    const total = text.length;

    // Rank of each suffix by its first symbol alone; ranks only need
    // relative order, so raw values serve.
    const rank: number[] = text.slice();
    const sa: number[] = [];
    for (let i = 0; i < total; i++) sa.push(i);

    // Doubling sort: after the pass with step k, ranks order prefixes of
    // length 2k, so ceil(log2 total) passes settle the whole suffix order.
    // Each pass sorts on one packed key: the current rank scaled past every
    // possible second component, plus the rank of the suffix k steps later,
    // with 0 standing in for "past the end" so a suffix that is a prefix of
    // a longer one ranks strictly below it. The packed key stays below
    // total^2, exact in a double for any input here.
    const key: number[] = new Array(total);
    const next: number[] = new Array(total);
    for (let step = 1; step < total; step *= 2) {
        for (let i = 0; i < total; i++) {
            key[i] = rank[i] * (total + 1) + (i + step < total ? rank[i + step] + 1 : 0);
        }
        sa.sort((x, y) => key[x] - key[y]);
        next[sa[0]] = 0;
        let classes = 0;
        for (let p = 1; p < total; p++) {
            if (key[sa[p]] !== key[sa[p - 1]]) classes++;
            next[sa[p]] = classes;
        }
        for (let i = 0; i < total; i++) rank[i] = next[i];
        if (classes === total - 1) break; // every suffix distinct — the order is already final
    }

    // Kasai's scan: walk the text positions left to right, matching each
    // suffix against its predecessor in sorted order. Dropping a leading
    // symbol from both sides of a match shortens it by at most one, so a
    // single extending counter h that only ever retreats by one per step
    // settles every adjacent LCP within 2N symbol comparisons.
    const posOf: number[] = new Array(total);
    for (let p = 0; p < total; p++) posOf[sa[p]] = p;
    const lcp: number[] = new Array(total).fill(0); // lcp[i] = shared prefix of sa[i-1] and sa[i]
    let h = 0;
    for (let i = 0; i < total; i++) {
        if (posOf[i] > 0) {
            const j = sa[posOf[i] - 1];
            while (i + h < total && j + h < total && text[i + h] === text[j + h]) h++;
            lcp[posOf[i]] = h;
            if (h > 0) h--;
        } else {
            h = 0;
        }
    }

    // Suffixes that start on a separator cannot share even one symbol with
    // another suffix, so the sweep below keeps only suffixes that start on
    // a value. The LCP of consecutive kept suffixes is the minimum over the
    // span of dropped ones between them (the shared prefix of a sorted
    // range is the minimum of its adjacent LCPs), folded in one pass with
    // a running minimum.
    const seqOf: number[] = [];
    const spanLcp: number[] = [];
    let span = total;
    for (let i = 0; i < total; i++) {
        if (lcp[i] < span) span = lcp[i];
        const who = owner[sa[i]];
        if (who >= 0) {
            seqOf.push(who);
            spanLcp.push(span);
            span = total;
        }
    }
    const m = seqOf.length;

    // A segment shared by every sequence is a prefix shared by one suffix
    // of each sequence, and such suffixes occupy one contiguous block of
    // the sorted order — so the answer is the deepest window of the suffix
    // array that still holds a suffix from every sequence, its depth being
    // the minimum adjacent LCP inside it. Two pointers sweep the narrowest
    // covering windows (shrinking can only deepen the minimum), and a
    // monotonic deque carries that minimum at its front: each suffix enters
    // and leaves the window once.
    let best = 0;
    const cnt: number[] = new Array(k).fill(0);
    let have = 0;
    let left = 0;
    const window: number[] = []; // deque of spanLcp indices, values increasing; head is the front
    let head = 0;
    for (let right = 0; right < m; right++) {
        const who = seqOf[right];
        if (cnt[who] === 0) have++;
        cnt[who]++;
        while (window.length > head && spanLcp[window[window.length - 1]] >= spanLcp[right]) {
            window.pop();
        }
        window.push(right);
        while (have === k) {
            while (window.length > head && window[head] <= left) head++;
            if (window.length > head && spanLcp[window[head]] > best) {
                best = spanLcp[window[head]];
            }
            const gone = seqOf[left];
            cnt[gone]--;
            if (cnt[gone] === 0) have--;
            left++;
        }
    }
    return best;
}
