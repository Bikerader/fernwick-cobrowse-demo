/*
 * Genesys Cloud Messenger / Cobrowse loader.
 *
 * 1. In Genesys Cloud Admin > Message > Messenger Configurations, enable Co-browse.
 * 2. In Admin > Message > Messenger Deployments, create a deployment and add
 *    your GitHub Pages domain (e.g. yourname.github.io) to the allowed domains.
 * 3. Paste the deployment ID and region below. Both pages load this file,
 *    so the session follows the customer from page to page.
 */
var GENESYS_DEPLOYMENT_ID = 'ea0c2624-201e-47e0-89aa-8de0de0962c3';
// Region host, e.g. mypurecloud.com (US East), usw2.pure.cloud, mypurecloud.ie, euw2.pure.cloud, mypurecloud.com.au
var GENESYS_REGION = 'usw2.pure.cloud';

// Messenger "environment" value for each region host. It must match the region
// the deployment lives in, or Genesys answers 403 and Messenger never loads.
var GENESYS_ENVIRONMENTS = {
  'mypurecloud.com': 'prod',
  'use2.us-gov-pure.cloud': 'prod-use2',
  'usw2.pure.cloud': 'prod-usw2',
  'cac1.pure.cloud': 'prod-cac1',
  'mypurecloud.ie': 'prod-euw1',
  'euw2.pure.cloud': 'prod-euw2',
  'mypurecloud.de': 'prod-euc1',
  'mypurecloud.com.au': 'prod-apse2',
  'mypurecloud.jp': 'prod-apne1',
  'aps1.pure.cloud': 'prod-aps1',
  'apne2.pure.cloud': 'prod-apne2',
  'sae1.pure.cloud': 'prod-sae1'
};

(function (g, e, n, es, ys) {
  if (GENESYS_DEPLOYMENT_ID === 'YOUR-DEPLOYMENT-ID') {
    console.warn('[demo] Genesys deployment ID not set in js/genesys.js; Messenger not loaded.');
    return;
  }
  g['_genesysJs'] = e;
  g[e] = g[e] || function () {
    (g[e].q = g[e].q || []).push(arguments);
  };
  g[e].t = 1 * new Date();
  g[e].c = es;
  ys = document.createElement('script');
  ys.async = 1;
  ys.src = n;
  ys.charset = 'utf-8';
  document.head.appendChild(ys);
})(window, 'Genesys', 'https://apps.' + GENESYS_REGION + '/genesys-bootstrap/genesys.min.js', {
  environment: GENESYS_ENVIRONMENTS[GENESYS_REGION] || 'prod',
  deploymentId: GENESYS_DEPLOYMENT_ID
});
