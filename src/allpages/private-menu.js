import { 
  AccessDetails,
  ParticipantAdd,
  ParticipantEdit,
  ParticipantDetails
} from './index';
import { getLogged } from '../utils/storage'

let pvMenu = [
  {
    label: 'Participant Add',
    element: <ParticipantAdd />,
    key: '/participant-add',
    path: '/participant-add',
    exact: true,
    allowedRoles: ['Super Admin', 'Admin', 'Sekertaris']
  },
  {
    label: 'Participant Edit',
    element: <ParticipantEdit />,
    key: '/participant-edit/:id',
    path: '/participant-edit/:id',
    exact: true,
    allowedRoles: ['Super Admin', 'Admin', 'Sekertaris']
  },
  {
    label: 'Participant Detail',
    element: <ParticipantDetails />,
    key: '/participant-details',
    path: '/participant-details/:id',
    exact: true,
    allowedRoles: ['Super Admin', 'Admin', 'Sekertaris', 'Formal', 'Non Formal']
  },
  {
    label: 'Access Detail',
    element: <AccessDetails />,
    key: '/access-details',
    path: '/access-details/:id',
    exact: true,
    allowedRoles: ['Super Admin', 'Admin']
  }
]

const isLogged = getLogged();

let privateMenu = [];

if (typeof isLogged !== 'undefined' && isLogged !== null) {
  privateMenu = pvMenu.filter(route => 
    !route.allowedRoles || route.allowedRoles.includes( isLogged['role'])
  );
}

export default privateMenu;
