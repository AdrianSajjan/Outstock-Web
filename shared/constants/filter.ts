export const Sort = [
  { value: "bestsellers", label: "Bestsellers" },
  { value: "new-arrivals", label: "New Arrivals" },
  { value: "specials", label: "Specials" },
];

export const Prices = [
  {
    id: "1",
    label: "Rs. 50,000 + ",
    value: {
      $gt: 50000,
      $lt: undefined,
    },
  },
  {
    id: "2",
    label: "Rs. 30,000 - Rs. 50,000",
    value: {
      $gt: 30000,
      $lt: 50000,
    },
  },
  {
    id: "3",
    label: "Rs. 15,000 - Rs. 30,000",
    value: {
      $gt: 15000,
      $lt: 30000,
    },
  },
  {
    id: "4",
    label: "Rs. 7,500 - Rs. 15,000",
    value: {
      $gt: 7500,
      $lt: 15000,
    },
  },
  {
    id: "5",
    label: "Rs. 5,000 - Rs. 7,500",
    value: {
      $gt: 5000,
      $lt: 7500,
    },
  },
  {
    id: "6",
    label: "Rs. 2,500 - Rs. 5,000",
    value: {
      $gt: 2500,
      $lt: 5000,
    },
  },
  {
    id: "7",
    label: "Rs. 1,000 - Rs. 2,500",
    value: {
      $gt: 1000,
      $lt: 2500,
    },
  },
  {
    id: "8",
    label: "Rs. 100 - Rs. 1000",
    value: {
      $gt: 100,
      $lt: 1000,
    },
  },
];

export const Colors = [
  {
    value: "black",
    label: "Black",
    code: "black",
  },
  {
    value: "brown",
    label: "Brown",
    code: "brown",
  },
  {
    value: "beige",
    label: "Beige",
    code: "beige",
  },
  {
    value: "yellow",
    label: "Yellow",
    code: "yellow",
  },
  {
    value: "peach",
    label: "Peach",
    code: "peach",
  },
  {
    value: "red",
    label: "Red",
    code: "red",
  },
  {
    value: "orange",
    label: "Orange",
    code: "orange",
  },
  {
    value: "pink",
    label: "Pink",
    code: "pink",
  },
  {
    value: "gray",
    label: "Gray",
    code: "gray",
  },
  {
    value: "green",
    label: "Green",
    code: "green",
  },
  {
    value: "white",
    label: "White",
    code: "white",
  },
];
