class Solution {

    public String reversePrefix(String s, int k) {
        // Mutable buffer; two pointers close on the middle of the prefix.
        char[] chars = s.toCharArray();
        int left = 0;
        int right = k - 1;
        while (left < right) {
            char tmp = chars[left];
            chars[left] = chars[right];
            chars[right] = tmp;
            left++;
            right--;
        }
        return new String(chars);
    }
}
