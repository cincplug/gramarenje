import React from 'react';

const ćiriliši = (input) => {
  const latinChars = 'A,B,V,G,D,Đ,E,Ž,Z,I,J,K,L,Lj,M,N,Nj,O,P,R,S,T,U,F,H,C,Č,Ć,Dž,Š,a,b,v,g,d,đ,e,ž,z,i,j,k,l,lj,m,n,nj,o,p,r,s,t,u,f,h,c,č,ć,dž,š';
  const cyrillicChars = 'А,Б,В,Г,Д,Ђ,Е,Ж,З,И,Ј,К,Л,Љ,М,Н,Њ,О,П,Р,С,Т,У,Ф,Х,Ц,Ч,Ћ,Џ,Ш,а,б,в,г,д,ђ,е,ж,з,и,ј,к,л,љ,м,н,њ,о,п,р,с,т,у,ф,х,ц,ч,ћ,џ,ш';

  const latinArr = latinChars.split(',');
  const cyrillicArr = cyrillicChars.split(',');

  const map = new Map();
  for (let i = 0; i < latinArr.length; i++) {
    map.set(latinArr[i], cyrillicArr[i]);
  }

  let result = '';
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const convertedChar = map.get(char);
    result += convertedChar ? convertedChar : char;
  }

  return result;
}

export function trans(input, pismo) {
    if(pismo === 'latinica') {
        return input;
    } else {
        var autput;
        if (typeof input === 'string') {
            autput = ćiriliši(input);
        } else {
            autput = recursiveMap(input, null);
        }
        return autput;
    }
}

function recursiveMap(children, fn) {
  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
        if(typeof child === 'string') {
            return ćiriliši(child);
        } else {
            return child;
        }
    }

    if (child.props.children) {
      child = React.cloneElement(child, {
        children: recursiveMap(child.props.children, fn)
      });
    }

    return child;
  });
}