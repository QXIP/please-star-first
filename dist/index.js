import './sourcemap-register.cjs';/******/ var __webpack_modules__ = ({

/***/ 817:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 923:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __nccwpck_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	var threw = true;
/******/ 	try {
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 		threw = false;
/******/ 	} finally {
/******/ 		if(threw) delete __webpack_module_cache__[moduleId];
/******/ 	}
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/* harmony import */ var _actions_core__WEBPACK_IMPORTED_MODULE_0__ = __nccwpck_require__(817);
/* harmony import */ var _actions_github__WEBPACK_IMPORTED_MODULE_1__ = __nccwpck_require__(923);



try {
  const token = _actions_core__WEBPACK_IMPORTED_MODULE_0__.getInput('token');

  const octokit = _actions_github__WEBPACK_IMPORTED_MODULE_1__.getOctokit(token);

  // console.log(`The event payload: ${JSON.stringify(github.context.payload, undefined, 2)}`);

  switch (_actions_github__WEBPACK_IMPORTED_MODULE_1__.context.eventName) {
    case "issues": {
      handleIssues(octokit, _actions_github__WEBPACK_IMPORTED_MODULE_1__.context.payload).catch(error => {
        _actions_core__WEBPACK_IMPORTED_MODULE_0__.setFailed(error.message);
      })
    }
  }
} catch (error) {
  _actions_core__WEBPACK_IMPORTED_MODULE_0__.setFailed(error.message);
}

/**
 * 
 * @param {ReturnType<typeof github.getOctokit>} octokit 
 * @param {import("@octokit/webhooks").EventPayloads.WebhookPayloadIssues} payload 
 */
async function handleIssues(octokit, payload) {
  if (payload.action !== "opened" && payload.action !== "reopened") {
    return;
  }
  const { sender } = payload;
  if (await isStarredBy(octokit, sender.login)) {
    console.log(`${sender.login} has starred this repository`)
    return;
  }
  console.log(`${sender.login} has not starred this repository`)

  const message = _actions_core__WEBPACK_IMPORTED_MODULE_0__.getInput('message');
  // opened by non-stargazer
  await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
    ..._actions_github__WEBPACK_IMPORTED_MODULE_1__.context.repo,
    issue_number: payload.issue.number,
    body: `<!-- please-star-first: {} -->

${message}`
  })

  /*
  await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
    ...github.context.repo,
    issue_number: payload.issue.number,
    state: "closed"
  })
  */
}

/**
 * @param {ReturnType<typeof github.getOctokit>} octokit 
 * @param {string} user 
 */
async function isStarredBy(octokit, user) {
  for (let page = 0; ; page++) {
    const resp = await octokit.request('GET /repos/{owner}/{repo}/stargazers', {
      ..._actions_github__WEBPACK_IMPORTED_MODULE_1__.context.repo,
      page,
      per_page: 100
    });
    if (resp.data.some(u => u.login === user)) {
      return true;
    }
    if (resp.data.length < 100) {
      break;
    }
  }
  return false;
}

})();


//# sourceMappingURL=index.js.map