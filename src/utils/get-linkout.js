const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', , 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']


function getRandom(minN, maxN) {
  let min = Math.ceil(minN);
  let max = Math.floor(maxN);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

export default function (player, index){
  let rnd1 = getRandom(0, 27);
  let rnd2 = getRandom(0, 27);

  return `${player}:${chars[ rnd1 ]}${chars[ rnd2 ]}-${index}`.replace('undefined', chars[getRandom(0, 27)])
}
