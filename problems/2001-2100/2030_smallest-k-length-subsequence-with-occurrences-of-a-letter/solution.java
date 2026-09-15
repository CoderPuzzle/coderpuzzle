class Solution {

    public String smallestSubsequence(String s, int k, String letter, int repetition) {
        int n = s.length();
        char target = letter.charAt(0);
        // suffix[i] = number of `letter` occurrences in s[i:]
        int[] suffix = new int[n + 1];
        for (int i = n - 1; i >= 0; i--) {
            suffix[i] = suffix[i + 1] + (s.charAt(i) == target ? 1 : 0);
        }

        StringBuilder stack = new StringBuilder();
        int used = 0; // number of `letter` currently in the stack
        for (int i = 0; i < n; i++) {
            char ch = s.charAt(i);
            while (stack.length() > 0) {
                char top = stack.charAt(stack.length() - 1);
                if (top <= ch) {
                    break;
                }
                if (stack.length() - 1 + (n - i) < k) {
                    break;
                }
                int lettersAfterPop = used - (top == target ? 1 : 0);
                lettersAfterPop += ch == target ? 1 : 0;
                if (lettersAfterPop + suffix[i + 1] < repetition) {
                    break;
                }
                stack.deleteCharAt(stack.length() - 1);
                if (top == target) {
                    used--;
                }
            }
            stack.append(ch);
            if (ch == target) {
                used++;
            }
        }

        // Trim to exactly length k from the right, never dropping below
        // `repetition` target letters.
        int remove = stack.length() - k;
        int lettersInStack = used;
        StringBuilder res = new StringBuilder();
        for (int p = stack.length() - 1; p >= 0; p--) {
            char ch = stack.charAt(p);
            if (remove == 0) {
                res.append(ch);
            } else if (ch == target) {
                if (lettersInStack - 1 >= repetition) {
                    lettersInStack--;
                    remove--;
                } else {
                    res.append(ch);
                }
            } else {
                remove--;
            }
        }
        return res.reverse().toString();
    }
}
