class Solution {
  public:
    int longestDecomposition(string text) {
        int n = text.size();
        int count = 0;
        int left = 0;
        int right = n;
        while (left < right) {
            int size = 1;
            bool matched = false;
            // prefix and suffix of equal size must not overlap
            while (left + size <= right - size) {
                if (text.compare(left, size, text, right - size, size) == 0) {
                    // shortest matching pair first: an exchange argument
                    // shows splitting a longer pair here never lowers the count
                    count += 2;
                    left += size;
                    right -= size;
                    matched = true;
                    break;
                }
                size += 1;
            }
            if (!matched) {
                // no size pairs: the entire remainder is one final chunk
                count += 1;
                break;
            }
        }
        return count;
    }
};
