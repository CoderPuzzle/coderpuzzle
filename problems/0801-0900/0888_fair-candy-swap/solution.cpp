class Solution {
  public:
    vector<int> fairCandySwap(vector<int> &aliceSizes, vector<int> &bobSizes) {
        // Swapping Alice's box a for Bob's box b leaves both totals equal
        // exactly when sumA - a + b == sumB - b + a, which rearranges to
        // b == a - delta with delta = (sumA - sumB) / 2. A hash set of
        // Bob's boxes answers each candidate in O(1), and one scan that
        // keeps the smallest matching pair (a first, then b) yields the
        // statement's pinned answer.
        long long aliceTotal = 0;
        for (int size : aliceSizes) {
            aliceTotal += size;
        }
        long long bobTotal = 0;
        for (int size : bobSizes) {
            bobTotal += size;
        }
        long long delta = (aliceTotal - bobTotal) / 2;
        unordered_set<long long> bobBoxes;
        for (int size : bobSizes) {
            bobBoxes.insert(size);
        }
        pair<long long, long long> best;
        bool found = false;
        for (int size : aliceSizes) {
            long long b = size - delta;
            pair<long long, long long> candidate(size, b);
            if (bobBoxes.count(b) && (!found || candidate < best)) {
                best = candidate;
                found = true;
            }
        }
        if (!found) {
            return {};
        }
        return {(int)best.first, (int)best.second};
    }
};
