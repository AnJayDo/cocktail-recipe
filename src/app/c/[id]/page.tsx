"use client"

import Image from 'next/image'
import { useQuery, gql } from "@apollo/client";
import Loading from '@/app/components/Loading';

interface IIngredient {
    _id: string;
    name: string;
    unit: string;
    amount: string;
}

interface ISpirit {
    _id: string;
    name: string;
    parent: string;
}

const COCKTAIL_BY_ID_QUERY = gql`
  query GetCocktailById($id: String!) {
    cocktail(id: $id) {
      _id
      description
      garnish {
        _id
        name
        type
      }
      glassType {
        _id
        name
      }
      image
      ingredients {
        _id
        amount
        name
        unit
      }
      instructions
      mixingMethod
      name
      spirits {
        _id
        name
        parent
      }
    }
  }
`;

const tagClassList = ["btn-solid-primary","btn-solid-secondary","btn-solid-success","btn-solid-error","btn-solid-warning",]

function getGlassTypeSrcByName(name: string) {
    const srcList = ['highball','icedtea','margarita','martini','rocks','wine','mug'];
    switch(name.toLocaleUpperCase()) {
        case 'HIGHBALL':
            return srcList[0]
        case 'COUPE':
            return srcList[2]
        case 'ROCKS':
            return srcList[4]
        case 'WINE':
            return srcList[5]
        case 'MUG':
            return srcList[6]
        default:
            return srcList[3]
    }
}

function getGarnishIcon(name: string) {
    switch(name.toLocaleUpperCase()) {
        case 'LEMON':
        case 'LIME':
            return '🍋'
        case 'ORANGE':
            return '🍊'
        case 'APPLE':
            return '🍎'
        case 'GRAPEFRUIT':
            return '🍇'
        case 'CUCUMBER':
            return '🥒'
        case 'CARROT':
            return '🥕'
        case 'STRAWBERRY':
            return '🍓'
        default:
            return '🍊'
    }
}

function calcAbv(cocktail: any) {
    let totalAmount = 0;
    let alcoholAmount = 0;
    cocktail.ingredients.forEach((item: IIngredient) => {
        if(item.unit.toLocaleUpperCase() === "OZ") {
            const amountToMil = item.amount.split('/').length > 1 
                ? parseFloat(item.amount.split('/')[0])/parseFloat(item.amount.split('/')[1])*30
                : parseFloat(item.amount)*30
            if(cocktail.spirits.find((spirit: ISpirit) => item.name.toLocaleUpperCase().includes(spirit.parent))) {
                alcoholAmount += amountToMil;
            }
            totalAmount += amountToMil;
        }
    })
    return '~'+(alcoholAmount/totalAmount*0.4*100).toFixed(1)+'%'
}

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
        <main className='w-full min-h-screen pt-20 flex flex-col'>
            <h1 className='text-6xl font-bold text-white text-center mb-3'>{cocktail.name}</h1>
            <div className='flex mx-auto my-2'>
                {cocktail.spirits.map((item: any, index: number) => <div className={'mx-1 font-bold flex items-center btn-xs '+tagClassList[index%5]} key={index}>{item.name}</div>)}
            </div>
            <div className='w-full max-w-2xl rounded-2xl overflow-hidden mx-auto'>
                <Image alt={cocktail.description} width={1000} height={1000} src={cocktail.image} />
            </div>
            <div className='flex w-max max-w-2xl flex-wrap rounded-xl bg-gradient-to-br from-[#ffffff17] to-[#164b3830] mx-auto my-3'>
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
                <ul>
                    {cocktail.ingredients.map((item: any, index: number) => <li key={index}>{[item.amount, item.unit, item.name].join(" ")}</li>)}
                </ul>
                <h2>Instructions</h2>
                <p>{cocktail.instructions}</p>
                {JSON.stringify(data)}
            </div>
        </main>
      )
  )
}
