export function srediKlasu(input, prored = true) {
    if(!input) {
        return ' ';
    }
    var klasa = input.replace(/\W/g, '_');
    if(prored) {
        klasa += ' ';
    }
    return klasa;
}

export function kažiNekiBroj(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

export function izvuciNešto(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function maloPromešaj(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

export function završavaSeNa(string) {
  return string.substr(string.length - 1);
}

export function izbaciViškove(arr) {
    let s = new Set(arr);
    let it = s.values();
    return Array.from(it);
}
