type Royal = {
  name: string,
  title: string,
  dateOfBirth: Date,
  placeInLineOfSuccession: number,
}

type RoyalRaw = { [K in keyof Royal]: string }
