/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/server';
import sizeOf from 'buffer-image-size';
import { arrayBufferToBase64, toBuffer } from '@/app/lib/utils';
// App router includes @vercel/og.
// No need to install it.

export const runtime = 'edge';

const fetchURI =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:6969'
    : 'https://cocktail-graphql.dovanminhan.com';

const COCKTAIL_BY_ID_QUERY = `
  query GetCocktailById($id: String!) {
    cocktail(id: $id) {
      image
      name
      spirits {
        _id
        name
        parent
      }
    }
  }
`;

export async function  Image({ params }: { params: { id: string } })  {
  const id = params.id;

  const fontData = await fetch(
    //new URL('../../assets/ExcaliburNouveau.ttf', import.meta.url)
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/ExcaliburNouveau.ttf'
      : 'https://recipe.dovanminhan.com/ExcaliburNouveau.ttf'
  ).then((res) => res.arrayBuffer());

  const result = await fetch(fetchURI+'/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: COCKTAIL_BY_ID_QUERY,
      variables: {
        id,
      },
    }),
  }).then((res) => res.json());

  const image = await fetch(result.data.cocktail.image).then((res) =>
    res.arrayBuffer()
  );

  const { width, height } = sizeOf(toBuffer(image) as Buffer);

  console.log(width, height);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 56,
          color: 'black',
          width: '100%',
          height: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img width={(630 / height) * width} height={630} src={'data:image/png;base64, '+ arrayBufferToBase64(image)} />
        <div
          style={{
            maxWidth: 1200 - (630 / height) * width,
            backgroundImage: 'linear-gradient(90deg, black, #0a0f1e)',
          }}
          tw='w-full h-[630px] flex flex-col justify-center items-center px-8'
        >
          <div tw='absolute top-12 flex flex-col justify-center items-center mx-auto w-full'>
            <div tw='flex'>
              <svg
                style={{ height: 30, width: 30, marginTop: '-4px' }}
                stroke='#ffffff'
                fill='#ffffff'
                strokeWidth='0'
                viewBox='0 0 32 32'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M 8.5 4 C 5.464844 4 3 6.464844 3 9.5 C 3 12.535156 5.464844 15 8.5 15 C 9.3125 15 10.078125 14.796875 10.78125 14.46875 L 16 21.34375 L 16 27 L 12 27 L 12 29 L 22 29 L 22 27 L 18 27 L 18 21.34375 L 26.8125 9.71875 L 27 9.4375 L 27 8 L 13.75 8 C 13.144531 5.679688 10.984375 4 8.5 4 Z M 8.5 6 C 9.890625 6 11.089844 6.839844 11.625 8 L 7 8 L 7 9.4375 L 7.1875 9.71875 L 9.53125 12.8125 C 9.1875 12.933594 8.835938 13 8.5 13 C 6.535156 13 5 11.464844 5 9.5 C 5 7.535156 6.535156 6 8.5 6 Z M 9.9375 10 L 24.0625 10 L 22.5625 12 L 13.5 12 L 15 14 L 21.03125 14 L 17 19.34375 Z'></path>
              </svg>
              <div tw='font-bold text-white text-2xl'>Recipe</div>
            </div>
          </div>
          <h1
            tw='text-center text-white'
            style={{
              padding: '0px 20px',
              fontWeight: 'bold',
              fontFamily: '"ExcaliburNouveau"',
            }}
          >
            {result.data.cocktail.name}
          </h1>
          <div
            style={{ opacity: 0.8 }}
            tw='absolute bottom-8 flex flex-col justify-center items-center mx-auto w-full'
          >
            <div tw='flex'>
              <div tw='font-bold text-white text-2xl'>
                By Jay An with 💔 a broken heart
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: 'ExcaliburNouveau',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  );
}
