class Solution {

    public String makeSmallestPalindrome(String s) {
        // A mismatched mirror pair needs one rewrite whichever letter wins;
        // keeping the smaller is never worse for any earlier position.
        char[] chars = s.toCharArray();
        int left = 0,
            right = chars.length - 1;
        while (left < right) {
            if (chars[left] != chars[right]) {
                char keep = chars[left] < chars[right] ? chars[left] : chars[right];
                chars[left] = keep;
                chars[right] = keep;
            }
            left++;
            right--;
        }
        return new String(chars);
    }
}
