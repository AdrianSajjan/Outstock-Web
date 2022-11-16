import { Sort } from "@shared/constants";
import { FilterState, PriceState, PriceStateValue } from "@shared/interface";
import { useState, useMemo, Dispatch, SetStateAction } from "react";

interface SortItem {
  label: string;
  value: Record<string, number>;
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
  const [sort, setSort] = useState<SortItem>(Sort[0]);
  const [prices, setPrices] = useState<PriceState[]>([]);

  const filter = useMemo(() => {
    return {
      sort: JSON.stringify(sort.value),
      price: JSON.stringify(prices.map((price) => price.value)),
    };
  }, [sort, prices]);

  const handleListView = () => setView(0);
  const handleGridView = () => setView(1);
  const handleFilterToggle = () => setOpen((state) => !state);

  return { sort, view, open, prices, filter, handleFilterToggle, handleGridView, handleListView, setPrices, setSort };
};
