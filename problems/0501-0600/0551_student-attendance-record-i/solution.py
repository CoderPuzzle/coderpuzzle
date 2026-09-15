class Solution:
    def checkRecord(self, s: str) -> bool:
        # Both criteria are about totals the record reveals day by day — how
        # many absences have piled up, and how long the current streak of
        # consecutive lates has grown — so one sweep decides everything.
        absents = 0
        lates = 0
        for day in s:
            if day == "A":
                absents += 1
                # An absent day is not a late day, so it also ends any
                # running streak of consecutive lates.
                lates = 0
            elif day == "L":
                lates += 1
            else:
                lates = 0
            # Fail the moment either criterion is breached — no later day
            # can repair a second absence or a third consecutive late.
            if absents >= 2 or lates >= 3:
                return False
        return True
