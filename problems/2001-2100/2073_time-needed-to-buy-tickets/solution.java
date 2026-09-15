class Solution {

    public int timeRequiredToBuy(int[] tickets, int k) {
        int target = tickets[k];
        int elapsed = 0;
        for (int index = 0; index < tickets.length; index++) {
            if (index <= k) {
                elapsed += Math.min(tickets[index], target);
            } else {
                elapsed += Math.min(tickets[index], target - 1);
            }
        }
        return elapsed;
    }
}
