/**
 * Structure to represent counts.
 */
export type countObject<TName> = {
  /** The name to associate counts */
  name: TName,
  /** Number representing counts */
  count: number
};

/**
 * Merge two arrays of count objects. Combine the counts of objects with the same name present in both array.
 * It is suggested to put the bigger array as `target` and the `smaller` as selected.
 * This function loops through the `selected`(smaller) array and finds a similar object inside `target`(bigger) array.
 * @param target An array of count objects
 * @param selected An array of count objects
 */
export const mergeCountObjectArrays = <TName>(target: countObject<TName>[], selected: countObject<TName>[]) => {
  for (let child of selected) {
    const reference = target.find(object => object.name == child.name)!;
    (!reference) ? target.push(child) : reference.count = reference.count + child.count;
  }
  return target;
}