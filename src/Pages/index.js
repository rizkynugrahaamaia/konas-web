import { lazy, Suspense } from 'react';
import LazyFallback from '../components/LazyFallback';

const Suspensed = (Element) => function suspense(props) {
    return (
      <Suspense fallback={<LazyFallback />}>
        <Element {...props} />
      </Suspense>
    );
  };

export const MainPage = Suspensed(lazy(() => import('./MainPage' /* webpackChunkName: "Main Page"*/)));
export const ParticipantDetails =  Suspensed(lazy(() => import('./ParticipantDetails')));
export const AccessDetails =  Suspensed(lazy(() => import('./AccessDetails')));
