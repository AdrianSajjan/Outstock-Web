import { Subcategory } from "@shared/constants";
import { FilterState, PriceState, PriceStateValue } from "@shared/interface";
import { useState, useMemo, Dispatch, SetStateAction } from "react";

interface SubcategoryItem {
  label: string;
  value: string;
}

export interface UseFilter {
  view: number;
  open: boolean;
  prices: PriceState[];
  subcategory: SubcategoryItem;
  filter: FilterState;
  handleFilterToggle: () => void;
  handleGridView: () => void;
  handleListView: () => void;
  setPrices: Dispatch<SetStateAction<PriceState[]>>;
  setSubcategory: Dispatch<SetStateAction<SubcategoryItem>>;
}

export const useFilter = (): UseFilter => {
  const [view, setView] = useState(0);
  const [open, setOpen] = useState(false);
  const [subcategory, setSubcategory] = useState(Subcategory[0]);
  const [prices, setPrices] = useState<PriceState[]>([]);

  const filter = useMemo(() => {
    let changeLessThan = true;
    const temp: PriceStateValue = { $gt: undefined, $lt: undefined };
    return {
      subcategory: subcategory.value,
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
  }, [subcategory, prices]);

  const handleListView = () => setView(0);
  const handleGridView = () => setView(1);
  const handleFilterToggle = () => setOpen((state) => !state);

  return { subcategory, view, open, prices, filter, handleFilterToggle, handleGridView, handleListView, setPrices, setSubcategory };
};
