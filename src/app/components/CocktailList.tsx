import Image from 'next/image';
import Link from 'next/link';
import Loading from './Loading';
import { ApolloError } from '@apollo/client';

const Cocktail = ({ cocktail }: { cocktail: any }) => {
  return (
    <div className='p-3 border-2 border-slate-600 bg-zinc-900 rounded-2xl grid grid-cols-1 gap-2 pb-4 hover:scale-105 hover:brightness-120 transition-all'>
      <Link href={'/c/' + cocktail._id} className='w-full max-h-[calc(1280px/3)] overflow-hidden rounded-xl'>
        <Image
          width={500}
          height={500}
          src={cocktail.image}
          alt={cocktail.description}
        />
      </Link>
      <Link href={'/c/' + cocktail._id}><h1 className='font-bold text-xl'>{cocktail.name}</h1></Link>
      <p className='opacity-60'>{cocktail.description.length > 100 ? cocktail.description.slice(0, 100) + '...' : cocktail.description}</p>
      <div className='flex justify-end'>
        <Link href={'/c/' + cocktail._id} className='btn btn-solid-secondary'>
          Read more
        </Link>
      </div>
    </div>
  );
};

interface ICocktailList {
  cocktails: any[];
  loading: boolean;
  error: ApolloError | undefined;
}

const CocktailList = ({ cocktails, loading, error }: ICocktailList) => {
  return loading ? (
    <Loading />
  ) : error ? (
    <p>Error : {error.message}</p>
  ) : (
    <>
      {cocktails.map((item) => (
        <Cocktail key={item._id} cocktail={item} />
      ))}
    </>
  );
};

export default CocktailList;
