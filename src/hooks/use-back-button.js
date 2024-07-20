import { useLocation, useNavigate } from 'react-router-dom';

const useBackButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getBackButtonPath = (path, states = false) => {
    let routePath = {
      pathname: path,
      qs: {
        ...location.state
      }
    };

    if (states) {
      routePath.state = {
        ...location.state,
      };
    }

    return routePath;
  };

  const setBackButtonState = (path, states = undefined) => {
    navigate({
      pathname: path,
      state: states ?
        { ...states }
        : { ...location.state }
    });
  };

  const qs = location.qs ?? undefined;

  return { getBackButtonPath, setBackButtonState, qs };
};

export default useBackButton;
