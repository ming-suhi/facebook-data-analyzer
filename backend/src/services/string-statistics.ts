import { countObject, mergeCountObjectArrays } from "./statistics";

/**
 * Get the number of words from a string.
 * @param string A string
 */
 export const getStringWordCount = (string: string) => {
  return (string.match(/\w+/g) || []).length;
}


/**
 * Get the total number of words from an array of strings. 
 * @param array An array of string
 */
export const getArrayWordCount = (array: Array<string>) => {
  var count = 0;
  for (let string of array) {
    count = count + getStringWordCount(string);
  }
  return count;
}


/**
 * Get a list of words that occur on a string and how many times it occurs.
 * @param string A string
 */
export const getStringWordOccurences = (string: string) => {
  const occurences: countObject<string>[] = [];
  const words = string.split(" ");
  for (let word of words) {
    const reference = occurences.find(occurence => occurence.name == word);
    (!reference) ? occurences.push({name: word, count: 1}) : reference.count = reference.count + 1;
  }
  return occurences.sort((a, b) => b.count - a.count);
}


/**
 * Get a list of words that occur on a string on an array and how many times it occurs.
 * @param array An array
 */
export const getArrayWordOccurences = (array: string[]) => {
  const occurences: countObject<string>[] = [];
  for (let occurence of array) {
    mergeCountObjectArrays(occurences, getStringWordOccurences(occurence));
  }
  return occurences.sort((a, b) => b.count - a.count);
}
