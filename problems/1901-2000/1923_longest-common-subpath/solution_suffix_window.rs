use std::collections::VecDeque;

impl Solution {
    pub fn longest_common_subpath(n: i32, paths: Vec<Vec<i32>>) -> i32 {
        let k = paths.len();
        // Every sequence is glued into one text, closed by its own
        // separator. Separators sit strictly above every value in the text
        // and are pairwise distinct, so a separator can never line up with
        // a value — or with another separator — and a match between
        // suffixes of two sequences stops exactly at the sequence ends
        // instead of leaking across a boundary. The first separator sits
        // just past the largest value in play: the statement bounds values
        // below n, and the measured maximum keeps even an out-of-bounds
        // value from colliding.
        let mut hi: i32 = -1;
        for p in &paths {
            for &v in p {
                hi = hi.max(v);
            }
        }
        let base = (n as i64).max(hi as i64 + 1);
        let mut total = k;
        for p in &paths {
            total += p.len();
        }
        let mut text: Vec<i64> = Vec::with_capacity(total);
        let mut owner: Vec<i32> = Vec::with_capacity(total); // sequence index, -1 on separators
        for (i, path) in paths.iter().enumerate() {
            for &v in path {
                text.push(v as i64);
                owner.push(i as i32);
            }
            text.push(base + i as i64);
            owner.push(-1);
        }

        // Rank of each suffix by its first symbol alone; ranks only need
        // relative order, so raw values serve.
        let mut sa: Vec<usize> = (0..total).collect();
        let mut rank: Vec<i64> = text.clone();
        let mut next: Vec<i64> = vec![0; total];

        // Doubling sort: after the pass with step k, ranks order prefixes
        // of length 2k, so ceil(log2 total) passes settle the whole suffix
        // order. Each pass sorts on one packed key: the current rank scaled
        // past every possible second component, plus the rank of the suffix
        // k steps later, with 0 standing in for "past the end" so a suffix
        // that is a prefix of a longer one ranks strictly below it.
        let mut key: Vec<i64> = vec![0; total];
        let mut step = 1usize;
        while step < total {
            for i in 0..total {
                let second = if i + step < total { rank[i + step] + 1 } else { 0 };
                key[i] = rank[i] * (total as i64 + 1) + second;
            }
            sa.sort_by(|&x, &y| key[x].cmp(&key[y]));
            next[sa[0]] = 0;
            let mut classes: i64 = 0;
            for p in 1..total {
                if key[sa[p]] != key[sa[p - 1]] {
                    classes += 1;
                }
                next[sa[p]] = classes;
            }
            std::mem::swap(&mut rank, &mut next);
            if classes as usize == total - 1 {
                break; // every suffix distinct — the order is already final
            }
            step *= 2;
        }

        // Kasai's scan: walk the text positions left to right, matching
        // each suffix against its predecessor in sorted order. Dropping a
        // leading symbol from both sides of a match shortens it by at most
        // one, so a single extending counter h that only ever retreats by
        // one per step settles every adjacent LCP within 2N symbol
        // comparisons.
        let mut pos_of: Vec<usize> = vec![0; total];
        for (p, &i) in sa.iter().enumerate() {
            pos_of[i] = p;
        }
        let mut lcp: Vec<usize> = vec![0; total]; // lcp[i] = shared prefix of sa[i-1] and sa[i]
        let mut h = 0usize;
        for i in 0..total {
            if pos_of[i] > 0 {
                let j = sa[pos_of[i] - 1];
                while i + h < total && j + h < total && text[i + h] == text[j + h] {
                    h += 1;
                }
                lcp[pos_of[i]] = h;
                if h > 0 {
                    h -= 1;
                }
            } else {
                h = 0;
            }
        }

        // Suffixes that start on a separator cannot share even one symbol
        // with another suffix, so the sweep below keeps only suffixes that
        // start on a value. The LCP of consecutive kept suffixes is the
        // minimum over the span of dropped ones between them (the shared
        // prefix of a sorted range is the minimum of its adjacent LCPs),
        // folded in one pass with a running minimum.
        let mut seq_of: Vec<usize> = Vec::with_capacity(total);
        let mut span_lcp: Vec<usize> = Vec::with_capacity(total);
        let mut span = total;
        for i in 0..total {
            if lcp[i] < span {
                span = lcp[i];
            }
            let who = owner[sa[i]];
            if who >= 0 {
                seq_of.push(who as usize);
                span_lcp.push(span);
                span = total;
            }
        }
        let m = seq_of.len();

        // A segment shared by every sequence is a prefix shared by one
        // suffix of each sequence, and such suffixes occupy one contiguous
        // block of the sorted order — so the answer is the deepest window
        // of the suffix array that still holds a suffix from every
        // sequence, its depth being the minimum adjacent LCP inside it.
        // Two pointers sweep the narrowest covering windows (shrinking can
        // only deepen the minimum), and a monotonic deque carries that
        // minimum at its front: each suffix enters and leaves the window
        // once.
        let mut best = 0usize;
        let mut cnt = vec![0usize; k];
        let mut have = 0usize;
        let mut left = 0usize;
        let mut window: VecDeque<usize> = VecDeque::new(); // spanLcp indices, values increasing
        for right in 0..m {
            let who = seq_of[right];
            if cnt[who] == 0 {
                have += 1;
            }
            cnt[who] += 1;
            while window.back().map_or(false, |&b| span_lcp[b] >= span_lcp[right]) {
                window.pop_back();
            }
            window.push_back(right);
            while have == k {
                while window.front().map_or(false, |&f| f <= left) {
                    window.pop_front();
                }
                if let Some(&f) = window.front() {
                    if span_lcp[f] > best {
                        best = span_lcp[f];
                    }
                }
                let gone = seq_of[left];
                cnt[gone] -= 1;
                if cnt[gone] == 0 {
                    have -= 1;
                }
                left += 1;
            }
        }
        best as i32
    }
}
