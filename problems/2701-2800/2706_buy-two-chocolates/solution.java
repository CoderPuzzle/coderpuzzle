class Solution {

    public int buyChoco(int[] prices, int money) {
        // The cheapest pair is the two smallest prices; one pass tracks
        // them without sorting.
        int first = 101;
        int second = 101;
        for (int price : prices) {
            if (price < first) {
                second = first;
                first = price;
            } else if (price < second) {
                second = price;
            }
        }
        if (first + second > money) {
            return money;
        }
        return money - first - second;
    }
}
