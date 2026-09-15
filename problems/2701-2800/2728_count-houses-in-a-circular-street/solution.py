class Solution:
    def houseCount(self, street: Street, k: int) -> int:
        # Sweep k consecutive houses, closing each door as we pass.
        # Since n <= k, that arc covers the whole circle, so every door
        # — whatever its initial state — ends closed.
        for _ in range(k):
            street.closeDoor()
            street.moveRight()
        # Reopen the house we stand on: it is now the street's ONLY
        # open door, a marker recognizable from anywhere on the circle.
        street.openDoor()
        # Walk right until the marker is re-sighted. The houses stepped
        # over before returning to it count the circumference exactly.
        count = 1
        street.moveRight()
        while not street.isDoorOpen():
            count += 1
            street.moveRight()
        return count
