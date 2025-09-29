import {Aside} from '~/components/Aside';
import {Suspense} from 'react';
import {Await} from 'react-router';
import {CartMain} from '~/components/CartMain';
import type {CartApiQueryFragment} from '../../storefrontapi.generated';

export function CartAside({
  cart,
}: {
  cart: Promise<CartApiQueryFragment | null>;
}) {
  return (
    <Aside type="cart" heading="CART">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}
