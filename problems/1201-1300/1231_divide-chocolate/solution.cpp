class Solution {
  public:
    int maximizeSweetness(vector<int> &sweetness, int k) {
        long long total = 0;
        for (int value : sweetness)
            total += value;

        // Binary search on the answer t: "can we get k+1 pieces each of
        // sweetness >= t?" is monotone in t. The average piece caps the range
        // above; every chunk is positive so t = 1 is always feasible.
        long long lo = 1;
        long long hi = total / (k + 1);
        long long best = 0;
        while (lo <= hi) {
            long long mid = (lo + hi) / 2;
            if (piecesAtLeast(sweetness, mid) >= k + 1) {
                // At least k+1 pieces: merging surplus neighbours only raises
                // their sums, so t is feasible — record it and aim higher.
                best = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return (int)best;
    }

  private:
    int piecesAtLeast(vector<int> &sweetness, long long target) {
        // Greedy check: cut as soon as the running sum reaches the target.
        // Cutting earlier never hurts — a delay only feeds an already-satisfied
        // piece and leaves less material for the remaining ones.
        int count = 0;
        long long current = 0;
        for (int value : sweetness) {
            current += value;
            if (current >= target) {
                count += 1;
                current = 0;
            }
        }
        return count;
    }
};
