// Generated by CoffeeScript 1.3.3

/*
Backbone.Statemanager, v0.0.1-alpha
Copyright (c)2012 Patrick Camacho and Mark Roseboom, Crashlytics
Distributed under MIT license
http://github.com/crashlytics/backbone.statemanager
*/


(function() {

  Backbone.StateManager = (function(Backbone, _) {
    var StateManager, _deepBindAll;
    StateManager = function(states, options) {
      this.options = options != null ? options : {};
      this.states = new StateManager.States(states);
      return this;
    };
    StateManager.extend = Backbone.View.extend;
    _.extend(StateManager.prototype, Backbone.Events, {
      getCurrentState: function() {
        return this.currentState;
      },
      addState: function(name, callbacks) {
        this.states.add(name, callbacks);
        return this.trigger('add:state', name);
      },
      removeState: function(name) {
        this.states.remove(name);
        return this.trigger('remove:state', name);
      },
      initialize: function(options) {
        var initial;
        if (options == null) {
          options = {};
        }
        if (initial = this.states.findInitial()) {
          return this.triggerState(initial, options);
        }
      },
      triggerState: function(state, options) {
        if (options == null) {
          options = {};
        }
        if (!(state === this.currentState && !options.reEnter)) {
          _.extend(options, {
            toState: state,
            fromState: this.currentState
          });
          if (this.currentState) {
            this.exitState(options);
          }
          return this.enterState(state, options);
        } else {
          return false;
        }
      },
      enterState: function(state, options) {
        var matchedState;
        if (options == null) {
          options = {};
        }
        if (!((matchedState = this.states.find(this.currentState)) && _.isFunction(matchedState.enter))) {
          return false;
        }
        this.trigger('before:enter:state', state, matchedState, options);
        matchedState.enter(options);
        this.trigger('enter:state', this.currentState, matchedState, options);
        this.currentState = state;
        return this;
      },
      exitState: function(options) {
        var matchedCurrentState, matchedToState;
        if (options == null) {
          options = {};
        }
        if (!((matchedCurrentState = this.states.find(this.currentState)) && _.isFunction(matchedCurrentState.exit))) {
          return false;
        }
        this.trigger('before:exit:state', this.currentState, matchedCurrentState, options);
        if ((matchedToState = this.states.find(options.toState)) && matchedToState.findTransition('onBeforeExitTo', options.toState)) {
          matchedToState.transitions["onBeforeExitTo:" + options.toState](options);
        }
        matchedCurrentState.exit(options);
        if ((matchedToState = this.states.find(options.toState)) && matchedToState.findTransition('onExitTo', options.toState)) {
          matchedToState.transitions["onExitTo:" + options.toState](options);
        }
        this.trigger('exit:state', this.currentState, matchedCurrentState, options);
        delete this.currentState;
        return this;
      }
    });
    StateManager.States = function(states) {
      var _this = this;
      this.states = {};
      if (states && _.isObject(states)) {
        _.each(states, function(value, key) {
          return _this.add(key, value);
        });
      }
      return this;
    };
    _.extend(StateManager.States.prototype, {
      add: function(name, callbacks) {
        if (!(_.isString(name) && _.isObject(callbacks))) {
          return false;
        }
        return this.states[name] = new StateManager.State(name, callbacks);
      },
      remove: function(name) {
        if (!_.isString(name)) {
          return false;
        }
        return delete this.states[name];
      },
      find: function(name) {
        if (!_.isString(name)) {
          return false;
        }
        return _.chain(this.states).find(function(state) {
          return state.matchName(name);
        }).value();
      },
      findInitial: function() {
        var _this = this;
<<<<<<< HEAD
        return _.chain(this.states).keys().find(function(state) {
          return _this.states[state].initial;
        }).value();
      },
      findTransition: function(type, name) {}
=======
        return _.find(this.states, function(value, name) {
          return value.initial;
        });
      }
>>>>>>> 7a60c835fd66ed2f2ea27a0a93d0be9a0b04fc8f
    });
    StateManager.State = function(name, options) {
      this.name = name;
      _.extend(this, options);
      this.regExpName = StateManager.State._regExpStateConversion(this.name);
      return this;
    };
    _.extend(StateManager.State.prototype, {
      matchName: function(name) {
        return this.regExpName.test(name);
      },
      findTransition: function(type, name) {}
    });
    StateManager.State._regExpStateConversion = function(name) {
      name = name.replace(/[-[\]{}()+?.,\\^$|#\s]/g, '\\$&').replace(/:\w+/g, '([^\/]+)').replace(/\*\w+/g, '(.*?)');
      return new RegExp("^" + name + "$");
    };
    StateManager.addStateManager = function(target, options) {
      var stateManager;
      if (options == null) {
        options = {};
      }
      if (!target) {
        new Error('Target must be defined');
      }
      _deepBindAll(target.states, target);
      target.stateManager = stateManager = new Backbone.StateManager(target.states, options);
      target.triggerState = function() {
        return stateManager.triggerState.apply(stateManager, arguments);
      };
      target.getCurrentState = function() {
        return stateManager.getCurrentState();
      };
      if (options.initialize || _.isUndefined(options.initialize)) {
        stateManager.initialize(options);
      }
      return delete target.states;
    };
    _deepBindAll = function(obj) {
      var target;
      target = _.last(arguments);
      _.each(obj, function(value, key) {
        if (_.isFunction(value)) {
          return obj[key] = _.bind(value, target);
        } else if (_.isObject(value)) {
          return obj[key] = _deepBindAll(value, target);
        }
      });
      return obj;
    };
    return StateManager;
  })(Backbone, _);

}).call(this);
