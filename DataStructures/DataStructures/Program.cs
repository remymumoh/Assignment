// C# program to remove duplicates
// from unsorted linkedlist
using System;
using System.Collections.Generic;

class RemoveDuplicates
{
	class Node
	{
		public String Val;
		public Node Next;

		public Node(String val) { this.Val = val; }
	}

	static void RemoveDuplicate(Node head)
	{
		// to keep count
		Dictionary<string, int> dc = new Dictionary<string, int>();

		Node current = head;
		Node prev = null;

		while (current != null)
		{
			string curval = current.Val;

			if (dc.ContainsKey(curval))
			{
				int currentCount = dc[curval];

				if (currentCount >= 2)
				{
					prev.Next = current.Next;
				}
				else
				{
					prev = current;
				}

				// increment count
				dc[curval] = currentCount + 1;

			}
			else
			{
				dc.Add(curval, 1);
				prev = current;
			}

			current = current.Next;
		}
	}


	static void PrintList(Node head)
	{
		while (head != null)
		{
			Console.Write(head.Val + " ");
			head = head.Next;
		}
	}

	// Driver code
	public static void Main(String[] args)
	{

        // The constructed linked list is:
        // E->B->E->E->B->11->10
        Node start = new Node("E");
        start.Next = new Node("B");
        start.Next.Next = new Node("E");
        start.Next.Next.Next = new Node("E");
        start.Next.Next.Next.Next = new Node("B");
        start.Next.Next.Next.Next.Next = new Node("A");
        start.Next.Next.Next.Next.Next.Next = new Node("B");



        Console.WriteLine("Linked list before removing duplicates :");
		PrintList(start);

		RemoveDuplicate(start);

		Console.WriteLine("\nLinked list after removing duplicates :");
		PrintList(start);
	}
}

