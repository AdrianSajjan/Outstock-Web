export const Sort = [{ value: { createdAt: 1 }, label: "New Arrivals" }];

export const Prices = [
  {
    id: "2",
    label: "Rs. 10,000 +",
    value: {
      $gt: 10000,
    },
  },
  {
    id: "3",
    label: "Rs. 5,000 - Rs. 10,000",
    value: {
      $gt: 5000,
      $lt: 10001,
    },
  },
  {
    id: "4",
    label: "Rs. 3,000 - Rs. 5,000",
    value: {
      $gt: 3000,
      $lt: 5001,
    },
  },
  {
    id: "5",
    label: "Rs. 2,000 - Rs. 3,000",
    value: {
      $gt: 2000,
      $lt: 3001,
    },
  },
  {
    id: "6",
    label: "Rs. 1,000 - Rs. 2,000",
    value: {
      $gt: 1000,
      $lt: 2001,
    },
  },
  {
    id: "7",
    label: "Rs. 500 - Rs. 1,000",
    value: {
      $gt: 500,
      $lt: 1001,
    },
  },
  {
    id: "8",
    label: "Rs. 1 - Rs. 500",
    value: {
      $gt: 0,
      $lt: 501,
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
