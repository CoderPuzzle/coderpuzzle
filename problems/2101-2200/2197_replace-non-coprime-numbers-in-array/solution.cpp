class Solution {
  public:
    vector<int> replaceNonCoprimes(vector<int> &nums) {
        vector<int> stack;
        for (int num : nums) {
            long long current = num;
            // keep absorbing into `current` while it shares a factor with
            // the processed value to its left
            while (!stack.empty() && gcd((long long)stack.back(), current) > 1) {
                long long top = stack.back();
                stack.pop_back();
                current = top / gcd(top, current) * current;
            }
            stack.push_back((int)current);
        }
        return stack;
    }
};
