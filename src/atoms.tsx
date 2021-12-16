import { atom, selector } from "recoil";

export const minutesAtom = atom<number>({
  key: "minutes",
  default: 0,
});

export const selectorAtom = selector<number>({
  key: "selector",
  get: ({ get }) => {
    const minutes = get(minutesAtom);
    return minutes / 60;
  },
  set: ({ set, get }, newValue) => {
    const minutes = get(minutesAtom);

    const newMinutes = Number(newValue) * 60;

    set(minutesAtom, newMinutes);
  },
});
