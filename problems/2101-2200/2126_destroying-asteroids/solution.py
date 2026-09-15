class Solution:
    def asteroidsDestroyed(self, mass: int, asteroids: List[int]) -> bool:
        current_mass = mass
        for asteroid in sorted(asteroids):
            if current_mass < asteroid:
                return False
            current_mass += asteroid
        return True
