class Solution {

    public int countPrefixSuffixPairs(String[] words) {
        int total = 0;
        for (int i = 0; i < words.length; ++i) {
            for (int j = i + 1; j < words.length; ++j) {
                if (isPrefixAndSuffix(words[i], words[j])) {
                    ++total;
                }
            }
        }
        return total;
    }

    private boolean isPrefixAndSuffix(String str1, String str2) {
        int size1 = str1.length();
        int size2 = str2.length();
        if (size1 > size2) {
            return false;
        }
        for (int index = 0; index < size1; ++index) {
            if (str1.charAt(index) != str2.charAt(index)) {
                return false;
            }
            if (str1.charAt(index) != str2.charAt(size2 - size1 + index)) {
                return false;
            }
        }
        return true;
    }
}
