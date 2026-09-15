class Solution {
  public:
    vector<string> fizzBuzz(int n) {
        vector<string> answer;
        answer.reserve(n);
        for (int i = 1; i <= n; ++i) {
            // Each divisor appends its own word, so "FizzBuzz" emerges from
            // both checks passing and an empty build falls back to the
            // number itself — no branch ever enumerates all four cases.
            string entry;
            if (i % 3 == 0) {
                entry += "Fizz";
            }
            if (i % 5 == 0) {
                entry += "Buzz";
            }
            if (entry.empty()) {
                answer.push_back(to_string(i));
            } else {
                answer.push_back(entry);
            }
        }
        return answer;
    }
};
