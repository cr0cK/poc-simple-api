/**
 * Function that returns a type predicate to filter undefined values of a list.
 *
 * Usage:
 * myList.filter(isDefined)
 */
export function isDefined<T>(o: T | null | undefined): o is T {
  return o !== undefined && o !== null
}
