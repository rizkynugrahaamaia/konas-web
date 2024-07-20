import { Participant, Vote } from './index';


let mainMenu = [
  {
    label: 'Peserta',
    element: <Participant />,
    path: '/',
    absolutePath: '/',
    index: true,
    exact: true,
    icon: '',
  },
  {
    label: 'Vote',
    element: <Vote />,
    path: '/vote',
    index: true,
    exact: true,
    icon: '',
  }
]

export default mainMenu;
