class Solution {
    houseCount(street: Street, k: number): number {
        // Sweep k consecutive houses, closing each door as we pass.
        // Since n <= k, that arc covers the whole circle, so every door
        // — whatever its initial state — ends closed.
        for (let i = 0; i < k; i++) {
            street.closeDoor();
            street.moveRight();
        }
        // Reopen the house we stand on: it is now the street's ONLY
        // open door, a marker recognizable from anywhere on the circle.
        street.openDoor();
        // Walk right until the marker is re-sighted. The houses stepped
        // over before returning to it count the circumference exactly.
        let count = 1;
        street.moveRight();
        while (!street.isDoorOpen()) {
            count++;
            street.moveRight();
        }
        return count;
    }
}
