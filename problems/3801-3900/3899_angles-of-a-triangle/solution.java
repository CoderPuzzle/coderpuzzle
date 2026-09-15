import java.util.Arrays;

class Solution {

    public double[] internalAngles(int[] sides) {
        int[] ordered = sides.clone();
        Arrays.sort(ordered);
        if (ordered[0] + ordered[1] <= ordered[2]) return new double[] {};

        double[] result = new double[3];
        for (int i = 0; i < 3; ++i) {
            int opposite = ordered[i];
            int adjacent1 = ordered[(i + 1) % 3];
            int adjacent2 = ordered[(i + 2) % 3];
            double cosine =
                ((double) adjacent1 * adjacent1 + (double) adjacent2 * adjacent2 - (double) opposite * opposite) /
                (2.0 * adjacent1 * adjacent2);
            double angle = Math.toDegrees(Math.acos(Math.max(-1.0, Math.min(1.0, cosine))));
            result[i] = Math.round(angle * 100000.0) / 100000.0;
        }
        return result;
    }
}
