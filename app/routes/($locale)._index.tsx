import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {type MetaFunction, useLoaderData} from 'react-router';
import {getLocaleFromRequest} from '~/lib/i18n';
import {HOMEPAGE_METAOBJECT_QUERY} from '~/graphql/pages/HomepageMetaobjectQuery';

function loadDeferredData({context}: LoaderFunctionArgs) {
  // const recommendedProducts = context.storefront
  //   .query(RECOMMENDED_PRODUCTS_QUERY)
  //   .catch((error) => {
  //     console.error(error);
  //     return null;
  //   });

  return {
    // recommendedProducts,
  };
}

async function loadCriticalData({request, context}: LoaderFunctionArgs) {
  const {language} = getLocaleFromRequest(request);

  const [{homepage}] = await Promise.all([
    context.storefront.query(HOMEPAGE_METAOBJECT_QUERY, {
      variables: {
        handle: {type: 'homepage', handle: 'homepage-dtk6c7xs'},
        language,
      },
      cache: context.storefront.CacheShort(),
    }),
  ]);

  return {
    homepage,
  };
}

export async function loader(args: LoaderFunctionArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

export const meta: MetaFunction = (args) => {
  const title =
    args.data?.homepage?.metaPola?.reference?.title?.value ?? 'Smolna 38';
  const description =
    args.data?.homepage?.metaPola?.reference?.desc?.value ?? '';

  return [
    {
      title,
    },
    {name: 'description', content: description},
    {name: 'og:title', content: title},
    {name: 'og:description', content: description},
  ];
};

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home">
      HOMEPAGE
      {/*<FeaturedCollection collection={data.featuredCollection} />*/}
      {/*<RecommendedProducts products={data.recommendedProducts} />*/}
    </div>
  );
}

// function FeaturedCollection({
//   collection,
// }: {
//   collection: FeaturedCollectionFragment;
// }) {
//   if (!collection) return null;
//   const image = collection?.image;
//   return (
//     <Link
//       className="featured-collection"
//       to={`/collections/${collection.handle}`}
//     >
//       {image && (
//         <div className="featured-collection-image">
//           <Image data={image} sizes="100vw" />
//         </div>
//       )}
//       <h1>{collection.title}</h1>
//     </Link>
//   );
// }

// function RecommendedProducts({
//   products,
// }: {
//   products: Promise<RecommendedProductsQuery | null>;
// }) {
//   return (
//     <div className="recommended-products">
//       <h2>Recommended Products</h2>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Await resolve={products}>
//           {(response) => (
//             <div className="recommended-products-grid">
//               {response
//                 ? response.products.nodes.map((product) => (
//                     <ProductItem key={product.id} product={product} />
//                   ))
//                 : null}
//             </div>
//           )}
//         </Await>
//       </Suspense>
//       <br />
//     </div>
//   );
// }
