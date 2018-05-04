const R = require('ramda');

const React = require('react');

import {
  compose,
  withState,
  withHandlers
} from 'recompose';

export function withForm (WrappedComponent) {
  return class extends React.Component {

    constructor (props) {
      super(props);
      this.manageField = this.manageField.bind(this);
      this.isValid = this.isValid.bind(this);
      this.values = this.values.bind(this);
      
      this.isFetching = this.isFetching.bind(this);
      this.setFetching = this.setFetching.bind(this);
      
      this.hasError = this.hasError.bind(this);
      this.onError = this.onError.bind(this);
      this.setError = this.setError.bind(this);

      this.isDone = this.isDone.bind(this);
      this.setDone = this.setDone.bind(this);

      this.reset = this.reset.bind(this);
      
      this.fields = {};
      this.state = {
        fields: {},
        fetching: false,
        error: null,
        done: false
      };
    }

    fieldIsValid (field) {
      return R.is(Function, R.prop('isValid', field)) ? field.isValid(field.value, R.pluck('value', this.state.fields)) : true; 
    }

    isValid () {
      function isTrue(v) { 
        return v;
      }

      function compute(previousValue, field) {
        return previousValue && this.fieldIsValid(field);
      }

      return R.reduceWhile(isTrue, compute.bind(this), true, R.values(this.state.fields));
    }

    manageField (key, { defaultValue, isValid, styleOnNotValid, styleOnError, valueKey = 'value' }) {
      function component (component) {
        
        function onChange (e) {
          if (!R.isNil(R.pathOr(undefined, ['target', 'value'], e))) {
            this.setState({ error: null, fields: R.assocPath([key, 'value'], e.target.value, fields)});
          } else {
            this.setState({ error: null, fields: R.assocPath([key, 'value'], e, fields)});
          }
        }

        const { fields } = this.state;
        let field = R.propOr({ value: '', isValid: null }, key, fields);
        if (!R.has(key, fields)) {
          this.fields = R.assoc(key, { value: defaultValue, isValid })(this.fields);
          return null;
        } else {
          return React.cloneElement(
          component,
            {
              style: R.merge(
                component.props.style, 
                !this.fieldIsValid(field) ? styleOnNotValid : {}, 
                this.hasError() ? styleOnError : {}
              ),
              [valueKey]: field.value,
              onChange: onChange.bind(this)
            }
          );
        }
      };

      return component.bind(this);
    }

    values () {
      return R.pluck('value', this.state.fields);
    }

    hasError () {
      return !R.isNil(this.state.error);
    }

    onError (callback) {
      if (R.isNil(this.state.error)) return null;

      return callback(this.state.error);
    }

    setError (error) {
      return this.setState({ error });
    }

    isDone () {
      return this.state.done;
    }

    setDone () {
      return this.setState({ done: true });
    }

    isFetching () {
      return this.state.fetching;
    }

    setFetching (fetching) {
      return this.setState({ fetching });
    }

    reset () {
      this.setState({
        fields: this.fields,
        error: null,
        done: false,
        fetching: false
      });
    }

    componentDidMount () {
      return this.setState({ fields: this.fields });
    }

    render () {
      return React.createElement(
        WrappedComponent, 
        R.merge(
          this.props,
          {
            form: { 
              isValid: this.isValid, 
              manageField: this.manageField, 
              hasError: this.hasError,
              onError: this.onError,
              setError: this.setError,
              isFetching: this.isFetching,
              setFetching: this.setFetching,
              isDone: this.isDone,
              reset: this.reset,
              setDone: this.setDone,
              values: this.values 
            }
          }
        )
      ) 
    }
  };
}

export default withForm;
