from treeNode import TreeNode, SAMPLE_INPUT
from math import floor
from typing import List

Nodes = List[TreeNode]


def getParentIndex(index: int):
    return floor((index-1)/2)


def isLeftChild(index: int):
    return index % 2 == 1


def deserialize(dataString: str):
    dataList = dataString[1:-1].split(',')
    nodeList = []
    if len(dataList) <= 1:
        return None

    for i in range(0, len(dataList)):
        if dataList[i] == 'null':

            nodeList.append(None)

        else:
            nodeList.append(TreeNode(dataList[i]))
            parentIndex = getParentIndex(i)
            if(nodeList[parentIndex]):
                parentNode = nodeList[parentIndex]

                if(isLeftChild(i)):
                    parentNode.left = nodeList[i]
                else:
                    parentNode.right = nodeList[i]

    return nodeList[0]


root = deserialize(SAMPLE_INPUT)
print(root)
