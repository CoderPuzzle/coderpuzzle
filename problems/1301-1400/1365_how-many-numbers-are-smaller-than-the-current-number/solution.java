class SmallerNumbersThanCurrent {

    public int[] smallerNumbersThanCurrent(int[] nums) {
        int[] counts = new int[101];
        for (int v : nums) counts[v] += 1;
        for (int v = 1; v <= 100; v++) counts[v] += counts[v - 1];
        int[] below = new int[101];
        for (int v = 1; v <= 100; v++) below[v] = counts[v - 1];
        int[] answer = new int[nums.length];
        for (int i = 0; i < nums.length; i++) answer[i] = below[nums[i]];
        return answer;
    }
}
