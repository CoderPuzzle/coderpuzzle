class Solution {

    public int numWaterBottles(int numBottles, int numExchange) {
        // Every bottle is drunk exactly once, whether it started full or
        // was obtained by trading in empties. Track how many empties are
        // on hand and repeatedly trade in as many full groups as
        // possible.
        int drunk = numBottles;
        int empty = numBottles;
        while (empty >= numExchange) {
            int newFull = empty / numExchange;
            empty = (empty % numExchange) + newFull;
            drunk += newFull;
        }
        return drunk;
    }
}
