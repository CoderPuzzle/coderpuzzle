class Solution {

    public int minMovesToMakePalindrome(String s) {
        char[] a = s.toCharArray();
        int moves = 0;
        int left = 0,
            right = a.length - 1;
        while (left < right) {
            if (a[left] == a[right]) {
                left += 1;
                right -= 1;
                continue;
            }
            // find rightmost occurrence of a[left] in (left, right]
            int k = right;
            while (k > left && a[k] != a[left]) {
                k -= 1;
            }
            if (k == left) {
                // a[left] is the lone middle character: nudge it one step inward
                char t = a[left];
                a[left] = a[left + 1];
                a[left + 1] = t;
                moves += 1;
            } else {
                // bubble a[k] rightward to position right
                while (k < right) {
                    char t = a[k];
                    a[k] = a[k + 1];
                    a[k + 1] = t;
                    k += 1;
                    moves += 1;
                }
                left += 1;
                right -= 1;
            }
        }
        return moves;
    }
}
