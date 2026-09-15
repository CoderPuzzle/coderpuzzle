/**
 * @param {number} n
 * @param {number[][]} paths
 * @return {number}
 */
var longestCommonSubpath = function (n, paths) {
    var k = paths.length;
    // Every sequence is glued into one text, closed by its own separator.
    // Separators sit strictly above every value in the text and are
    // pairwise distinct, so a separator can never line up with a value —
    // or with another separator — and a match between suffixes of two
    // sequences stops exactly at the sequence ends instead of leaking across
    // a boundary. The first separator sits just past the largest value in
    // play: the statement bounds values below n, and the measured maximum
    // keeps even an out-of-bounds value from colliding.
    var hi = -1;
    for (var g = 0; g < k; g++) {
        var gp = paths[g];
        for (var t = 0; t < gp.length; t++) {
            if (gp[t] > hi) hi = gp[t];
        }
    }
    var base = Math.max(n, hi + 1);
    var text = [];
    var owner = [];
    for (var i = 0; i < k; i++) {
        var path = paths[i];
        for (var j = 0; j < path.length; j++) {
            text.push(path[j]);
            owner.push(i);
        }
        text.push(base + i);
        owner.push(-1);
    }
    var total = text.length;

    // Rank of each suffix by its first symbol alone; ranks only need
    // relative order, so raw values serve.
    var rank = text.slice();
    var sa = [];
    for (var s = 0; s < total; s++) sa.push(s);

    // Doubling sort: after the pass with step k, ranks order prefixes of
    // length 2k, so ceil(log2 total) passes settle the whole suffix order.
    // Each pass sorts on one packed key: the current rank scaled past every
    // possible second component, plus the rank of the suffix k steps later,
    // with 0 standing in for "past the end" so a suffix that is a prefix of
    // a longer one ranks strictly below it. The packed key stays below
    // total^2, exact in a double for any input here.
    var key = new Array(total);
    var next = new Array(total);
    for (var step = 1; step < total; step *= 2) {
        for (var i2 = 0; i2 < total; i2++) {
            key[i2] = rank[i2] * (total + 1) + (i2 + step < total ? rank[i2 + step] + 1 : 0);
        }
        sa.sort(function (x, y) {
            return key[x] - key[y];
        });
        next[sa[0]] = 0;
        var classes = 0;
        for (var p = 1; p < total; p++) {
            if (key[sa[p]] !== key[sa[p - 1]]) classes++;
            next[sa[p]] = classes;
        }
        for (var i3 = 0; i3 < total; i3++) rank[i3] = next[i3];
        if (classes === total - 1) break; // every suffix distinct — the order is already final
    }

    // Kasai's scan: walk the text positions left to right, matching each
    // suffix against its predecessor in sorted order. Dropping a leading
    // symbol from both sides of a match shortens it by at most one, so a
    // single extending counter h that only ever retreats by one per step
    // settles every adjacent LCP within 2N symbol comparisons.
    var posOf = new Array(total);
    for (var p2 = 0; p2 < total; p2++) posOf[sa[p2]] = p2;
    var lcp = new Array(total).fill(0); // lcp[i] = shared prefix of sa[i-1] and sa[i]
    var h = 0;
    for (var i4 = 0; i4 < total; i4++) {
        if (posOf[i4] > 0) {
            var j2 = sa[posOf[i4] - 1];
            while (i4 + h < total && j2 + h < total && text[i4 + h] === text[j2 + h]) h++;
            lcp[posOf[i4]] = h;
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
    var seqOf = [];
    var spanLcp = [];
    var span = total;
    for (var q = 0; q < total; q++) {
        if (lcp[q] < span) span = lcp[q];
        var who = owner[sa[q]];
        if (who >= 0) {
            seqOf.push(who);
            spanLcp.push(span);
            span = total;
        }
    }
    var m = seqOf.length;

    // A segment shared by every sequence is a prefix shared by one suffix
    // of each sequence, and such suffixes occupy one contiguous block of
    // the sorted order — so the answer is the deepest window of the suffix
    // array that still holds a suffix from every sequence, its depth being
    // the minimum adjacent LCP inside it. Two pointers sweep the narrowest
    // covering windows (shrinking can only deepen the minimum), and a
    // monotonic deque carries that minimum at its front: each suffix enters
    // and leaves the window once.
    var best = 0;
    var cnt = new Array(k).fill(0);
    var have = 0;
    var left = 0;
    var window = []; // deque of spanLcp indices, values increasing; head is the front
    var head = 0;
    for (var right = 0; right < m; right++) {
        var who2 = seqOf[right];
        if (cnt[who2] === 0) have++;
        cnt[who2]++;
        while (window.length > head && spanLcp[window[window.length - 1]] >= spanLcp[right]) {
            window.pop();
        }
        window.push(right);
        while (have === k) {
            while (window.length > head && window[head] <= left) head++;
            if (window.length > head && spanLcp[window[head]] > best) {
                best = spanLcp[window[head]];
            }
            var gone = seqOf[left];
            cnt[gone]--;
            if (cnt[gone] === 0) have--;
            left++;
        }
    }
    return best;
};
