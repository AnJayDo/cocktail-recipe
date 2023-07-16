"use client"

import { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image'
import { useQuery, gql } from "@apollo/client";
import Loading from '@/app/components/Loading';
import { calcAbv, getGarnishIcon, getGlassTypeSrcByName } from '@/app/lib/utils';
import { COCKTAIL_BY_ID_QUERY } from '@/app/lib/GraphQLQuery'
import Head from 'next/head';

const tagClassList = ["btn-solid-primary","btn-solid-secondary","btn-solid-success","btn-solid-error","btn-solid-warning",]

export default function Cocktail({ params } : { params: { id: string } }) {
  const { loading, error, data } = useQuery(COCKTAIL_BY_ID_QUERY, {
    variables: {
        id: params.id
    }
  });

  const cocktail = data ? data.cocktail : {}

  return (
    loading ? <Loading/> : (
        error ? <p>Error : {error.message}</p>
        : 
        <main className='w-full min-h-screen pt-20 flex flex-col px-4'>
            <Head>
              <title>{cocktail.name} - By Jay An</title>
              <meta name="description" content={cocktail.description.length > 100 ? cocktail.description.slice(0, 100) + '...' : cocktail.description} />
            </Head>
            <h1 className='text-6xl font-bold text-white text-center mb-3'>{cocktail.name}</h1>
            <div className='flex mx-auto my-2'>
                {cocktail.spirits.map((item: any, index: number) => <div className={'mx-1 font-bold text-center w-max flex items-center btn-xs '+tagClassList[index%5]} key={index}>{item.name}</div>)}
            </div>
            <div className='w-full max-w-2xl rounded-2xl overflow-hidden mx-auto'>
                <Image alt={cocktail.description} width={1000} height={1000} src={cocktail.image} />
            </div>
            <div className='flex w-max min-w-2xl max-w-[90vw] flex-wrap justify-center rounded-xl bg-gradient-to-br from-[#ffffff17] to-[#164b3830] mx-auto my-3'>
                <div className='flex flex-col justify-start items-center p-3 m-2 w-36'>
                    <h3 className='font-bold'>Glass</h3>
                    <div className='my-2 mx-auto w-20'>
                        <Image className='invert' height={256} width={256} src={'/'+getGlassTypeSrcByName(cocktail.glassType.name)+'.png'} alt='Glass type'/>
                    </div>
                </div>
                <div className='flex flex-col justify-start items-center p-3 m-2 w-36'>
                    <h3 className='font-bold'>Garnish</h3>
                    <div className='my-auto mx-auto w-20 text-center text-6xl h-full items-center flex'>
                        {getGarnishIcon(cocktail.garnish.name)}
                    </div>
                </div>
                <div className='flex flex-col justify-start items-center p-3 m-2 w-36'>
                    <h3 className='font-bold'>Abv</h3>
                    <div className='my-auto mx-auto w-20 text-center text-2xl font-bold h-full items-center flex'>
                        {calcAbv(cocktail)}
                    </div>
                </div>
            </div>
            <div className='content-container'>
                <p>{cocktail.description}</p>
                <h2>Ingredients</h2>
                <ul className='list-disc list-inside'>
                    {cocktail.ingredients.map((item: any, index: number) => <li key={index}>{[item.amount, item.unit, item.name].join(" ")}</li>)}
                </ul>
                <h2>Instructions</h2>
                <ul className="list-decimal list-inside">
                    {cocktail.instructions.split('. ').map((inst:string, index: number) => <li key={index}>{inst}</li>)}
                </ul>
            </div>
        </main>
      )
  )
}
