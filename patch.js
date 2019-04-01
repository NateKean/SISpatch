
// Patching may take multiple attempts because
// this script may execute faster than the
// login box loads.
// If this is the case, this script will try
// to patch the username field before it
// exists.
// Thus, measures have been put in place to
// ensure the script will continue attempting to
// patch the username field until it succeeds,
// ensuring near 100% successful patch rate.

// Patch code
let p = `try {
    document.getElementById('inputUserName').type = 'password';
} catch (e) {}
try {
    document.getElementById('txtUserName').type = 'password';
} catch (e) {}`;

function attemptPatch() {

    console.log("Attempting to patch...");

    // Create <script> element
    let s = document.createElement("script");
    s.textContent = p;

    // Execute script on page
    (document.head||document.documentElement).appendChild(s);
    s.remove();
    
    // Check for success
    let unField = document.getElementById("inputUserName");
    if ((unField) && (unField.type == "password")) {
        console.log("Successfully patched.");
        return; // Stop repeating
    }

    unField = document.getElementById("txtUserName");
    if ((unField) && (unField.type == "password")) {
        console.log("Successfully patched.");
        return; // Stop repeating
    }

    // Repeat attempt
    setTimeout(attemptPatch, 100);
}

// Begin first attempt
attemptPatch();
