import { 
  AccessDetails,
  ParticipantAdd,
  ParticipantEdit,
  ParticipantDetails
} from './index';

let privateMenu = [
  {
    label: 'Participant Add',
    element: <ParticipantAdd />,
    key: '/participant-add',
    path: '/participant-add',
    exact: true,
  },
  {
    label: 'Participant Edit',
    element: <ParticipantEdit />,
    key: '/participant-edit/:id',
    path: '/participant-edit/:id',
    exact: true,
  },
  {
    label: 'Participant Detail',
    element: <ParticipantDetails />,
    key: '/participant-details',
    path: '/participant-details/:id',
    exact: true,
  },
  {
    label: 'Access Detail',
    element: <AccessDetails />,
    key: '/access-details',
    path: '/access-details/:id',
    exact: true,
  }
]

export default privateMenu;
