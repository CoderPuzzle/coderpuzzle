class Solution {
  public:
    int countDistinctIntegers(vector<int> &nums) {
        // The final array holds the originals plus one reversal per
        // original, so its distinct values are exactly the set
        // {originals} ∪ {reversals}. Reversal never changes the digit
        // count, so every value stays <= 10^6 and fits an int. Leading
        // zeros vanish naturally in the arithmetic reversal: appending
        // "0" first ("01" for 10) leaves a leading zero that adds nothing.
        unordered_set<int> seen;
        for (int value : nums) {
            seen.insert(value);
            long long reversed = 0;
            for (int rest = value; rest > 0; rest /= 10) {
                reversed = reversed * 10 + rest % 10;
            }
            seen.insert((int)reversed);
        }
        return (int)seen.size();
    }
};
