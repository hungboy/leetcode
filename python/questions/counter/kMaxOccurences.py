import heapq
from typing import List
import string


def findKMaxOccurences(words: List[str], k: int):
    occurenceHash = {}

    for i in range(0, len(words)):
        word = words[i]
        loweredWord = word.lower()
        if occurenceHash[loweredWord] is not None:
            occurenceHash[loweredWord] = 0

        occurenceHash[loweredWord] -= 1

    heap = []

    for w, count in occurenceHash.items():
        heap.append((count, w))

    heapq.heapify(heap)

    out = []

    for c in range(0, k):
        out.append(heapq.heappop(heap)[1])

    return out


out = findKMaxOccurences(["i", "love", "leetcode", "i", "love", "coding"], 2)
print(out)
