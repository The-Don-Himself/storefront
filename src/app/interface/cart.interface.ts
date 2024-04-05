import { ProductInterface } from "./product.interface"

export interface CartSearchParamsInterface {
  limit: number,
  sort: 'desc' | 'asc',
  startdate: string,
  enddate: string,
}

export interface NewProductInterface {
  productId: number,
  quantity: number,
}

export interface AddNewProductInterface {
  userId: number,
  date: string,
  products: NewProductInterface[]
}

export interface CartInterface {
  id: number,
  userId: number,
  date: string,
  products: NewProductInterface[],
}
