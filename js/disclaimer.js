/*
 * Legal disclaimer shown with the Messenger SDK Toaster plugin.
 *
 * Shown once per browser session. Accepting hides it for the rest of the
 * session; declining hides the Messenger launcher so no chat or co-browse
 * session can start. Edit the text below to match your legal wording.
 */
var DISCLAIMER = {
  title: 'Before you CoBrowse with us',
  body: 'Sessions may be recorded and monitored for quality and training. ' +
        'If you agree to co-browse, our agent can see this website as you see it, ' +
        'but not other tabs or apps on your device. Payment card fields are always hidden from the agent. ' +
        'By selecting "I agree" you consent to these terms.',
  agree: 'I agree',
  decline: 'No thanks'
};

(function () {
  if (typeof window.Genesys !== 'function') return; // Messenger not loaded (no deployment ID)

  var KEY = 'fernwick-disclaimer';

  function getChoice() {
    try { return sessionStorage.getItem(KEY); } catch (e) { return null; }
  }
  function saveChoice(value) {
    try { sessionStorage.setItem(KEY, value); } catch (e) { /* storage blocked: ask again next page */ }
  }
  // Launcher.hide only works when the Messenger configuration lets the page
  // control the launcher. If Genesys rejects it, hide the Messenger with CSS.
  function hideLauncher() {
    Genesys('command', 'Launcher.hide', {}, function () {}, function () {
      document.documentElement.classList.add('messenger-hidden');
    });
  }

  var choice = getChoice();
  if (choice === 'declined') {
    Genesys('subscribe', 'Launcher.ready', hideLauncher);
    return;
  }
  if (choice === 'accepted') return;

  // Toaster.open's own callbacks fire when the toaster opens, not when a
  // button is clicked, so the choice is read from the Toaster events instead.
  Genesys('subscribe', 'Toaster.accepted', function () {
    saveChoice('accepted');
  });
  Genesys('subscribe', 'Toaster.declined', function () {
    saveChoice('declined');
    hideLauncher();
  });
  Genesys('subscribe', 'Toaster.closed', function () {
    // Closed with the X and no button chosen: treat as declined
    if (!getChoice()) {
      saveChoice('declined');
      hideLauncher();
    }
  });

  Genesys('subscribe', 'Toaster.ready', function () {
    Genesys('command', 'Toaster.open', {
      title: DISCLAIMER.title,
      body: DISCLAIMER.body,
      buttons: {
        type: 'binary',
        primary: DISCLAIMER.agree,
        secondary: DISCLAIMER.decline
      }
    });
  });
})();
