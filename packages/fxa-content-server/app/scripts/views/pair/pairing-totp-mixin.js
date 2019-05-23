/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import AuthErrors from '../../lib/auth-errors';

export default function () {
  return {
    hasTotpEnabledOnAccount(profile) {
      return profile.authenticationMethods && profile.authenticationMethods.includes('otp');
    },
    cancelPairingWithError(err) {
      this.replaceCurrentPage('pair/failure', {
        error: err,
      });
    },
    checkTotpStatus() {
      const account = this.getSignedInAccount();

      if (! account) {
        return this.cancelPairingWithError(AuthErrors.toError('UNKNOWN_ACCOUNT'));
      }

      return account.accountProfile().then((profile) => {
        if (this.model.get('totpComplete')) {
          // once the user with TOTP successfully verifies we check the /exists endpoint
          // it can throw on unverified sessions or tell us if TOTP doesn't exist
          return account.checkTotpTokenExists().then((result) => {
            if (! result.exists) {
              throw AuthErrors.toError('TOTP_CODE_REQUIRED');
            }
          }).catch((err) => {
            this.cancelPairingWithError(err);
          });
        }

        if (this.hasTotpEnabledOnAccount(profile)) {
          return this.replaceCurrentPage('pair/auth/totp');
        }
      });
    }
  };
}
