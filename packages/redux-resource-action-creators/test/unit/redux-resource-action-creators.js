import {actionTypes} from 'redux-resource';
import createActionCreators from '../../src';

describe('Redux Resource Action Creators', function() {
  beforeEach(() => {
    this.consoleError = stub(console, 'error');
  });

  it('should export a function', () => {
    expect(createActionCreators).to.be.a('function');
  });

  describe('Creating Action Creators', () => {
    it('should not console.error when a valid resourceName & crudType are provided', () => {
      createActionCreators({resourceName: 'sandwiches', crudType: 'create'});
      expect(this.consoleError).to.not.be.called;
    });
    it('should console.error when a valid resourceName is not provided', () => {
      createActionCreators({crudType: 'create'});
      expect(this.consoleError).to.be.called;
    });
    it('should console.error when a valid crudType is not provided', () => {
      createActionCreators({resourceName: 'sandwiches'});
      expect(this.consoleError).to.be.called;
    });
    it('should return an object with the expected action creator methods', () => {
      const creators = createActionCreators({resourceName: 'sandwiches', crudType: 'delete'});

      expect(creators).to.have.property('null');
      expect(creators.null).to.be.a('function');
      expect(creators).to.have.property('pending');
      expect(creators.pending).to.be.a('function');
      expect(creators).to.have.property('succeeded');
      expect(creators.succeeded).to.be.a('function');
      expect(creators).to.have.property('failed');
      expect(creators.failed).to.be.a('function');
    });
  });

  describe(' - _createAction()', () => {
    it('should return an object');
    it('should add provided options to the action');
    it('should not override provided base options on the action');
  });

  describe('pending()', () => {
    beforeEach(() => {
      this.baseOptions = {
        crudType: 'read',
        resourceName: 'sandwiches',
      };
      this.creator = createActionCreators(this.baseOptions);
    });

    it('should create an action with the expected action properties', () => {
      const action = this.creator.pending({customProp: 'customValue'});
      expect(action).to.have.property('resourceName', 'sandwiches');
      expect(action).to.have.property('type', actionTypes.READ_RESOURCES_PENDING);
      expect(action).to.have.property('customProp', 'customValue');
    });
  });

  describe('null()', () => {
    beforeEach(() => {
      this.creator = createActionCreators({
        crudType: 'update',
        resourceName: 'sandwiches',
      });
    });

    it('should create an action with the expected action properties', () => {
      const action = this.creator.null({customProp: 'customValue'});
      expect(action).to.have.property('resourceName', 'sandwiches');
      expect(action).to.have.property('type', actionTypes.UPDATE_RESOURCES_NULL);
      expect(action).to.have.property('customProp', 'customValue');
    });
  });

  describe('succeeded()', () => {
    beforeEach(() => {
      this.creator = createActionCreators({
        crudType: 'create',
        resourceName: 'sandwiches',
      });
    });

    it('should create an action with the expected action properties', () => {
      const action = this.creator.succeeded(
        [{id: 1, type: 'pb&j'}, {id: 2, type: 'cuban'}],
        {customProp: 'customValue'}
      );
      expect(action).to.have.property('resourceName', 'sandwiches');
      expect(action).to.have.property('type', actionTypes.CREATE_RESOURCES_SUCCEEDED);
      expect(action).to.have.property('customProp', 'customValue');
      expect(action).to.have.property('resources');
      expect(action.resources).to.deep.equal([{id: 1, type: 'pb&j'}, {id: 2, type: 'cuban'}]);
    });
  });

  describe('failed()', () => {
    beforeEach(() => {
      this.creator = createActionCreators({
        crudType: 'delete',
        resourceName: 'sandwiches',
      });
    });

    it('should create an action with the expected action properties', () => {
      const action = this.creator.failed('you should never delete sandwiches');
      expect(action).to.have.property('resourceName', 'sandwiches');
      expect(action).to.have.property('type', actionTypes.DELETE_RESOURCES_FAILED);
      expect(action).to.have.property('error', 'you should never delete sandwiches');
    });
  });
});
