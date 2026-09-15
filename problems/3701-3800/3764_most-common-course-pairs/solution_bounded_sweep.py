from typing import List


class Solution:
    def mostCommonCoursePair(self, completions: List[List[str]]) -> List[str]:
        # Group rows per student; every student is judged and sorted
        # independently of the rest.
        by_student = {}
        for student, course, date, rating in completions:
            if student not in by_student:
                by_student[student] = []
            by_student[student].append([date, course, int(rating)])
        counts = {}
        for records in by_student.values():
            # Qualification without floats: sum >= 4 * n is exactly
            # "average >= 4" over integer ratings.
            n = len(records)
            if n < 5:
                continue
            total = 0
            for record in records:
                total += record[2]
            if total < 4 * n:
                continue
            # (date, course) sorts chronologically, name-breaking ties.
            records.sort()
            for a, b in zip(records, records[1:]):
                key = (a[1], b[1])
                if key not in counts:
                    counts[key] = 0
                counts[key] += 1
        best_pair = None
        best_count = -1
        # The tuple (-count, first, second) totally orders distinct keys, so
        # the running champion is the same pair no matter how the hash map
        # yields its entries.
        for (first, second), count in counts.items():
            if count > best_count or (count == best_count and (best_pair is None or (first, second) < best_pair)):
                best_count = count
                best_pair = (first, second)
        if best_pair is None:
            return []
        return [best_pair[0], best_pair[1], str(best_count)]
