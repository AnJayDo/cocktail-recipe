import { ISpirit, IIngredient } from '@/app/interfaces';

export function getGlassTypeSrcByName(name: string) {
  const srcList = [
    'highball',
    'icedtea',
    'margarita',
    'martini',
    'rocks',
    'wine',
    'mug',
  ];
  switch (name.toLocaleUpperCase()) {
    case 'HIGHBALL':
      return srcList[0];
    case 'COUPE':
      return srcList[2];
    case 'ROCKS':
      return srcList[4];
    case 'WINE':
      return srcList[5];
    case 'MUG':
      return srcList[6];
    default:
      return srcList[3];
  }
}

export function getGarnishIcon(name: string) {
  switch (name.toLocaleUpperCase()) {
    case 'LEMON':
    case 'LIME':
      return '🍋';
    case 'ORANGE':
      return '🍊';
    case 'APPLE':
      return '🍎';
    case 'GRAPEFRUIT':
      return '🍇';
    case 'CUCUMBER':
      return '🥒';
    case 'CARROT':
      return '🥕';
    case 'STRAWBERRY':
      return '🍓';
    default:
      return '🍊';
  }
}

export function calcAbv(cocktail: any) {
  let totalAmount = 0;
  let alcoholAmount = 0;
  cocktail.ingredients.forEach((item: IIngredient) => {
    if (item.unit.toLocaleUpperCase() === 'OZ') {
      const amountToMil =
        item.amount.split('/').length > 1
          ? (parseFloat(item.amount.split('/')[0]) /
              parseFloat(item.amount.split('/')[1])) *
            30
          : parseFloat(item.amount) * 30;
      if (
        cocktail.spirits.find(
          (spirit: ISpirit) =>
            item.name.toLocaleUpperCase().includes(spirit.parent) ||
            item.name
              .toLocaleUpperCase()
              .includes(spirit.name.toLocaleUpperCase())
        )
      ) {
        alcoholAmount += amountToMil;
      }
      totalAmount += amountToMil;
    }
  });
  return '~' + ((alcoholAmount / totalAmount) * 0.4 * 100).toFixed(1) + '%';
}

export function toBuffer(arrayBuffer: ArrayBuffer) {
  const buffer = Buffer.alloc(arrayBuffer.byteLength);
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < buffer.length; ++i) {
    buffer[i] = view[i];
  }
  return buffer;
}

export function arrayBufferToBase64(buffer: ArrayBuffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
