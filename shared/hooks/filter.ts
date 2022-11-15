import { Sort } from "@shared/constants";
import { FilterState, PriceState, PriceStateValue } from "@shared/interface";
import { useState, useMemo, Dispatch, SetStateAction } from "react";

interface SortItem {
  label: string;
  value: string;
}

export interface UseFilter {
  view: number;
  open: boolean;
  prices: PriceState[];
  sort: SortItem;
  filter: FilterState;
  handleFilterToggle: () => void;
  handleGridView: () => void;
  handleListView: () => void;
  setPrices: Dispatch<SetStateAction<PriceState[]>>;
  setSort: Dispatch<SetStateAction<SortItem>>;
}

export const useFilter = (): UseFilter => {
  const [view, setView] = useState(0);
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState(Sort[0]);
  const [prices, setPrices] = useState<PriceState[]>([]);

  const filter = useMemo(() => {
    let changeLessThan = true;
    const temp: PriceStateValue = { $gt: undefined, $lt: undefined };
    return {
      sort: sort.value,
      price: prices.reduce(
        (result, { value }) => {
          if (value.$lt === undefined) {
            changeLessThan = false;
            temp.$lt = undefined;
          } else if (result.$lt === undefined) {
            temp.$lt = changeLessThan ? value.$lt : undefined;
          } else if (value.$lt > result.$lt) {
            temp.$lt = value.$lt;
          } else {
            temp.$lt = result.$lt;
          }
          if (result.$gt === undefined) {
            temp.$gt = value.$gt;
          } else if (value.$gt === undefined) {
            temp.$gt = undefined;
          } else if (result.$gt < value.$gt) {
            temp.$gt = result.$gt;
          } else {
            temp.$gt = value.$gt;
          }
          return temp;
        },
        { $lt: undefined, $gt: undefined } as PriceStateValue
      ),
    };
  }, [sort, prices]);

  const handleListView = () => setView(0);
  const handleGridView = () => setView(1);
  const handleFilterToggle = () => setOpen((state) => !state);

  return { sort, view, open, prices, filter, handleFilterToggle, handleGridView, handleListView, setPrices, setSort };
};
