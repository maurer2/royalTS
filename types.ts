export type Royal = {
  name: string,
  title: string,
  dateOfBirth: Date,
  placeInLineOfSuccession: number,
};

export type RoyalRaw = { [K in keyof Royal]: string };
