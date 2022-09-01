import { FindOptionsWhere, ObjectID } from "typeorm";

export type DeleteCriteria<T> =
  | string
  | number
  | string[]
  | FindOptionsWhere<T>
  | Date
  | ObjectID
  | number[]
  | Date[]
  | ObjectID[];
