import __ from "lodash/fp/__";
import castArray from "lodash/fp/castArray";
import concat from "lodash/fp/concat";
import cond from "lodash/fp/cond";
import defaultTo from "lodash/fp/defaultTo";
import filter from "lodash/fp/filter";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import identity from "lodash/fp/identity";
import isArray from "lodash/fp/isArray";
import map from "lodash/fp/map";
import matches from "lodash/fp/matches";
import negate from "lodash/fp/negate";
import stubArray from "lodash/fp/stubArray";
import stubTrue from "lodash/fp/stubTrue";
import tap from "lodash/fp/tap";
import * as React from "react";
import { useLocation } from "react-router-dom";

import * as T from "types";

const API_PREFIX = "https://auto1-mock-server.herokuapp.com/api";

function useFetch<T>(api: string, extractData: (json: object) => T) {
  const [data, setData] = React.useState<T | void>();

  React.useEffect(() => {
    const ctrl = new AbortController();

    setData(); // clear old data;

    fetch(`${API_PREFIX}/${api}`, { signal: ctrl.signal })
      .then((response: Response): Promise<object> => response.json())
      .then(extractData)
      .then(setData)
      .catch(console.error);

    return () => ctrl.abort();
  }, [api, extractData]);

  return data;
}

const extractCars = identity;
const extractCarDt = get("car");
const extractColors = get("colors");
const extractMfr = flow(get("manufacturers"), map(get("name")));

const useCars = (params?: T.CarsParams) =>
  useFetch<T.CarsResults>(
    "cars?" + new URLSearchParams(params as Record<string, string>),
    extractCars
  );
const useCarDetail = (stockNumber?: T.Car["stockNumber"]) =>
  useFetch<T.Car>(`cars/${stockNumber}`, extractCarDt);
const useColor = () => useFetch<T.Color[]>("colors", extractColors);
const useManufacturer = () =>
  useFetch<T.Manufacturer["name"][]>("manufacturers", extractMfr);

export const useApi = {
  cars: useCars,
  carsdetail: useCarDetail,
  color: useColor,
  manufacturer: useManufacturer,
} as const;

export type TApiName = keyof typeof useApi;

const getSearchParams = (search: string) =>
  Object.fromEntries(new URLSearchParams(search).entries());

export function useSearchParams() {
  const { search } = useLocation();

  return getSearchParams(search);
}

const TAG_FAV = "favorites";
const loadFavs = () => window.localStorage.getItem(TAG_FAV);
const saveFavs = (json: string) => window.localStorage.setItem(TAG_FAV, json);
export function useFavs(): [
  T.Car[] | undefined,
  (car: T.Car) => any,
  (stockNumber: T.Car["stockNumber"]) => any
] {
  const [favorites, setFavs] = React.useState();
  const add = flow(
    castArray,
    concat(favorites),
    tap(setFavs),
    JSON.stringify,
    saveFavs
  );

  const remove = flow(
    (stockNumber) => filter(negate(matches({ stockNumber })), favorites),
    tap(setFavs),
    JSON.stringify,
    saveFavs
  );

  React.useEffect(
    () =>
      flow(
        loadFavs,
        (s: string) => {
          try {
            return JSON.parse(s);
          } catch {}
        },
        cond([
          [isArray, identity],
          [stubTrue, defaultTo(__, stubArray())],
        ]),
        setFavs
      )(),
    [setFavs]
  );

  return [favorites, add, remove];
}

export default useApi;
