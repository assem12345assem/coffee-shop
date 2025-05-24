import type { FormRefItem, StringOrUndefined } from '@/data/interfaces';

export function isErrorFree(...refs: FormRefItem[]): boolean {
  return !refs.some((ref: FormRefItem): StringOrUndefined => ref.current?.getError());
}
