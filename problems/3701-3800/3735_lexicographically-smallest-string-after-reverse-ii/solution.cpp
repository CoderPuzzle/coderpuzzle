class Solution {
  public:
    string lexSmallest(string s) {
        int n = s.size();
        string t(s.rbegin(), s.rend());
        // Double rolling hashes over s and over its reverse: each candidate
        // glues at most two slices of these two strings, so any candidate
        // prefix hashes in O(1) from the tables below. reverse(s[:k]) is the
        // slice of the reversed string at offset n-k; reverse(s[n-k:]) sits
        // at offset 0.
        const long long m1 = 1000000007LL, m2 = 998244353LL;
        const long long b1 = 131, b2 = 137;
        vector<long long> pw1(n + 1, 1), pw2(n + 1, 1);
        vector<long long> hs1(n + 1, 0), hs2(n + 1, 0);
        vector<long long> ht1(n + 1, 0), ht2(n + 1, 0);
        for (int i = 0; i < n; i++) {
            long long v = s[i] - 'a' + 1, w = t[i] - 'a' + 1;
            pw1[i + 1] = pw1[i] * b1 % m1;
            pw2[i + 1] = pw2[i] * b2 % m2;
            hs1[i + 1] = (hs1[i] * b1 + v) % m1;
            hs2[i + 1] = (hs2[i] * b2 + v) % m2;
            ht1[i + 1] = (ht1[i] * b1 + w) % m1;
            ht2[i + 1] = (ht2[i] * b2 + w) % m2;
        }
        auto sub_s = [&](int l, int length) {
            return make_pair((hs1[l + length] - hs1[l] * pw1[length] % m1 + m1) % m1,
                             (hs2[l + length] - hs2[l] * pw2[length] % m2 + m2) % m2);
        };
        auto sub_t = [&](int l, int length) {
            return make_pair((ht1[l + length] - ht1[l] * pw1[length] % m1 + m1) % m1,
                             (ht2[l + length] - ht2[l] * pw2[length] % m2 + m2) % m2);
        };
        // Hash pair of a candidate's first `length` characters: kind 0 is
        // reverse(s[:k]) + s[k:] (slices t[:k] then s[k:]), kind 1 is
        // s[:n-k] + reverse(s[n-k:]) (slices s[:head] then t[:head]).
        auto pref = [&](int kind, int k, int length) {
            if (kind == 0) {
                if (length <= k) {
                    return sub_t(n - k, length);
                }
                pair<long long, long long> a = sub_t(n - k, k), c = sub_s(k, length - k);
                return make_pair((a.first * pw1[length - k] + c.first) % m1,
                                 (a.second * pw2[length - k] + c.second) % m2);
            }
            int head = n - k;
            if (length <= head) {
                return sub_s(0, length);
            }
            pair<long long, long long> a = sub_s(0, head), c = sub_t(0, length - head);
            return make_pair((a.first * pw1[length - head] + c.first) % m1,
                             (a.second * pw2[length - head] + c.second) % m2);
        };
        auto char_at = [&](int kind, int k, int i) -> char {
            // Kind 0 walks the reversed prefix backwards through s; past the
            // boundary both kinds continue with s at the same index.
            if (kind == 0) {
                return i < k ? s[k - 1 - i] : s[i];
            }
            int head = n - k;
            return i < head ? s[i] : t[i - head];
        };
        int probe = min(n, 16);
        int best_kind = 0, best_k = -1;
        auto beats = [&](int kind, int k) {
            // True when this candidate sorts strictly before the champion.
            // Exact probe first: most contenders differ within a few chars.
            for (int i = 0; i < probe; i++) {
                char a = char_at(kind, k, i), c = char_at(best_kind, best_k, i);
                if (a != c) {
                    return a < c;
                }
            }
            // Indistinguishable near the front: settle the rest by hashed
            // longest-common-prefix binary search (probe chars already tie).
            int lo = probe, hi = n;
            while (lo < hi) {
                int mid = (lo + hi + 1) / 2;
                if (pref(kind, k, mid) == pref(best_kind, best_k, mid)) {
                    lo = mid;
                } else {
                    hi = mid - 1;
                }
            }
            if (lo == n) {
                return false;
            }
            return char_at(kind, k, lo) < char_at(best_kind, best_k, lo);
        };
        // Only candidates starting with the smallest letter can win.
        char smallest = *min_element(s.begin(), s.end());
        for (int i = 0; i < n; i++) {
            if (s[i] == smallest && (best_k < 0 || beats(0, i + 1))) {
                best_kind = 0;
                best_k = i + 1;
            }
        }
        if (s[0] == smallest) {
            for (int k = 2; k <= n; k++) {
                if (beats(1, k)) {
                    best_kind = 1;
                    best_k = k;
                }
            }
        }
        // Materialize only the winning candidate.
        if (best_kind == 0) {
            string head = s.substr(0, best_k);
            reverse(head.begin(), head.end());
            return head + s.substr(best_k);
        }
        string tail = s.substr(n - best_k);
        reverse(tail.begin(), tail.end());
        return s.substr(0, n - best_k) + tail;
    }
};
