class Solution {

    public int minLights(int[] lights) {
        int n = lights.length;
        int[] diff = new int[n + 1];
        for (int i = 0; i < n; i++) {
            if (lights[i] == 0) continue;
            int left = Math.max(0, i - lights[i]);
            int right = Math.min(n - 1, i + lights[i]);
            diff[left]++;
            diff[right + 1]--;
        }
        boolean[] covered = new boolean[n];
        int current = 0;
        for (int i = 0; i < n; i++) {
            current += diff[i];
            covered[i] = current > 0;
        }

        int answer = 0;
        for (int i = 0; i < n; i++) {
            if (!covered[i]) {
                answer++;
                int end = Math.min(n - 1, i + 2);
                for (int j = i; j <= end; j++) covered[j] = true;
                i = end;
            }
        }
        return answer;
    }
}
