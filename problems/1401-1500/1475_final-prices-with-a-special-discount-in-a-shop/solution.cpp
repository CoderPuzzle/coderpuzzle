class Solution {
  public:
    vector<int> finalPrices(vector<int> &prices) {
        int n = prices.size();
        vector<int> answer = prices;
        vector<int> stack; // indices with pending discount
        for (int i = 0; i < n; i++) {
            int price = prices[i];
            while (!stack.empty() && prices[stack.back()] >= price) {
                answer[stack.back()] -= price;
                stack.pop_back();
            }
            stack.push_back(i);
        }
        return answer;
    }
};
