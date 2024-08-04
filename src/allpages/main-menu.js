import { Participant, ParticipantDetails, Scan, Vote } from './index';
import { getLogged } from '../utils/storage'
import icons from '../configs/icons'

let menus= [
  {
    label: 'Peserta',
    element: <Participant />,
    path: '/',
    absolutePath: '/',
    index: true,
    exact: true,
    icon: icons.menu_peserta,
    allowedRoles: ['Super Admin', 'Admin', 'Sekertaris']
  },
  {
    label: 'Peserta',
    element: <ParticipantDetails />,
    key: '/participant-details',
    path: '/participant-details',
    exact: true,
    icon: icons.menu_peserta,
    allowedRoles: ['Formal', 'Non Formal']
  },
  {
    label: 'Scan',
    element: <Scan />,
    path: '/scan',
    index: true,
    exact: true,
    icon: icons.menu_scan,
    allowedRoles: ['Super Admin', 'Admin']
  },
  {
    label: 'Vote',
    element: <Vote />,
    path: '/vote',
    index: true,
    exact: true,
    icon: icons.menu_vote,
    allowedRoles: ['Super Admin', 'Formal']
  }
]

const isLogged = getLogged();

let mainMenu = [];

if (typeof isLogged !== 'undefined' && isLogged !== null) {
  mainMenu = menus.filter(route => 
    !route.allowedRoles || route.allowedRoles.includes( isLogged['role'])
  );
}

export default mainMenu;
