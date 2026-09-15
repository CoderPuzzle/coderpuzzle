class Solution {

    public String[] fizzBuzz(int n) {
        String[] answer = new String[n];
        for (int i = 1; i <= n; ++i) {
            // Each divisor appends its own word, so "FizzBuzz" emerges from
            // both checks passing and an empty build falls back to the
            // number itself — no branch ever enumerates all four cases.
            String entry = "";
            if (i % 3 == 0) {
                entry += "Fizz";
            }
            if (i % 5 == 0) {
                entry += "Buzz";
            }
            if (entry.isEmpty()) {
                answer[i - 1] = Integer.toString(i);
            } else {
                answer[i - 1] = entry;
            }
        }
        return answer;
    }
}
