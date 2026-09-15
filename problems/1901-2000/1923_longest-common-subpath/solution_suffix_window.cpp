class Solution {
  public:
    int longestCommonSubpath(int n, vector<vector<int>> &paths) {
        int k = (int)paths.size();
        // Every sequence is glued into one text, closed by its own
        // separator. Separators sit strictly above every value in the text
        // and are pairwise distinct, so a separator can never line up with
        // a value — or with another separator — and a match between
        // suffixes of two sequences stops exactly at the sequence ends
        // instead of leaking across a boundary. The first separator sits
        // just past the largest value in play: the statement bounds values
        // below n, and the measured maximum keeps even an out-of-bounds
        // value from colliding.
        int hi = -1;
        for (auto &p : paths)
            for (int v : p)
                hi = max(hi, v);
        int base = max(n, hi + 1);
        int total = k;
        for (auto &p : paths)
            total += (int)p.size();
        vector<int> text(total), owner(total); // owner: sequence index, -1 on separators
        int at = 0;
        for (int i = 0; i < k; i++) {
            for (int v : paths[i]) {
                text[at] = v;
                owner[at++] = i;
            }
            text[at] = base + i;
            owner[at++] = -1;
        }

        // Rank of each suffix by its first symbol alone; ranks only need
        // relative order, so raw values serve.
        vector<int> sa(total), rank = text, nextRank(total);
        for (int i = 0; i < total; i++)
            sa[i] = i;

        // Doubling sort: after the pass with step k, ranks order prefixes
        // of length 2k, so ceil(log2 total) passes settle the whole suffix
        // order. Each pass sorts on one packed key: the current rank scaled
        // past every possible second component, plus the rank of the suffix
        // k steps later, with 0 standing in for "past the end" so a suffix
        // that is a prefix of a longer one ranks strictly below it.
        vector<long long> key(total);
        for (int step = 1; step < total; step <<= 1) {
            for (int i = 0; i < total; i++)
                key[i] = (long long)rank[i] * (total + 1) + (i + step < total ? rank[i + step] + 1 : 0);
            sort(sa.begin(), sa.end(), [&](int x, int y) { return key[x] < key[y]; });
            nextRank[sa[0]] = 0;
            int classes = 0;
            for (int p = 1; p < total; p++) {
                if (key[sa[p]] != key[sa[p - 1]])
                    classes++;
                nextRank[sa[p]] = classes;
            }
            rank = nextRank;
            if (classes == total - 1)
                break; // every suffix distinct — the order is already final
        }

        // Kasai's scan: walk the text positions left to right, matching
        // each suffix against its predecessor in sorted order. Dropping a
        // leading symbol from both sides of a match shortens it by at most
        // one, so a single extending counter h that only ever retreats by
        // one per step settles every adjacent LCP within 2N symbol
        // comparisons.
        vector<int> posOf(total);
        for (int p = 0; p < total; p++)
            posOf[sa[p]] = p;
        vector<int> lcp(total, 0); // lcp[i] = shared prefix of sa[i-1] and sa[i]
        int h = 0;
        for (int i = 0; i < total; i++) {
            if (posOf[i] > 0) {
                int j = sa[posOf[i] - 1];
                while (i + h < total && j + h < total && text[i + h] == text[j + h])
                    h++;
                lcp[posOf[i]] = h;
                if (h > 0)
                    h--;
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
        vector<int> seqOf, spanLcp;
        seqOf.reserve(total);
        spanLcp.reserve(total);
        int span = total;
        for (int i = 0; i < total; i++) {
            if (lcp[i] < span)
                span = lcp[i];
            int who = owner[sa[i]];
            if (who >= 0) {
                seqOf.push_back(who);
                spanLcp.push_back(span);
                span = total;
            }
        }
        int m = (int)seqOf.size();

        // A segment shared by every sequence is a prefix shared by one
        // suffix of each sequence, and such suffixes occupy one contiguous
        // block of the sorted order — so the answer is the deepest window
        // of the suffix array that still holds a suffix from every
        // sequence, its depth being the minimum adjacent LCP inside it.
        // Two pointers sweep the narrowest covering windows (shrinking can
        // only deepen the minimum), and a monotonic deque carries that
        // minimum at its front: each suffix enters and leaves the window
        // once.
        int best = 0;
        vector<int> cnt(k, 0);
        int have = 0, left = 0;
        deque<int> window; // spanLcp indices, values increasing front to back
        for (int right = 0; right < m; right++) {
            int who = seqOf[right];
            if (cnt[who] == 0)
                have++;
            cnt[who]++;
            while (!window.empty() && spanLcp[window.back()] >= spanLcp[right])
                window.pop_back();
            window.push_back(right);
            while (have == k) {
                while (!window.empty() && window.front() <= left)
                    window.pop_front();
                if (!window.empty() && spanLcp[window.front()] > best)
                    best = spanLcp[window.front()];
                int gone = seqOf[left];
                cnt[gone]--;
                if (cnt[gone] == 0)
                    have--;
                left++;
            }
        }
        return best;
    }
};
