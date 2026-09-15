class Solution {
  public:
    string nextGreatestLetter(vector<string> &letters, string target) {
        // Upper bound over the half-open range [lo, hi): the first index
        // whose letter is strictly greater than target. The wrap below
        // handles the case where no letter qualifies.
        int lo = 0, hi = letters.size();
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (letters[mid] <= target) {
                // At or below target — not strictly greater — so the answer
                // sits strictly right of mid.
                lo = mid + 1;
            } else {
                // letters[mid] > target keeps mid a live candidate.
                hi = mid;
            }
        }
        // No letter is strictly greater: wrap to the first letter.
        return lo < (int)letters.size() ? letters[lo] : letters[0];
    }
};
