import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as RestaurantsGridActionCreators from './actions';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import {
  Tabs,
  Tab,
  Section,
  Notification,
  Article,
  Header,
} from 'grommet';
import {
  RestaurantGrid,
  LoadingIndicator,
} from 'components';

class RestaurantsGrid extends Component {
  componentDidMount() {
    const {
      actions,
    } = this.props;
    actions.loadRestaurants();
  }
  render() {
    const {
      restaurants,
      isLoading,
      errors,
      selectedFilterIndex,
      categories,
    } = this.props;
    return (
      <div className={styles.restaurantsGrid}>
        <Article>
          <Header justify="center" pad={{ vertical: 'medium' }}>
            <h1>
              Restaurants
            </h1>
          </Header>
          <Section primary>
            {!isLoading && errors.length > 0 &&
              <Notification
                status="critical"
                message={errors[0].message}
                timestamp={{}}
                state="Active"
              />
            }
            {isLoading ?
              <LoadingIndicator isLoading />
            :
              <div>
                <Tabs initialIndex={selectedFilterIndex} justify="center">
                  <Tab title="All">
                    <RestaurantGrid restaurants={restaurants} />
                  </Tab>
                  {typeof categories !== 'undefined' && categories.map(cat =>
                    <Tab title={cat}>
                      <RestaurantGrid restaurants={restaurants.filter(i => i.type.name === cat)} />
                    </Tab>
                  )}
                </Tabs>
              </div>
            }
          </Section>
        </Article>
      </div>
    );
  }
}

RestaurantsGrid.propTypes = {
  restaurants: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.array,
  selectedFilterIndex: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
};

// mapStateToProps :: {State} -> {Props}
const mapStateToProps = (state) => ({
  restaurants: state.restaurants.items,
  selectedFilterIndex: state.restaurants.selectedFilterIndex,
  isLoading: state.restaurants.isLoading,
  errors: state.restaurants.errors,
  categories: state.restaurants.categories,
});

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    RestaurantsGridActionCreators,
    dispatch
  ),
});

const Container = cssModules(RestaurantsGrid, styles);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
