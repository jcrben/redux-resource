import {actionTypes} from 'redux-resource';

// is this better for testing?
const _createAction = function(options, baseOptions) {
  return {
    ...options,
    ...baseOptions,
  };
};

const createActionCreators = (options = {}) => {
  const {crudType, resourceName} = options;

  const uppercaseCrud = crudType ? crudType.toUpperCase() : '';
  const isValidCrudType =
    uppercaseCrud === 'UPDATE' || uppercaseCrud === 'DELETE' ||
    uppercaseCrud === 'READ' || uppercaseCrud === 'CREATE';

  if (!isValidCrudType) {
    return console.error('hey wtf it needs to be a thing');
  }

  if (!resourceName) {
    return console.error('hey wtf it needs to be a thing');
  }

  return {
    pending: (options) => _createAction(options, {
      resourceName,
      type: actionTypes[`${uppercaseCrud}_RESOURCES_PENDING`]
    }),
    null: (options) => _createAction(options, {
      resourceName,
      type: actionTypes[`${uppercaseCrud}_RESOURCES_NULL`]
    }),
    succeeded: (resources, options) => _createAction(options, {
      resourceName,
      resources,
      type: actionTypes[`${uppercaseCrud}_RESOURCES_SUCCEEDED`]
    }),
    failed: (error, options) => _createAction(options, {
      resourceName,
      error,
      type: actionTypes[`${uppercaseCrud}_RESOURCES_FAILED`]
    }),
  };
};

export default createActionCreators;
