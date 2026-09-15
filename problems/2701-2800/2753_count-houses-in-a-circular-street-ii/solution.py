class Solution:
    def houseCount(self, street: Street, k: int) -> int:
        # Anchor on an open door first; it becomes the round's beacon.
        while not street.isDoorOpen():
            street.moveRight()
        while True:
            # Walk right until an open door is sighted. The round-start
            # beacon itself sits at forward distance n <= k, so the walk
            # always sights something within k steps.
            steps = 0
            while steps < k:
                street.moveRight()
                steps += 1
                if street.isDoorOpen():
                    break
            # Close the sighted door, then sweep up to k houses hunting
            # for a survivor. An empty sweep proves every door is now
            # closed — possible only when the door just closed was the
            # round-start beacon itself, i.e. the sighting completed a
            # full lap and steps == n. (n == k needs exactly this sweep
            # length: house k is the first that can be the beacon again.)
            street.closeDoor()
            swept = 0
            while swept < k:
                street.moveRight()
                swept += 1
                if street.isDoorOpen():
                    break
            else:
                return steps
