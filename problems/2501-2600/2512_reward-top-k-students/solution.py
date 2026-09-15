from typing import List


class Solution:
    def topStudents(
        self,
        positive_feedback: List[str],
        negative_feedback: List[str],
        report: List[str],
        student_id: List[int],
        k: int,
    ) -> List[int]:
        # Membership sets make each report token O(1) to classify: +3 for
        # a positive word, -1 for a negative one, everything else free.
        # Sorting the (-points, id) pairs ascending is exactly the asked
        # ranking — highest points first, lower ID breaking ties — so the
        # first k identifiers are the answer.
        positives = set(positive_feedback)
        negatives = set(negative_feedback)
        ranked = []
        for text, sid in zip(report, student_id):
            points = 0
            for word in text.split(" "):
                if word in positives:
                    points += 3
                elif word in negatives:
                    points -= 1
            ranked.append((-points, sid))
        ranked.sort()
        return [sid for _, sid in ranked[:k]]
