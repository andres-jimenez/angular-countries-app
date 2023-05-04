import { Country } from './country';
import { Region } from './region.type';

export interface CacheStore {
  byCapital: QueryCountries;
  byCountry: QueryCountries;
  byRegion: RegionCountries;
}

export interface QueryCountries {
  query: string;
  countries?: Country[];
}

export interface RegionCountries {
  region?: Region;
  countries?: Country[];
}
