import dotenv from 'dotenv'
dotenv.config()

import {extractStrings} from './scripts/extract'

const url = <string>process.env.URL
console.log(url);

(async () => {
  const names = await extractStrings(url);

  console.log(names)
})();
