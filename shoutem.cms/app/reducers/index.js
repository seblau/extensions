import { REHYDRATE } from 'redux-persist/constants';
import _ from 'lodash';

export const UPDATE_LOCATION_PERMISSION = 'shoutem.cms.UPDATE_LOCATION_PERMISSION';
export const UPDATE_SECOND_PROMPT = 'shoutem.cms.UPDATE_SECOND_PROMPT';
export const PermissionStatus = { APPROVED: 'approved', DENIED: 'denied' };

export const updateLocationPermission = (permission) => {
  return { type: UPDATE_LOCATION_PERMISSION, permission };
};

export const updateSecondPromptStatus = (secondPrompt) => {
  return { type: UPDATE_SECOND_PROMPT, secondPrompt };
};

const initialPermissionState = {
  permission: undefined,
  secondPrompt: false,
};

const permissionReducer = (state = initialPermissionState, action) => {
  const { type, permission, secondPrompt } = action;

  switch (type) {
    case REHYDRATE:
      return { ..._.get(action, ['payload', 'shoutem.cms', 'permissionStatus']) };
    case UPDATE_LOCATION_PERMISSION:
      return { ...state, permission };
    case UPDATE_SECOND_PROMPT:
      return { ...state, secondPrompt };
    default: return state;
  }
};

export default permissionReducer;
