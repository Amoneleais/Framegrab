export type Replace<OriginalType, ReplaceType> = Omit<
  OriginalType,
  keyof ReplaceType
> &
  ReplaceType;
