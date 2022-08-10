interface DefaultList {
  label: string,
  value: number
}

export function getDefaultList(): Array<DefaultList> {
  return [
    { label: 'AAA', value: 0 },
    { label: 'BBB', value: 1 },
    { label: 'CCC', value: 2 },
    { label: 'DDD', value: 3 },
    { label: 'EEE', value: 4 },
    { label: 'FFF', value: 5 },
    { label: 'GGG', value: 6 },
    { label: 'LLL', value: 7 },
    { label: 'YYY', value: 8 },
    { label: 'JJJ', value: 9 },
  ]
}
 

export type {
  DefaultList
}