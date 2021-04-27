export type Color = string;
export type Car = {
  stockNumber: number;
  manufacturerName: string;
  modelName: string;
  mileage: {
    number: number;
    unit: "km" | "mi";
  };
  fuelType: "Diesel" | "Petrol";
  color: Color;
  pictureUrl: string;
};

export type CarsParams = {
  color?: string;
  manufacturer?: string;
  page?: number;
};
export type CarsResults = {
  cars: Car[];
  totalPageCount: number;
  totalCarsCount: number;
};

export type Manufacturer = {
  name: string;
  models: string[];
};
