"use client"

import { useQuery, gql } from "@apollo/client";
import CocktailList from './components/CocktailList';
import Link from "next/link";

const COCKTAILS_QUERY = gql`
  query AllCocktails {
    cocktails {
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

export default function Home() {
  const { loading, error, data } = useQuery(COCKTAILS_QUERY);

  return (
    <main className='flex flex-col w-full'>
      <section className={`bg-[url("/bg.jpg")] bg-cover bg-center w-full h-screen`}>
        <div className='bg-[#00000063] h-screen w-full flex flex-col justify-center items-center'>
          <h1 className='font-extrabold text-6xl md:text-8xl text-center'>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>Cocktail Recipes</span><br/> for everyone
          </h1>
          <p className='text-center mx-auto my-3 opacity-80'>
            Build by Jay An with 💔 a broken heart. 
          </p>
        </div>
      </section>
      <section className='cocktail-list'>
        <div className='flex justify-center items-center'>
          <h1 className='font-extrabold text-4xl text-center'>Recipes</h1>
        </div>
        <div className="flex justify-center items-center">
          <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:max-w-7xl pb-8'>
            <CocktailList loading={loading} error={error} cocktails={data ? data.cocktails.slice(0, 3) : []} />
          </div>
        </div>
        {!loading && <Link href={'/recipes'} className="btn btn-outline-secondary btn-lg mx-auto">Explore</Link>}
      </section>
    </main>
  )
}
