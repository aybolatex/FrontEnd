import { ReducersMapObject } from 'redux';

export default function sortReducers(reducers: ReducersMapObject) {
  let result: ReducersMapObject = {};
  Object.keys(reducers)
      .sort()
      .forEach((key) => {
        result[key] = reducers[key];
      });
  return result;
}
