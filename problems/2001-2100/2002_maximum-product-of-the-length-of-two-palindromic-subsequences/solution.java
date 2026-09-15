class Solution {

    public int maxProduct(String s) {
        int size = 1 << s.length();
        int[] palindromeLength = new int[size];

        for (int mask = 1; mask < size; ++mask) {
            StringBuilder subsequence = new StringBuilder();
            for (int index = 0; index < s.length(); ++index) {
                if ((mask & (1 << index)) != 0) {
                    subsequence.append(s.charAt(index));
                }
            }
            boolean palindrome = true;
            for (int left = 0, right = subsequence.length() - 1; left < right; ++left, --right) {
                if (subsequence.charAt(left) != subsequence.charAt(right)) {
                    palindrome = false;
                    break;
                }
            }
            if (palindrome) {
                palindromeLength[mask] = subsequence.length();
            }
        }

        int answer = 0;
        int full = size - 1;
        for (int first = 1; first < size; ++first) {
            if (palindromeLength[first] == 0) continue;
            int remaining = full ^ first;
            for (int second = remaining; second != 0; second = (second - 1) & remaining) {
                answer = Math.max(answer, palindromeLength[first] * palindromeLength[second]);
            }
        }
        return answer;
    }
}
