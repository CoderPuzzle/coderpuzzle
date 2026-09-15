class Solution {

    public int longestDecomposition(String text) {
        int n = text.length();
        int count = 0;
        int left = 0;
        int right = n;
        while (left < right) {
            int size = 1;
            boolean matched = false;
            // prefix and suffix of equal size must not overlap
            while (left + size <= right - size) {
                if (text.substring(left, left + size).equals(text.substring(right - size, right))) {
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
}
