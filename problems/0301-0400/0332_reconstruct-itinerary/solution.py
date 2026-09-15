from typing import List, Optional

from collections import defaultdict


class Solution:
    def findItinerary(self, tickets: List[List[str]]) -> List[str]:
        graph = defaultdict(list)
        for departure, arrival in tickets:
            graph[departure].append(arrival)
        # Reverse-sorted so pop() always takes the lexicographically
        # smallest unused ticket.
        for airport in graph:
            graph[airport].sort(reverse=True)

        route = []

        def visit(airport):
            while graph[airport]:
                visit(graph[airport].pop())
            # Record only in postorder, after every outgoing edge is used:
            # dead-end airports land at their latest possible position.
            route.append(airport)

        visit("JFK")
        # Reversed postorder is a valid Eulerian path; exploring the
        # smallest edge first makes it the lexicographically smallest one.
        return route[::-1]
