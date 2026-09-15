class Solution {

    public int minNumberOfHours(int initialEnergy, int initialExperience, int[] energy, int[] experience) {
        // Energy only ever drains, so one shortfall computation covers
        // every fight; experience grows after each win, so top up just
        // enough whenever the next opponent is not strictly weaker.
        int hours = 0;
        int e = initialEnergy;
        int x = initialExperience;
        for (int i = 0; i < energy.length; ++i) {
            if (x <= experience[i]) {
                hours += experience[i] + 1 - x;
                x = experience[i] + 1;
            }
            x += experience[i];
            e -= energy[i];
        }
        if (e <= 0) {
            hours += 1 - e;
        }
        return hours;
    }
}
