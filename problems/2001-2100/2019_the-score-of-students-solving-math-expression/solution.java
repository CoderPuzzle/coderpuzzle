import java.util.HashSet;
import java.util.Set;

class Solution {

    public int scoreOfStudents(String s, int[] answers) {
        long correct = correctValue(s);
        int size = (s.length() + 1) / 2;
        int[] numbers = new int[size];
        char[] operators = new char[size - 1];
        for (int index = 0; index < size; ++index) {
            numbers[index] = s.charAt(index * 2) - '0';
            if (index + 1 < size) operators[index] = s.charAt(index * 2 + 1);
        }

        @SuppressWarnings("unchecked")
        Set<Integer>[][] dp = new Set[size][size];
        for (int index = 0; index < size; ++index) {
            dp[index][index] = new HashSet<>();
            dp[index][index].add(numbers[index]);
        }
        for (int length = 2; length <= size; ++length) {
            for (int left = 0; left + length <= size; ++left) {
                int right = left + length - 1;
                dp[left][right] = new HashSet<>();
                for (int split = left; split < right; ++split) {
                    for (int first : dp[left][split]) {
                        for (int second : dp[split + 1][right]) {
                            long value = operators[split] == '+' ? (long) first + second : (long) first * second;
                            if (value <= 1000) dp[left][right].add((int) value);
                        }
                    }
                }
            }
        }

        Set<Integer> possible = dp[0][size - 1];
        int score = 0;
        for (int answer : answers) {
            if (answer == correct) score += 5;
            else if (possible.contains(answer)) score += 2;
        }
        return score;
    }

    private long correctValue(String expression) {
        long total = 0;
        long product = expression.charAt(0) - '0';
        for (int index = 1; index < expression.length(); index += 2) {
            int value = expression.charAt(index + 1) - '0';
            if (expression.charAt(index) == '*') product *= value;
            else {
                total += product;
                product = value;
            }
        }
        return total + product;
    }
}
