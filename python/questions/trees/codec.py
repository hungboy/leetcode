from treeNode import TreeNode, SAMPLE_INPUT


class Codec:
    def serialize(self, root):
        """Encodes a tree to a single string.
        :type root: TreeNode
        :rtype: str
        """
        l = []
        stack = []
        curr = root
        while curr or stack:
            if curr:
                l.append(str(curr.val))
                stack.append(curr)
                curr = curr.left
            else:
                l.append('None')
                curr = stack.pop()
                curr = curr.right
        string = ','.join(l)
        return string

    def deserialize(self, data):
        """Decodes your encoded data to tree.
        :type data: str
        :rtype: TreeNode
        """
        l = data.split(',')
        if len(l) <= 1:
            return None
        curr = dummy = TreeNode(-1)
        stack = [curr]
        for i in range(0, len(l)):
            if l[i] == 'None':
                nextNode = None
            else:
                nextNode = TreeNode(l[i])
            if curr:
                curr.left = nextNode
                stack.append(curr)
                curr = curr.left
            else:
                curr = stack.pop()
                curr.right = nextNode
                curr = curr.right
        return dummy.left


codec = Codec()
root = codec.deserialize(SAMPLE_INPUT)

print(root)
