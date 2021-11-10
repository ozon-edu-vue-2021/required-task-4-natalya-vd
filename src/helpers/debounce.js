export function debounce(f, t) {
    const calls = {
        lastCallTimer: null,
    };

    return function (args) {         
        if(calls.lastCallTimer !== null) {
            clearTimeout(calls.lastCallTimer);
        }

        calls.lastCallTimer = setTimeout(() => f(args), t)
    }
}

// export function debounce(f, t) {
//     const calls = {};

//     return function (args) {
//         const prevCall = calls.lastCall;
//         calls.lastCall = Date.now();

//         if(prevCall && calls.lastCall - prevCall <= t) {
//             clearTimeout(calls.lastCallTimer);
//         }

//         calls.lastCallTimer = setTimeout(() => f(args), t)
//     }
// }