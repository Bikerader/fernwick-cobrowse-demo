/*
 * Legal disclaimer shown with the Messenger SDK Toaster plugin.
 *
 * Shown once per browser session. Accepting hides it for the rest of the
 * session; declining hides the Messenger launcher so no chat or co-browse
 * session can start. Edit the text below to match your legal wording.
 */
var DISCLAIMER = {
  title: 'Before you chat with us',
  body: 'Chats may be recorded and monitored for quality and training. ' +
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
  function hideLauncher() {
    Genesys('command', 'Launcher.hide', {}, function () {}, function () {
      console.warn('[demo] Could not hide the Messenger launcher.');
    });
  }

  var choice = getChoice();
  if (choice === 'declined') {
    Genesys('subscribe', 'Launcher.ready', hideLauncher);
    return;
  }
  if (choice === 'accepted') return;

  Genesys('subscribe', 'Toaster.ready', function () {
    Genesys('command', 'Toaster.open', {
      title: DISCLAIMER.title,
      body: DISCLAIMER.body,
      buttons: {
        type: 'binary',
        primary: DISCLAIMER.agree,
        secondary: DISCLAIMER.decline
      }
    }, function () {
      // Primary button: disclaimer accepted
      saveChoice('accepted');
    }, function () {
      // Secondary button or closed: treat as declined
      saveChoice('declined');
      hideLauncher();
    });
  });
})();
