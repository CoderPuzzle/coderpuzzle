import java.util.*;

class Solution {

    public int latestTimeCatchTheBus(int[] buses, int[] passengers, int capacity) {
        Arrays.sort(buses);
        Arrays.sort(passengers);
        int boarded = 0;
        int j = 0;
        for (int bus : buses) {
            boarded = 0;
            while (j < passengers.length && boarded < capacity && passengers[j] <= bus) {
                j++;
                boarded++;
            }
        }
        int answer = boarded < capacity ? buses[buses.length - 1] : passengers[j - 1] - 1;
        Set<Integer> taken = new HashSet<>();
        for (int passenger : passengers) {
            taken.add(passenger);
        }
        while (taken.contains(answer)) {
            answer--;
        }
        return answer;
    }
}
