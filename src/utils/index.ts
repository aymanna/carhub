import { CarProps, FilterProps } from '@/types';

export async function fetchCars(filters: FilterProps) {
  const searchParams = Object.entries(filters)
    .filter(([_, value]) => value != null && value !== '')
    .map(([key, value]) =>
      key === 'manufacturer'
        ? `make=${value}`
        : key === 'fuel'
        ? `fuel_type=${value}`
        : `${key}=${value}`
    )
    .join('&');

  const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars${
    searchParams ? `?${searchParams}` : ''
  }`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY || '',
      'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }

  return null;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50;
  const mileageFactor = 0.1;
  const ageFactor = 0.05;

  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL('https://cdn.imagin.studio/getimage');

  const { make, year, model } = car;

  url.searchParams.append(
    'customer',
    process.env.NEXT_PUBLIC_IMAGIN_API_KEY || ''
  );
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('make', make);
  url.searchParams.append('modelYear', `${year}`);
  url.searchParams.append('modelFamily', model.split(' ')[0]);
  url.searchParams.append('angle', angle || '');

  return `${url}`;
};

export const carImageFound = async (carImageUrl: string | URL) => {
  try {
    const response = await fetch(carImageUrl);
    const { headers } = response;
    return headers.get('x-imaginstudio-request-found') === 'true';
  } catch (error) {
    return false;
  }
};

export const updateSearchParams = (
  type: string,
  value: string,
  deleteEmptyValue = false
) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);

  const newSearchParams = searchParams
    .toString()
    .split('&')
    .filter((param) => param.split('=')[1] || !deleteEmptyValue)
    .join('&');

  const newPathName = `${window.location.pathname}${
    newSearchParams || !deleteEmptyValue ? `?${newSearchParams}` : ''
  }`;

  return newPathName;
};
