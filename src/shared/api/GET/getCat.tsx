import type { ICat } from "../model"
import { cats } from "../testdata"

export const getCat = (id: number): ICat | undefined => {
	return cats.find((cat) => cat.id === id)
}
