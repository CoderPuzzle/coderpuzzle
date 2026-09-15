class Solution {

    public int[] finalPrices(int[] prices) {
        int n = prices.length;
        int[] answer = prices.clone();
        int[] stack = new int[n]; // indices with pending discount
        int top = 0;
        for (int i = 0; i < n; i++) {
            int price = prices[i];
            while (top > 0 && prices[stack[top - 1]] >= price) {
                answer[stack[--top]] -= price;
            }
            stack[top++] = i;
        }
        return answer;
    }
}
