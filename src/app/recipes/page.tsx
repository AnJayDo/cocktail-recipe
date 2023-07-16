"use client"

import { useQuery, gql } from "@apollo/client";
import CocktailList from '../components/CocktailList';

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
    <main className='flex flex-col w-full pt-16'>
      <section className='cocktail-list'>
        <div className="flex justify-center items-center">
          <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:max-w-7xl pb-8'>
            <CocktailList loading={loading} error={error} cocktails={data ? data.cocktails : []} />
          </div>
        </div>
      </section>
    </main>
  )
}
