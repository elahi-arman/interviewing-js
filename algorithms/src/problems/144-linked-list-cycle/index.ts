import { ListNode } from "../../helpers/list-node";

export const hasCycle = (head: ListNode<number> | null): boolean => {
  let tortoise = head;
  let hare = head?.next?.next;

  while (hare) {
    if (tortoise === hare) {
      return true;
    }

    tortoise = tortoise!.next;
    hare = hare.next?.next;
  }

  return false;
};
