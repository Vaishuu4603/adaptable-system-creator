
export interface CodeFeedback {
  correctness: number;
  efficiency: number;
  quality: number;
  feedback: string;
  passed: boolean;
}

/**
 * Mock AI evaluation of code submissions
 * In a real application, this would call an API with an AI service
 */
export const evaluateCode = async (
  code: string, 
  challengeId?: string
): Promise<CodeFeedback> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Very simple mock evaluation based on code length and some key indicators
  // This is just for demonstration - in reality, you'd use a real AI evaluation service
  
  // Default values
  let correctness = 0;
  let efficiency = 0;
  let quality = 0;
  let feedback = "";
  let passed = false;
  
  // Simple indicators for Python code
  const hasFunctionDefinition = code.includes('def ');
  const hasComments = code.includes('#');
  const hasDoctstrings = code.includes('"""') || code.includes("'''");
  const hasMainCheck = code.includes('if __name__ == "__main__"') || code.includes("if __name__ == '__main__'");
  const hasExceptionHandling = code.includes('try') && code.includes('except');
  const hasInputValidation = code.includes('if') && (code.includes('raise') || code.includes('return'));
  
  // Basic correctness check - does it have functions and some logic?
  if (hasFunctionDefinition) {
    correctness += 5;
    
    // Check for common patterns that indicate better code
    if (hasInputValidation) correctness += 2;
    if (hasExceptionHandling) correctness += 1.5;
    
    // Add a bit of randomness for demo purposes
    correctness += Math.random() * 1.5;
    
    // Cap at 10
    correctness = Math.min(10, correctness);
  } else {
    correctness = Math.random() * 4 + 1; // 1-5 range for minimal code
  }
  
  // Simple efficiency check
  efficiency = 5; // Base value
  
  // Check for inefficient patterns (very simplistic for demo)
  const nestedLoops = (code.match(/for.*for/gs) || []).length;
  if (nestedLoops > 0) {
    efficiency -= nestedLoops * 0.8; // Nested loops might be less efficient
  }
  
  // Use of efficient data structures gets a bonus
  if (code.includes('set(') || code.includes('dict(') || code.includes('{}')) {
    efficiency += 1.5;
  }
  
  // Add a bit of randomness for demo purposes
  efficiency += Math.random() * 2 - 0.5; // +/- 0.5 randomness
  efficiency = Math.max(1, Math.min(10, efficiency)); // Clamp between 1-10
  
  // Code quality metrics
  quality = 3; // Base value
  
  // Good practices improve quality score
  if (hasComments) quality += 1.5;
  if (hasDoctstrings) quality += 2;
  if (hasMainCheck) quality += 1;
  if (code.split('\n').length > 5) quality += 1; // Has some structure
  
  // Add a bit of randomness
  quality += Math.random() * 1.5;
  quality = Math.max(1, Math.min(10, quality)); // Clamp between 1-10
  
  // Determine if the code passes based on scores
  passed = correctness >= 7 && efficiency >= 5 && quality >= 5;
  
  // Generate feedback based on the metrics
  feedback = generateFeedback(code, correctness, efficiency, quality, passed);
  
  return {
    correctness,
    efficiency,
    quality,
    feedback,
    passed
  };
};

const generateFeedback = (
  code: string,
  correctness: number,
  efficiency: number,
  quality: number,
  passed: boolean
): string => {
  const feedbackParts: string[] = [];
  
  // Correctness feedback
  if (correctness >= 8) {
    feedbackParts.push("Your solution is correct and handles the requirements well.");
  } else if (correctness >= 5) {
    feedbackParts.push("Your solution is partially correct but may not handle all edge cases.");
  } else {
    feedbackParts.push("Your solution has significant correctness issues and doesn't meet the requirements.");
  }
  
  // Specific correctness suggestions
  if (!code.includes('def ')) {
    feedbackParts.push("Consider structuring your code into functions for better organization and reusability.");
  }
  
  if (!code.includes('if') && code.length > 50) {
    feedbackParts.push("Add input validation to handle unexpected inputs gracefully.");
  }
  
  // Efficiency feedback
  if (efficiency >= 8) {
    feedbackParts.push("Your code demonstrates good efficiency with appropriate algorithms and data structures.");
  } else if (efficiency >= 5) {
    feedbackParts.push("Your solution works but could be optimized for better performance.");
  } else {
    feedbackParts.push("Your solution has efficiency concerns that should be addressed.");
  }
  
  // Specific efficiency suggestions
  const nestedLoops = (code.match(/for.*for/gs) || []).length;
  if (nestedLoops > 0) {
    feedbackParts.push(`Your code contains ${nestedLoops} nested loops, which may lead to O(n²) or worse time complexity. Consider if there's a more efficient approach.`);
  }
  
  if (!code.includes('set(') && !code.includes('dict(') && code.includes('for')) {
    feedbackParts.push("Consider using more efficient data structures like sets or dictionaries for lookups.");
  }
  
  // Code quality feedback
  if (quality >= 8) {
    feedbackParts.push("Your code is well-structured, readable, and follows good practices.");
  } else if (quality >= 5) {
    feedbackParts.push("Your code is reasonably well-structured but could benefit from improved documentation and organization.");
  } else {
    feedbackParts.push("Your code would benefit significantly from better organization, documentation, and adherence to coding standards.");
  }
  
  // Specific quality suggestions
  if (!code.includes('#') && !code.includes('"""') && !code.includes("'''")) {
    feedbackParts.push("Add comments or docstrings to explain your approach and help others understand your code.");
  }
  
  if (code.includes('print(') && !code.includes('if __name__ == "__main__"') && !code.includes("if __name__ == '__main__'")) {
    feedbackParts.push("Consider using a main function or guard clause to make your code more reusable as a module.");
  }
  
  // Overall assessment
  if (passed) {
    feedbackParts.push("Overall, your solution is successful and demonstrates good coding practices.");
  } else {
    feedbackParts.push("Overall, your solution needs improvement in the areas mentioned above before it can be considered complete.");
  }
  
  return feedbackParts.join("\n\n");
};

export const sampleChallenges = [
  {
    id: "1",
    title: "Find Maximum Subarray Sum",
    description: "Write a function that finds the contiguous subarray within an array of integers that has the largest sum and return that sum.",
    difficulty: "Medium" as const,
    tags: ["Arrays", "Dynamic Programming", "Kadane's Algorithm"],
    prompt: `Given an array of integers, find the contiguous subarray with the largest sum.

Function Signature:
def max_subarray_sum(nums: list[int]) -> int:
    # Your code here

Example:
Input: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6
Explanation: The subarray [4, -1, 2, 1] has the largest sum = 6.

Constraints:
- The array will contain at least one element
- The array may contain both positive and negative integers
- Your solution should have O(n) time complexity`,
    sampleSolution: `def max_subarray_sum(nums):
    """
    Find the maximum sum of any contiguous subarray.
    
    Args:
        nums: List of integers
        
    Returns:
        Maximum sum of any contiguous subarray
    """
    if not nums:
        return 0
        
    current_sum = max_sum = nums[0]
    
    for num in nums[1:]:
        # Either start a new subarray or continue the previous one
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
        
    return max_sum`
  },
  {
    id: "2",
    title: "Valid Parentheses",
    description: "Write a function to determine if a string containing only parentheses characters is valid (balanced).",
    difficulty: "Easy" as const,
    tags: ["Strings", "Stack", "Data Structures"],
    prompt: `Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

Function Signature:
def is_valid_parentheses(s: str) -> bool:
    # Your code here

A string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.

Examples:
- Input: "()" -> Output: True
- Input: "()[]{}" -> Output: True
- Input: "(]" -> Output: False
- Input: "([)]" -> Output: False
- Input: "{[]}" -> Output: True

Constraints:
- The string will only contain parentheses characters '(', ')', '{', '}', '[' and ']'
- The string length will be between 0 and 10,000`,
    sampleSolution: `def is_valid_parentheses(s):
    """
    Determine if a string of parentheses is valid (balanced).
    
    Args:
        s: String containing only parentheses characters
        
    Returns:
        True if the string is valid, False otherwise
    """
    # Map closing brackets to opening brackets
    brackets_map = {
        ')': '(',
        '}': '{',
        ']': '['
    }
    
    # Use a stack to keep track of opening brackets
    stack = []
    
    for char in s:
        # If it's a closing bracket
        if char in brackets_map:
            # Pop the top element if the stack is not empty, else use a dummy value
            top_element = stack.pop() if stack else '#'
            
            # Check if the popped element matches the corresponding opening bracket
            if brackets_map[char] != top_element:
                return False
        else:
            # If it's an opening bracket, push it onto the stack
            stack.append(char)
    
    # The stack should be empty if the string is valid
    return len(stack) == 0`
  },
  {
    id: "3",
    title: "Detect Cycle in Linked List",
    description: "Write a function to determine if a linked list has a cycle (loops back on itself).",
    difficulty: "Medium" as const,
    tags: ["Linked List", "Two Pointers", "Data Structures"],
    prompt: `Given a linked list, determine if it has a cycle in it.

Function Signature:
def has_cycle(head: ListNode) -> bool:
    # Your code here

The linked list is represented by the following class:
class ListNode:
    def __init__(self, value=0, next=None):
        self.value = value
        self.next = next

A cycle in a linked list means that there is some node in the list that can be reached again by continuously following the next pointer.

Examples:
- Input: head = [3,2,0,-4], where -4 points back to 2 -> Output: True
- Input: head = [1,2], where 2 points back to 1 -> Output: True
- Input: head = [1] -> Output: False

Constraints:
- The number of nodes will be between 0 and 10,000
- Try to solve it using O(1) extra space`,
    sampleSolution: `def has_cycle(head):
    """
    Determine if a linked list has a cycle.
    
    Args:
        head: The head of the linked list
        
    Returns:
        True if the linked list has a cycle, False otherwise
    """
    if not head or not head.next:
        return False
    
    # Use two pointers: slow moves one step at a time, fast moves two steps
    slow = head
    fast = head
    
    while fast and fast.next:
        slow = slow.next        # Move slow pointer one step
        fast = fast.next.next   # Move fast pointer two steps
        
        # If there's a cycle, the fast pointer will eventually meet the slow pointer
        if slow == fast:
            return True
    
    # If we reach here, fast pointer reached the end, so no cycle
    return False`
  },
  {
    id: "4",
    title: "Binary Search Implementation",
    description: "Implement a binary search algorithm to find a target value in a sorted array.",
    difficulty: "Easy" as const,
    tags: ["Arrays", "Binary Search", "Algorithms"],
    prompt: `Implement the binary search algorithm to find a target value in a sorted array of integers.

Function Signature:
def binary_search(nums: list[int], target: int) -> int:
    # Your code here

The function should return the index of the target if it exists in the array, or -1 if it doesn't.

Examples:
- Input: nums = [-1, 0, 3, 5, 9, 12], target = 9 -> Output: 4
- Input: nums = [-1, 0, 3, 5, 9, 12], target = 2 -> Output: -1

Constraints:
- The array will be sorted in ascending order
- All elements in the array are unique
- The array may contain between 1 and 10,000 elements
- Try to implement the algorithm with O(log n) time complexity`,
    sampleSolution: `def binary_search(nums, target):
    """
    Perform binary search to find target in a sorted array.
    
    Args:
        nums: A sorted list of integers
        target: The value to search for
        
    Returns:
        The index of the target if found, otherwise -1
    """
    left, right = 0, len(nums) - 1
    
    while left <= right:
        # Calculate middle index (avoids integer overflow in other languages)
        mid = left + (right - left) // 2
        
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1  # Search in the right half
        else:
            right = mid - 1  # Search in the left half
    
    # Target not found
    return -1`
  },
];

export const getSampleChallenge = (id: string) => {
  return sampleChallenges.find(challenge => challenge.id === id);
};
