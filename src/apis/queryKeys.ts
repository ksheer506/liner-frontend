export const documentsKeys = {
  all: ["documents"] as const,
  lists: () => [...documentsKeys.all, "list"] as const,
  list: (keyword: string) => [...documentsKeys.lists(), keyword] as const,
};
