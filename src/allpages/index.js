import { lazy, Suspense } from 'react';
import LazyFallback from '../components/lazy-fallback';

const Suspensed = (Element) => function suspense(props) {
    return (
      <Suspense fallback={<LazyFallback />}>
        <Element {...props} />
      </Suspense>
    );
  };

export const Login = Suspensed(lazy(() => import('./login' /* webpackChunkName: "LoginPage"*/)));
export const Participant = Suspensed(lazy(() => import('./participant' /* webpackChunkName: "Main Page"*/)));
export const ParticipantAdd =  Suspensed(lazy(() => import('./participant/add')));
export const ParticipantEdit =  Suspensed(lazy(() => import('./participant/edit')));
export const ParticipantDetails =  Suspensed(lazy(() => import('./participant/detail')));
export const Scan = Suspensed(lazy(() => import('./scan' /* webpackChunkName: "Vote"*/)));
export const AccessDetails =  Suspensed(lazy(() => import('./access-details')));
export const Vote = Suspensed(lazy(() => import('./vote' /* webpackChunkName: "Vote"*/)));
export const Candidates = Suspensed(lazy(() => import('./candidates' /* webpackChunkName: "Vote"*/)));
