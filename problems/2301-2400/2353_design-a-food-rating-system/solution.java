import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

class FoodRatings {

    private final Map<String, int[]> info = new HashMap<>(); // food -> {rating, cuisineId}
    private final Map<String, Integer> cuisineIds = new HashMap<>();
    private final List<String> cuisineNames = new ArrayList<>();
    private final List<PriorityQueue<int[]>> byCuisine = new ArrayList<>(); // {-rating, foodId}
    private final List<String> foodNames = new ArrayList<>();
    private final Map<String, Integer> foodIds = new HashMap<>();

    public FoodRatings(String[] foods, String[] cuisines, int[] ratings) {
        for (int index = 0; index < foods.length; index++) {
            Integer cuisineId = cuisineIds.get(cuisines[index]);
            if (cuisineId == null) {
                cuisineId = cuisineNames.size();
                cuisineIds.put(cuisines[index], cuisineId);
                cuisineNames.add(cuisines[index]);
                byCuisine.add(
                    new PriorityQueue<>((a, b) -> {
                        if (a[0] != b[0]) {
                            return Integer.compare(a[0], b[0]);
                        }
                        return foodNames.get(a[1]).compareTo(foodNames.get(b[1]));
                    })
                );
            }
            int foodId = foodNames.size();
            foodNames.add(foods[index]);
            foodIds.put(foods[index], foodId);
            info.put(foods[index], new int[] { ratings[index], cuisineId });
            // Heap min of {-rating, foodId} is exactly the required winner:
            // highest rating first, ties to the lexicographically smaller name.
            byCuisine.get(cuisineId).offer(new int[] { -ratings[index], foodId });
        }
    }

    public void changeRating(String food, int newRating) {
        // Lazy deletion: push a fresh entry and leave the outdated one in the
        // heap as garbage; only the info map holds the current rating.
        int[] record = info.get(food);
        record[0] = newRating;
        byCuisine.get(record[1]).offer(new int[] { -newRating, foodIds.get(food) });
    }

    public String highestRated(String cuisine) {
        PriorityQueue<int[]> heap = byCuisine.get(cuisineIds.get(cuisine));
        while (!heap.isEmpty()) {
            int[] top = heap.peek();
            // An entry is stale when its rating disagrees with the food's
            // current rating; a valid top is peeked, never consumed.
            if (info.get(foodNames.get(top[1]))[0] == -top[0]) {
                return foodNames.get(top[1]);
            }
            heap.poll();
        }
        return "";
    }
}
