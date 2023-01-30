interface IAddress {
  id: number;
  street: string;
  streetName: string;
  buildingNumber: number;
  city: string;
  zipcode: string;
  country: string;
  country_code: string;
  latitude: number;
}

export interface IPerson {
  id: number;
  firstname: string;
  lastname: string;
  birthday: string;
  gender: string;
  phone: string;
  address: IAddress;
  image: string;
}
