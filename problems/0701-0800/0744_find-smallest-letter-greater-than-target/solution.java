class Solution {

    public String nextGreatestLetter(String[] letters, String target) {
        // Upper bound over the half-open range [lo, hi): the first index
        // whose letter is strictly greater than target. The wrap below
        // handles the case where no letter qualifies.
        int lo = 0,
            hi = letters.length;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (letters[mid].compareTo(target) <= 0) {
                // At or below target — not strictly greater — so the answer
                // sits strictly right of mid.
                lo = mid + 1;
            } else {
                // letters[mid] > target keeps mid a live candidate.
                hi = mid;
            }
        }
        // No letter is strictly greater: wrap to the first letter.
        return lo < letters.length ? letters[lo] : letters[0];
    }
}
