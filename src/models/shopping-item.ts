export type ItemStatus = "pending" | "done"

export type ShoppingItem = {
  id: string
  description: string
  status: ItemStatus
}
