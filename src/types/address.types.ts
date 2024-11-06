export type Address = {
  id: number;
  name: string;
  address: string;
  province: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
};

export type AddressCreation = Omit<Address, 'id'>;
