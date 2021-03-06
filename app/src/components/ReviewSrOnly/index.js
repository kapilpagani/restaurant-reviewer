/**
* By Ryan Collins
* @Date:   2016-08-16T19:58:22-04:00
* @Email:  admin@ryancollins.io
* @Last modified time: 2016-08-16T19:59:19-04:00
* @License: All rights reserved.

 This source code is licensed under the MIT license found in the
 LICENSE file in the root directory of this source tree.
*/


import React, { PropTypes } from 'react';
import styles from './index.module.scss';
import cssModules from 'react-css-modules';

const ReviewSronly = ({
  review,
}) => (
  <a href="#" className={styles.srOnly}>
    <span>
      {`${review.total_stars} out of 5 stars.`}
    </span>
  </a>
);

ReviewSronly.propTypes = {
  review: PropTypes.object.isRequired,
};

export default cssModules(ReviewSronly, styles);
