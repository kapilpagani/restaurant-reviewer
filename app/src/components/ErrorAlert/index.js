/**
* By Ryan Collins
* @Date:   2016-08-16T19:54:53-04:00
* @Email:  admin@ryancollins.io
* @Last modified time: 2016-08-16T20:00:32-04:00
* @License: All rights reserved.

 This source code is licensed under the MIT license found in the
 LICENSE file in the root directory of this source tree.
*/

import React, { PropTypes } from 'react';
import styles from './index.module.scss';
import cssModules from 'react-css-modules';
import Notification from 'grommet/components/notification';
import CloseIcon from 'grommet/components/icons/base/Close';
import Button from 'grommet/components/button';
import Section from 'grommet/components/Section';

const ErrorAlert = ({
  errors,
  onClose,
}) => (
  <Section className={styles.errorAlert}>
    {errors.length > 0 && errors.map((error, i) =>
      <div key={i} className={styles.error}>
        <div className="error-alert__closer">
          <Button
            plain
            onClick={onClose}
            className={styles.closeButton}
            a11yTitle="Close Alert"
          >
            <CloseIcon a11yTitle="Close Alert" />
          </Button>
        </div>
        <Notification
          role="alert"
          style={{ paddingTop: 10 }}
          status="critical"
          a11yTitle="Submission Failed"
          size="small"
          message={error.message}
          state="Active"
        />
      </div>
    )}
  </Section>
);

ErrorAlert.propTypes = {
  errors: PropTypes.array,
  onClose: PropTypes.func.isRequired,
};

export default cssModules(ErrorAlert, styles);
