/*
 * Genesys Cloud Messenger / Cobrowse loader.
 *
 * 1. In Genesys Cloud Admin > Message > Messenger Configurations, enable Co-browse.
 * 2. In Admin > Message > Messenger Deployments, create a deployment and add
 *    your GitHub Pages domain (e.g. yourname.github.io) to the allowed domains.
 * 3. Paste the deployment ID and region below. Both pages load this file,
 *    so the session follows the customer from page to page.
 */
var GENESYS_DEPLOYMENT_ID = 'YOUR-DEPLOYMENT-ID';
// Region host, e.g. mypurecloud.com (US East), usw2.pure.cloud, mypurecloud.ie, euw2.pure.cloud, mypurecloud.com.au
var GENESYS_REGION = 'mypurecloud.com';

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
  environment: 'prod',
  deploymentId: GENESYS_DEPLOYMENT_ID
});
