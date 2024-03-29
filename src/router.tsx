import {lazy, Suspense} from 'react';
import {Navigate} from 'react-router-dom';
import {RouteObject} from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader/>}>
      <Component {...props} />
    </Suspense>
  );


// Pages

const Main = Loader(lazy(() => import('src/content/Main')));

// Management

const Services = Loader(lazy(() => import('src/content/management/Services/Services')));
const Blog = Loader(lazy(() => import('src/content/management/Blog/Blog')));
const Profile = Loader(lazy(() => import('src/content/management/Profile/Profile')));
const Reviews = Loader(lazy(() => import('src/content/management/Reviews/Reviews')));
const Stones = Loader(lazy(() => import('src/content/management/Stones/Stones')));
const StonePictures = Loader(lazy(() => import('src/content/management/StonePictures')));

// Dashboards

const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// Applications

const Messenger = Loader(
  lazy(() => import('src/content/applications/Messenger'))
);
const Transactions = Loader(
  lazy(() => import('src/content/applications/Transactions'))
);
const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);

// Components

const Buttons = Loader(
  lazy(() => import('src/content/pages/Components/Buttons'))
);
const Modals = Loader(
  lazy(() => import('src/content/pages/Components/Modals'))
);
const Accordions = Loader(
  lazy(() => import('src/content/pages/Components/Accordions'))
);
const Tabs = Loader(lazy(() => import('src/content/pages/Components/Tabs')));
const Badges = Loader(
  lazy(() => import('src/content/pages/Components/Badges'))
);
const Tooltips = Loader(
  lazy(() => import('src/content/pages/Components/Tooltips'))
);
const Avatars = Loader(
  lazy(() => import('src/content/pages/Components/Avatars'))
);
const Cards = Loader(lazy(() => import('src/content/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('src/content/pages/Components/Forms')));

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Login = Loader(
  lazy(() => import('src/content/pages/Status/login'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

const routes: RouteObject[] = [
  {
    path: '',
    element: <SidebarLayout/>,
    children: [
      {
        path: '/',
        element: <Main/>
      },
      {
        path: 'services',
        element: <Services />
      },
      {
        path: 'blog',
        element: <Blog />
      },
      {
        path: 'portfolio',
        element: <Profile />
      },
      {
        path: 'stones',
        element: <Stones />
      },
      {
        path: 'stone-pictures',
        element: <StonePictures />
      },
      {
        path: 'reviews',
        element: <Reviews />
      },
    ]
  },
  {
    path: '/login',
    element: <Login/>
  },
  // {
  //   path: 'status',
  //   element: <BaseLayout/>,
  //   children: [
  //     {
  //       path: '',
  //      element: <Navigate to="404" replace/>
  //    },
  //    {
  //       path: '404',
  //       element: <Status404/>
  //     },
  //     {
  //       path: '500',
  //       element: <Status500/>
  //     },
  //     {
  //       path: 'maintenance',
  //       element: <StatusMaintenance/>
  //     },
  //     {
  //       path: 'coming-soon',
  //       element: <StatusComingSoon/>
  //     }
  //   ]
  // },
  // {
  //   path: 'dashboards',
  //   element: <SidebarLayout/>,
  //   children: [
  //     {
  //       path: '',
  //       element: <Navigate to="crypto" replace/>
  //     },
  //     {
  //       path: 'crypto',
  //       element: <Crypto/>
  //     },
  //     {
  //       path: 'messenger',
  //       element: <Messenger/>
  //     }
  //   ]
  // },
  // {
  //   path: 'management',
  //   element: <SidebarLayout/>,
  //   children: [
  //     {
  //       path: '',
  //       element: <Navigate to="transactions" replace/>
  //     },
  //     {
  //       path: 'transactions',
  //       element: <Transactions/>
  //     },
  //     {
  //       path: 'profile',
  //       children: [
  //         {
  //           path: '',
  //           element: <Navigate to="details" replace/>
  //         },
  //         {
  //           path: 'details',
  //           element: <UserProfile/>
  //         },
  //         {
  //           path: 'settings',
  //           element: <UserSettings/>
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   path: '/components',
  //   element: <SidebarLayout/>,
  //   children: [
  //     {
  //       path: '',
  //       element: <Navigate to="buttons" replace/>
  //     },
  //     {
  //       path: 'buttons',
  //       element: <Buttons/>
  //     },
  //     {
  //       path: 'modals',
  //       element: <Modals/>
  //     },
  //     {
  //       path: 'accordions',
  //       element: <Accordions/>
  //     },
  //     {
  //       path: 'tabs',
  //       element: <Tabs/>
  //     },
  //     {
  //       path: 'badges',
  //       element: <Badges/>
  //     },
  //     {
  //       path: 'tooltips',
  //       element: <Tooltips/>
  //     },
  //     {
  //       path: 'avatars',
  //       element: <Avatars/>
  //     },
  //     {
  //       path: 'cards',
  //       element: <Cards/>
  //     },
  //     {
  //       path: 'forms',
  //       element: <Forms/>
  //     }
  //   ]
  // },
  {
    path: '*',
    element: <Status404 />
  }
];

export default routes;
