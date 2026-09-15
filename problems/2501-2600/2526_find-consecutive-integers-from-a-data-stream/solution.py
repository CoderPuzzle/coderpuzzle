class DataStream:
    def __init__(self, value: int, k: int):
        # Running length of the current suffix of matched values: a match
        # grows it, any other number resets it to zero, and consec is just
        # "has the streak reached k". The window of the last k integers is
        # summarized in one integer — nothing is buffered.
        self.value = value
        self.k = k
        self.streak = 0

    def consec(self, num: int) -> bool:
        self.streak = self.streak + 1 if num == self.value else 0
        return self.streak >= self.k
