import { Identified } from "types";

export const filterDuplicatedItems = <T extends Identified>(data: T[] = []) => {
  const duplicationMap = new Map(data.map(({ id }) => [id, false]));

  return data.filter(({ id }) => {
    const isDuplicated = duplicationMap.get(id);

    if (isDuplicated) return false;

    duplicationMap.set(id, true);
    return true;
  });
};
