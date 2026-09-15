from typing import List, Optional


class Solution:
    def carFleet(self, target: int, position: List[int], speed: List[int]) -> int:
        # Cars cannot pass each other, so sweep from the car nearest
        # the target backward.
        cars = sorted(zip(position, speed), reverse=True)
        fleets = 0
        last_time = 0.0
        for pos, spd in cars:
            # A car's fate is its alone-time to the target.
            time = (target - pos) / spd
            # Strictly later never catches the fleet ahead: a new
            # fleet lead. Otherwise it merges (equality at the target
            # merges), and last_time — the current fleet's arrival
            # time — stays put.
            if time > last_time:
                fleets += 1
                last_time = time
        return fleets
