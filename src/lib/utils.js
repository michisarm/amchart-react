import addIndex from "ramda/src/addIndex";
import map from "ramda/src/map";
import keys from "ramda/src/keys";

export const mapIndexed = addIndex(map);

export const groupBy = (collection, prop) => {
  return keys(collection).reduce((groups, item) => {
    const groupKey = collection[item][prop];
    groups[groupKey] = groups[groupKey] || []
    groups[groupKey].push(collection[item])
    return groups
  }, {});
}