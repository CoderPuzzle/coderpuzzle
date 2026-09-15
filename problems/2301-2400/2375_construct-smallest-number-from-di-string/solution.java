class Solution {

    public String smallestNumber(String pattern) {
        int n = pattern.length();
        StringBuilder result = new StringBuilder(n + 1);
        StringBuilder stack = new StringBuilder(n + 1);
        for (int i = 0; i <= n; i++) {
            // Push 1, 2, 3, ... while inside a 'D' run; the run's positions
            // get consecutive digits, the smallest possible pool.
            stack.append((char) ('1' + i));
            // An 'I' (or the end) terminates the current 'D' block; reversing
            // emits the block's digits in descending order, satisfying 'D'.
            if (i == n || pattern.charAt(i) == 'I') {
                result.append(stack.reverse());
                stack.setLength(0);
            }
        }
        return result.toString();
    }
}
