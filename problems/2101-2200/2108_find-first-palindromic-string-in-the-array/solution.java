class Solution {

    public String firstPalindrome(String[] words) {
        for (String word : words) {
            int left = 0;
            int right = word.length() - 1;
            while (left < right && word.charAt(left) == word.charAt(right)) {
                left++;
                right--;
            }
            if (left >= right) return word;
        }
        return "";
    }
}
